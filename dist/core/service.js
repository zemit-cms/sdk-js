"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceConfig = exports.ZemitOptions = void 0;
var model_1 = require("@/core/model");
var axios_1 = require("axios");
var logger_1 = require("@/core/logger");
var identity_1 = require("@/core/identity");
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const createError = require('./../../node_modules/axios/lib/core/createError.js');
var d = new logger_1.default('zemit/core/service');
var ZemitOptions = /** @class */ (function () {
    function ZemitOptions() {
        this.apiUrl = '';
    }
    return ZemitOptions;
}());
exports.ZemitOptions = ZemitOptions;
var ServiceConfig = /** @class */ (function () {
    function ServiceConfig() {
        this.model = model_1.default;
    }
    return ServiceConfig;
}());
exports.ServiceConfig = ServiceConfig;
var Service = /** @class */ (function (_super) {
    __extends(Service, _super);
    function Service(opts) {
        if (opts === void 0) { opts = {}; }
        var _this = _super.call(this) || this;
        _this.baseUrl = '';
        _this.modelUrl = '';
        _this.endpointList = {
            getAll: '/get-all',
            getList: '/get-list',
            get: '/get',
            import: '/import',
            export: '/export',
            count: '/count',
            new: '/new',
            validate: '/validate',
            save: '/save',
            create: '/save',
            update: '/save',
            delete: '/delete',
            restore: '/restore',
            logout: '/logout',
            login: '/login',
            upload: '/upload',
        };
        _this.refreshOnUnauthorized = true;
        _this.getEndpointUrl = function (endpoint) { return _this.endpointList[endpoint] || endpoint; };
        _this.setEndpointUrl = function (endpoint, url) {
            return (_this.endpointList[endpoint] = url);
        };
        _this.getBaseUrl = function () { return _this.baseUrl; };
        _this.setBaseUrl = function (url) { return (_this.baseUrl = url); };
        _this.setModelUrl = function (url) { return (_this.modelUrl = url); };
        _this.getModelUrl = function () { return _this.modelUrl; };
        /**
         * Endpoint URL getters
         * @return string
         */
        _this.getGetAllUrl = function () { return _this.getUrl('getAll'); };
        _this.getGetListUrl = function () { return _this.getUrl('getList'); };
        _this.getGetUrl = function () { return _this.getUrl('get'); };
        _this.getImportUrl = function () { return _this.getUrl('import'); };
        _this.getExportUrl = function () { return _this.getUrl('export'); };
        _this.getCountUrl = function () { return _this.getUrl('count'); };
        _this.getNewUrl = function () { return _this.getUrl('new'); };
        _this.getValidateUrl = function () { return _this.getUrl('validate'); };
        _this.getCreateUrl = function () { return _this.getUrl('create'); };
        _this.getUpdateUrl = function () { return _this.getUrl('update'); };
        _this.getSaveUrl = function () { return _this.getUrl('save'); };
        _this.getDeleteUrl = function () { return _this.getUrl('delete'); };
        _this.getRestoreUrl = function () { return _this.getUrl('restore'); };
        _this.getLogoutUrl = function () { return _this.getUrl('logout'); };
        _this.getLoginUrl = function () { return _this.getUrl('login'); };
        _this.getUploadUrl = function () { return _this.getUrl('upload'); };
        _this.getAll = function (data, config) {
            if (data === void 0) { data = {}; }
            if (config === void 0) { config = {}; }
            return _this.handleRequest(_this.getGetAllUrl(), data, config);
        };
        _this.getList = function (data, config) {
            if (data === void 0) { data = {}; }
            if (config === void 0) { config = {}; }
            return _this.handleRequest(_this.getGetListUrl(), data, config);
        };
        _this.get = function (data, config) {
            if (data === void 0) { data = {}; }
            if (config === void 0) { config = {}; }
            return _this.handleRequest(_this.getGetUrl(), data, config);
        };
        _this.import = function (data, config) {
            if (data === void 0) { data = {}; }
            if (config === void 0) { config = {}; }
            return _this.handleRequest(_this.getImportUrl(), data, config);
        };
        _this.export = function (data, config) {
            if (data === void 0) { data = {}; }
            if (config === void 0) { config = {}; }
            return _this.handleRequest(_this.getExportUrl(), data, config);
        };
        _this.count = function (data, config) {
            if (data === void 0) { data = {}; }
            if (config === void 0) { config = {}; }
            return _this.handleRequest(_this.getCountUrl(), data, config);
        };
        _this.new = function (data, config) {
            if (data === void 0) { data = {}; }
            if (config === void 0) { config = {}; }
            return _this.handleRequest(_this.getNewUrl(), data, config);
        };
        _this.validate = function (data, config) {
            if (data === void 0) { data = {}; }
            if (config === void 0) { config = {}; }
            return _this.handleRequest(_this.getValidateUrl(), data, config);
        };
        _this.create = function (data, config) {
            if (data === void 0) { data = {}; }
            if (config === void 0) { config = {}; }
            return _this.handleRequest(_this.getCreateUrl(), data, config);
        };
        _this.update = function (data, config) {
            if (data === void 0) { data = {}; }
            if (config === void 0) { config = {}; }
            return _this.handleRequest(_this.getUpdateUrl(), data, config);
        };
        _this.save = function (data, config) {
            if (data === void 0) { data = {}; }
            if (config === void 0) { config = {}; }
            return _this.handleRequest(_this.getSaveUrl(), data, config);
        };
        _this.delete = function (data, config) {
            if (data === void 0) { data = {}; }
            if (config === void 0) { config = {}; }
            return _this.handleRequest(_this.getDeleteUrl(), data, config);
        };
        _this.restore = function (data, config) {
            if (data === void 0) { data = {}; }
            if (config === void 0) { config = {}; }
            return _this.handleRequest(_this.getRestoreUrl(), data, config);
        };
        _this.upload = function (data, config) {
            if (data === void 0) { data = {}; }
            if (config === void 0) { config = {}; }
            return _this.handleRequest(_this.getUploadUrl(), data, config);
        };
        /**
         * Request Success Callback
         */
        _this.success = function (response, resolve, reject, callable) {
            var _a, _b, _c, _d;
            if ((_b = (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.view) === null || _b === void 0 ? void 0 : _b.single) {
                response.data.view.single = new _this.model(response.data.view.single);
            }
            if ((_d = (_c = response === null || response === void 0 ? void 0 : response.data) === null || _c === void 0 ? void 0 : _c.view) === null || _d === void 0 ? void 0 : _d.list) {
                response.data.view.list = response.data.view.list.map(function (item) {
                    return new _this.model(item);
                });
            }
            d.d('success', response);
            callable && callable(response);
            resolve(response);
        };
        /**
         * Request Error Callback
         */
        _this.error = function (reason, resolve, reject, callable) {
            d.error('error', reason);
            callable && callable(reason);
            reject(reason);
        };
        /**
         * Request Complete Callback
         */
        _this.complete = function (resolve, reject, callable) {
            d.d('complete');
            callable && callable();
        };
        /**
         * Axios Success Response
         * Parse Zemit Data Response and reject the request if we don't have valid response
         * - @todo Zemit should return a 401 itself
         */
        _this.responseInterceptor = function (response) {
            var _a;
            d.info('interceptor:response', response);
            switch ((_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.response) {
                case undefined:
                case null:
                case true:
                    return response;
            }
            return Promise
                .reject();
        };
        /**
         * Axios Rejected Response
         * If 401, the JWT may be expired or invalid, so we try to refresh JWT once
         */
        _this.retry = false;
        _this.rejectedResponseInterceptor = function (reject) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.refreshOnUnauthorized && reject.response)) return [3 /*break*/, 2];
                        if (!(reject.response.status === 401 && !this.retry)) return [3 /*break*/, 2];
                        this.retry = true;
                        return [4 /*yield*/, identity_1.default.refreshPromise()];
                    case 1:
                        _a.sent();
                        if (identity_1.default.isLoggedIn()) {
                            if (reject.config) {
                                return [2 /*return*/, this.http(reject.config)];
                            }
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/, Promise.reject(reject)];
                }
            });
        }); };
        /**
         * Adding X-Authorization JWT header
         * Refresh the JWT token if expired
         */
        _this.requestInterceptor = function (config) { return __awaiter(_this, void 0, void 0, function () {
            var jwt;
            var _a;
            return __generator(this, function (_b) {
                d.info('interceptor:config', config);
                if (config.headers) {
                    jwt = (_a = identity_1.default.getIdentity()) === null || _a === void 0 ? void 0 : _a.jwt;
                    if (jwt) {
                        if (this.refreshOnUnauthorized) {
                            // const token = jose.decodeJwt(jwt);
                            // const exp = token.exp || false;
                            // if (token && exp && exp <= moment().unix()) {
                            //   d.d('jwt:expired', jwt);
                            //   await Identity.refreshPromise();
                            //   jwt = Identity.getIdentity()?.jwt;
                            // }
                        }
                        config.headers['X-Authorization'] = "Bearer ".concat(jwt);
                    }
                }
                return [2 /*return*/, config];
            });
        }); };
        Object.assign(_this, opts);
        return _this;
    }
    Service.getInstance = function (opts) {
        if (opts === void 0) { opts = {}; }
        var instance = new this();
        for (var key in opts) {
            if (opts.hasOwnProperty(key)) {
                var keyTyped = key;
                instance[key] = opts[keyTyped];
            }
        }
        return instance;
    };
    /**
     * Build an endpoint url using the baseUrl + modelUrl + endpointUrl
     * @param endpoint
     */
    Service.prototype.getUrl = function (endpoint) {
        return [this.getBaseUrl(), this.getModelUrl(), this.getEndpointUrl(endpoint)]
            .filter(Boolean)
            .join('/')
            .replace(/\/+/g, '/');
    };
    Service.prototype.handleRequest = function (url, data, config, success, error, complete) {
        var _this = this;
        var _a;
        if (config === void 0) { config = {}; }
        /**
         * Create default Axios Request
         * Add custom interceptors
         */
        this.http = axios_1.default.create((_a = this.config) === null || _a === void 0 ? void 0 : _a.axiosRequestConfig);
        this.http.interceptors.response.use(this.responseInterceptor, this.rejectedResponseInterceptor);
        this.http.interceptors.request.use(this.requestInterceptor);
        return this.prepareUploads(data).then(function (data) {
            _this.prepareRequestConfig(url, data, config);
            _this.beforeRequest(config);
            return new Promise(function (resolve, reject) {
                return _this.http(config)
                    .then(function (response) { return _this.success(response, resolve, reject, success); })
                    .catch(function (reason) { return _this.error(reason, resolve, reject, error); })
                    .finally(function () { return _this.complete(resolve, reject, complete); });
            });
        });
    };
    /**
     * Prepare request config
     */
    Service.prototype.prepareRequestConfig = function (url, data, config) {
        if (config === void 0) { config = {}; }
        // Set default method to post
        if (!config.method) {
            config.method = 'post';
        }
        // Force url
        if (!config.url) {
            config.url = url;
        }
        // Force data
        if (!config.data) {
            config.data = data;
        }
    };
    Service.prototype.uploadFile = function (file, category) {
        var formData = new FormData();
        formData.append('file', file);
        return this.handleRequest(this.getBaseUrl() + '/file/upload/' + category, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    };
    Service.prototype.prepareUploads = function (model) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!(model instanceof model_1.default)) {
                resolve(model);
            }
            var data = model.toObject();
            var uploadMap = model.uploadMap();
            var promises = [];
            Object.keys(data).forEach(function (key) {
                if (uploadMap[key]) {
                    if (data[key] instanceof File) {
                        promises.push(_this.uploadFile(data[key], uploadMap[key].category).then(function (response) {
                            data[uploadMap[key].key] = response.data.view[0].file.id;
                            return response;
                        }));
                    }
                    else if (data[key] === null) {
                        data[uploadMap[key].key] = null;
                    }
                    delete data[key];
                }
            });
            Promise.all(promises).then(function () {
                resolve(data);
            });
        });
    };
    /**
     * Process parameters before Axios Request
     */
    Service.prototype.beforeRequest = function (config) {
        d.d('beforeRequest', config);
        // prepare model
        if (config.data instanceof model_1.default) {
            config.data = config.data.toObject();
        }
        // prepare array of models
        if (Array.isArray(config.data)) {
            var newData_1 = [];
            config.data.forEach(function (value, index) {
                newData_1[index] = value instanceof model_1.default ? value.toObject() : value;
            });
            config.data = newData_1;
        }
    };
    return Service;
}(ServiceConfig));
exports.default = Service;
//# sourceMappingURL=service.js.map