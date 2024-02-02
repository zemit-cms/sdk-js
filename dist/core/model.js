"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = require("@/core/logger");
var deepmerge_1 = require("deepmerge");
var d = new logger_1.default('zemit/core/model');
var Model = /** @class */ (function () {
    function Model(data) {
        if (data === void 0) { data = {}; }
        this.autoIncrementId = 0;
        this.position = 0;
        this.loading = false;
        this.data = {};
        this.originalData = {};
        this.originalDataJSON = null;
        this.states = {
            saving: false,
            deleting: false,
            restoring: false,
        };
        this._autoIncrement();
        this.setDefault(this.default(), this.getData(data));
        this.map(this.columnMap());
        this.mapRelated(this.relatedMap());
        this.castColumns(this.columnCast());
        this.mapUploads();
    }
    Object.defineProperty(Model.prototype, "Loading", {
        get: function () {
            return this.loading;
        },
        set: function (loading) {
            this.loading = loading;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Model.prototype, "Position", {
        get: function () {
            return this.position;
        },
        set: function (position) {
            this.position = position;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Model.prototype, "AutoIncrementId", {
        get: function () {
            return this.autoIncrementId;
        },
        set: function (autoIncrementId) {
            this.autoIncrementId = autoIncrementId;
        },
        enumerable: false,
        configurable: true
    });
    Model.prototype._autoIncrement = function () {
        return (this.autoIncrementId = Model.staticAutoIncrementId++);
    };
    Model.prototype.getData = function (data) {
        if (data === void 0) { data = this.data; }
        if (data instanceof Model) {
            return data.data;
        }
        return data;
    };
    Model.prototype.default = function () {
        return {
        // modellist: [],
        };
    };
    Model.prototype.relatedMap = function () {
        return {
        // model: Model,
        // modelentity: Model,
        // modellist: Model,
        };
    };
    Model.prototype.uploadMap = function () {
        return {};
    };
    Model.prototype.columnMap = function () {
        return {
        // id: 'index',
        // index: 'id',
        };
    };
    Model.prototype.columnCast = function () {
        return {
        // id: 'number',
        // deleted: 'bool',
        // label: 'string',
        };
    };
    /**
     * Set Default Data
     */
    Model.prototype.setDefault = function (defaultData, data) {
        if (defaultData === void 0) { defaultData = this.default(); }
        if (data === void 0) { data = this.data; }
        Object.assign(this.data, structuredClone(defaultData), this.getData(data));
    };
    /**
     * Map Columns
     */
    Model.prototype.map = function (map, data) {
        if (data === void 0) { data = this; }
        // No mapping to process
        if (!map) {
            return;
        }
        // No mapping to process
        var length = Object.keys(map).length;
        if (!length) {
            return;
        }
        // Process Model data if Model is passed
        if (data instanceof Model) {
            data = data.data;
        }
        // No mapping for empty data
        if (!Object.keys(data).length) {
            return;
        }
        // Map data object keys
        do {
            length = Object.keys(map).length;
            for (var key in map) {
                if (Object.prototype.hasOwnProperty.call(map, key) && data[map[key]] !== 'undefined') {
                    // do not overwrite existing property
                    if (Object.prototype.hasOwnProperty.call(data, map[key])) {
                        // do not process same key
                        if (key === map[key]) {
                            delete map[key];
                        }
                        // double map existing keys
                        else {
                            map['_' + key + '_'] = map[key];
                            map[key] = '_' + key + '_';
                        }
                    }
                    // remap object key
                    else {
                        data[map[key]] = data[key];
                        delete data[key];
                        delete map[key];
                    }
                }
            }
        } while (Object.keys(map).length && Object.keys(map).length !== length);
    };
    /**
     * Map Related Records
     */
    Model.prototype.mapRelated = function (map, data) {
        if (data === void 0) { data = this; }
        // No mapping to process
        if (!map || !Object.keys(map).length) {
            return;
        }
        // Process Model data if Model is passed
        if (data instanceof Model) {
            data = data.data;
        }
        // Data must be an object in order to be mapped to another model
        if (typeof data !== 'object') {
            return;
        }
        var _loop_1 = function (key) {
            if (Object.prototype.hasOwnProperty.call(data, key) && data[key] !== 'undefined') {
                var RelatedModel_1 = map[key];
                data[key] = Array.isArray(data[key])
                    ? data[key].map(function (related) { return (related instanceof RelatedModel_1 ? related : new RelatedModel_1(related)); }) // map list
                    : data[key] instanceof RelatedModel_1
                        ? data[key]
                        : new RelatedModel_1(data[key]); // map single
            }
        };
        // Map related records
        for (var key in map) {
            _loop_1(key);
        }
    };
    Model.prototype.mapUploads = function () {
        var _this = this;
        var uploadMap = this.uploadMap();
        Object.keys(uploadMap).forEach(function (key) {
            if (_this.data[key]) {
                _this.data[uploadMap[key].key] = _this.data[key].id;
            }
        });
    };
    /**
     * Cast columns
     */
    Model.prototype.castColumns = function (cast) {
        if (cast === void 0) { cast = this.columnCast(); }
        var casted = {};
        for (var key in cast) {
            if (Object.prototype.hasOwnProperty.call(this.data, key)) {
                switch (cast[key]) {
                    case 'bool':
                    case 'boolean':
                        // eslint-disable-next-line no-case-declarations
                        var s = this.data[key] && this.data[key].toString().toLowerCase().trim();
                        casted[key] = s === 'true' || s === '1';
                        break;
                    case 'string':
                        casted[key] = String(this.data[key]);
                        break;
                    case 'number':
                        casted[key] = Number(this.data[key]);
                        break;
                    case 'int':
                    case 'integer':
                        casted[key] = parseInt(this.data[key]);
                        break;
                    case 'float':
                    case 'double':
                        casted[key] = parseFloat(this.data[key]);
                        break;
                }
            }
        }
        this.assign(casted);
    };
    /**
     * Assign or append this model to target based on properties
     */
    Model.prototype.assignToArrayByProperty = function (target, props, toLowerCase) {
        if (toLowerCase === void 0) { toLowerCase = false; }
        d.d('assignToArrayByProperty', target, this, props);
        var append = true;
        for (var _i = 0, target_1 = target; _i < target_1.length; _i++) {
            var object = target_1[_i];
            var assign = true;
            for (var prop in props) {
                if ((!toLowerCase && object.data[prop] !== props[prop]) ||
                    (toLowerCase && object.data[prop].toLowerCase() !== props[prop].toLowerCase())) {
                    assign = false;
                    break;
                }
            }
            if (assign) {
                d.d('assignToArrayByProperty:assign', object, this);
                append = false;
                object.assign(this);
            }
        }
        if (append) {
            d.d('assignToArrayByProperty:append', target, this);
            target.push(this);
        }
    };
    /**
     * Sort property by key
     */
    Model.prototype.sortByProperty = function (property, key, id) {
        if (property === void 0) { property = 'position'; }
        if (id === void 0) { id = 'id'; }
        return this.data[property].sort(function (a, b) {
            return a.data[key] > b.data[key] ? 1 : a.data[key] === b.data[key] ? (a.data[id] > b.data[id] ? 1 : -1) : -1;
        });
    };
    /**
     * Convert data Models into nested Objects
     */
    Model.prototype.toObject = function (data, keepRelationship) {
        if (data === void 0) { data = this.data; }
        if (keepRelationship === void 0) { keepRelationship = false; }
        data = this.getData(data);
        var ret = {};
        for (var key in data) {
            if (Array.isArray(data[key])) {
                ret[key] = [];
                for (var listKey in data[key]) {
                    if (data[key][listKey] instanceof Model) {
                        ret[key][listKey] = data[key][listKey].toObject();
                    }
                    else {
                        ret[key][listKey] = data[key][listKey];
                    }
                }
                // if is an array of models, zemit require to know if you want to keep the unpassed relationships entites or not
                if (data[key][0] instanceof Model) {
                    if (!keepRelationship) {
                        ret[key].unshift(false);
                    }
                }
            }
            else {
                if (data[key] instanceof Model) {
                    ret[key] = data[key].toObject();
                }
                else {
                    ret[key] = data[key];
                }
            }
        }
        return structuredClone(ret);
    };
    /**
     * JSON of data
     */
    Model.prototype.toJson = function (data) {
        if (data === void 0) { data = this.data; }
        return JSON.stringify(this.toObject(data));
    };
    /**
     * Sync to data
     */
    Model.prototype.sync = function (data) {
        if (data === void 0) { data = {}; }
        data = this.getData(data);
        for (var key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                this.data[key] = data[key];
            }
        }
    };
    /**
     * Assign to data
     */
    Model.prototype.assign = function (data, specificKeys) {
        if (data === void 0) { data = {}; }
        if (specificKeys === void 0) { specificKeys = []; }
        var newData = this.getData(data);
        if (specificKeys.length > 0) {
            Object.keys(newData).forEach(function (key) {
                if (!specificKeys.includes(key)) {
                    delete newData[key];
                }
            });
        }
        var result = Object.assign(this.data, newData);
        this.setOriginalData();
        return result;
    };
    /**
     * Deep Merge to data
     */
    Model.prototype.deepmerge = function (data, options) {
        if (data === void 0) { data = {}; }
        deepmerge_1.default.all([this.data, this.getData(data)], options);
    };
    /**
     * Clone Entire Model
     */
    Model.prototype.clone = function () {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        var clone = new this.constructor(structuredClone(this.toObject(this.data, true)));
        clone.setOriginalData();
        return clone;
    };
    Model.prototype.setOriginalData = function (data) {
        var newData = this.toObject(data, true);
        this.originalData = structuredClone(newData);
        this.originalDataJSON = JSON.stringify(newData);
        return newData;
    };
    Model.prototype.isDifferentFromOriginal = function (data) {
        var originalDataJson = this.originalDataJSON === null ? this.setOriginalData() : this.originalDataJSON;
        if (data) {
            return JSON.stringify(data) !== originalDataJson;
        }
        else {
            var saveData = this.toObject(this.data, true);
            return JSON.stringify(saveData) !== originalDataJson;
        }
    };
    Model.prototype.revertData = function () {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.data = new this.constructor(structuredClone(this.originalData)).data;
        this.setOriginalData();
    };
    Model.staticAutoIncrementId = 0;
    return Model;
}());
exports.default = Model;
//# sourceMappingURL=model.js.map