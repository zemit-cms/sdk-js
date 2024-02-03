import Logger from '@/core/logger';
import deepmerge from 'deepmerge';
const d = new Logger('zemit/core/model');
export default class Model {
    static staticAutoIncrementId = 0;
    autoIncrementId = 0;
    position = 0;
    loading = false;
    data = {};
    originalData = {};
    originalDataJSON = null;
    states = {
        saving: false,
        deleting: false,
        restoring: false,
    };
    constructor(data = {}) {
        this._autoIncrement();
        this.setDefault(this.default(), this.getData(data));
        this.map(this.columnMap());
        this.mapRelated(this.relatedMap());
        this.castColumns(this.columnCast());
        this.mapUploads();
    }
    get Loading() {
        return this.loading;
    }
    set Loading(loading) {
        this.loading = loading;
    }
    get Position() {
        return this.position;
    }
    set Position(position) {
        this.position = position;
    }
    get AutoIncrementId() {
        return this.autoIncrementId;
    }
    set AutoIncrementId(autoIncrementId) {
        this.autoIncrementId = autoIncrementId;
    }
    _autoIncrement() {
        return (this.autoIncrementId = Model.staticAutoIncrementId++);
    }
    getData(data = this.data) {
        if (data instanceof Model) {
            return data.data;
        }
        return data;
    }
    default() {
        return {
        // modellist: [],
        };
    }
    relatedMap() {
        return {
        // model: Model,
        // modelentity: Model,
        // modellist: Model,
        };
    }
    uploadMap() {
        return {};
    }
    columnMap() {
        return {
        // id: 'index',
        // index: 'id',
        };
    }
    columnCast() {
        return {
        // id: 'number',
        // deleted: 'bool',
        // label: 'string',
        };
    }
    /**
     * Set Default Data
     */
    setDefault(defaultData = this.default(), data = this.data) {
        Object.assign(this.data, structuredClone(defaultData), this.getData(data));
    }
    /**
     * Map Columns
     */
    map(map, data = this) {
        // No mapping to process
        if (!map) {
            return;
        }
        // No mapping to process
        let length = Object.keys(map).length;
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
            for (const key in map) {
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
    }
    /**
     * Map Related Records
     */
    mapRelated(map, data = this) {
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
        // Map related records
        for (const key in map) {
            if (Object.prototype.hasOwnProperty.call(data, key) && data[key] !== 'undefined') {
                const RelatedModel = map[key];
                data[key] = Array.isArray(data[key])
                    ? data[key].map((related) => (related instanceof RelatedModel ? related : new RelatedModel(related))) // map list
                    : data[key] instanceof RelatedModel
                        ? data[key]
                        : new RelatedModel(data[key]); // map single
            }
        }
    }
    mapUploads() {
        const uploadMap = this.uploadMap();
        Object.keys(uploadMap).forEach((key) => {
            if (this.data[key]) {
                this.data[uploadMap[key].key] = this.data[key].id;
            }
        });
    }
    /**
     * Cast columns
     */
    castColumns(cast = this.columnCast()) {
        const casted = {};
        for (const key in cast) {
            if (Object.prototype.hasOwnProperty.call(this.data, key)) {
                switch (cast[key]) {
                    case 'bool':
                    case 'boolean':
                        // eslint-disable-next-line no-case-declarations
                        const s = this.data[key] && this.data[key].toString().toLowerCase().trim();
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
    }
    /**
     * Assign or append this model to target based on properties
     */
    assignToArrayByProperty(target, props, toLowerCase = false) {
        d.d('assignToArrayByProperty', target, this, props);
        let append = true;
        for (const object of target) {
            let assign = true;
            for (const prop in props) {
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
    }
    /**
     * Sort property by key
     */
    sortByProperty(property = 'position', key, id = 'id') {
        return this.data[property].sort((a, b) => a.data[key] > b.data[key] ? 1 : a.data[key] === b.data[key] ? (a.data[id] > b.data[id] ? 1 : -1) : -1);
    }
    /**
     * Convert data Models into nested Objects
     */
    toObject(data = this.data, keepRelationship = false) {
        data = this.getData(data);
        const ret = {};
        for (const key in data) {
            if (Array.isArray(data[key])) {
                ret[key] = [];
                for (const listKey in data[key]) {
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
    }
    /**
     * JSON of data
     */
    toJson(data = this.data) {
        return JSON.stringify(this.toObject(data));
    }
    /**
     * Sync to data
     */
    sync(data = {}) {
        data = this.getData(data);
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                this.data[key] = data[key];
            }
        }
    }
    /**
     * Assign to data
     */
    assign(data = {}, specificKeys = []) {
        const newData = this.getData(data);
        if (specificKeys.length > 0) {
            Object.keys(newData).forEach((key) => {
                if (!specificKeys.includes(key)) {
                    delete newData[key];
                }
            });
        }
        const result = Object.assign(this.data, newData);
        this.setOriginalData();
        return result;
    }
    /**
     * Deep Merge to data
     */
    deepmerge(data = {}, options) {
        deepmerge.all([this.data, this.getData(data)], options);
    }
    /**
     * Clone Entire Model
     */
    clone() {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const clone = new this.constructor(structuredClone(this.toObject(this.data, true)));
        clone.setOriginalData();
        return clone;
    }
    setOriginalData(data) {
        const newData = this.toObject(data, true);
        this.originalData = structuredClone(newData);
        this.originalDataJSON = JSON.stringify(newData);
        return newData;
    }
    isDifferentFromOriginal(data) {
        const originalDataJson = this.originalDataJSON === null ? this.setOriginalData() : this.originalDataJSON;
        if (data) {
            return JSON.stringify(data) !== originalDataJson;
        }
        else {
            const saveData = this.toObject(this.data, true);
            return JSON.stringify(saveData) !== originalDataJson;
        }
    }
    revertData() {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.data = new this.constructor(structuredClone(this.originalData)).data;
        this.setOriginalData();
    }
}
//# sourceMappingURL=model.js.map