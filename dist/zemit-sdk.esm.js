import moment from 'moment';
import * as IpAddress from 'ip-address';
import deepmerge from 'deepmerge';
import axios from 'axios';
import store from 'store2';
import { camelCase, camelCaseTransformMerge } from 'camel-case';
import { v4 } from 'uuid';

class Rules {
    static empty(value) {
        return typeof value === 'undefined' || value === null || value === '' || value === 0 || !value;
    }
    static required(value = '') {
        return ((Array.isArray(value) && value.length > 0) ||
            (typeof value === 'string' && !!value) ||
            (typeof value === 'object' && !Array.isArray(value) && value !== null) ||
            (typeof value === 'number' && !isNaN(value)));
    }
    static ipv4(ipv4) {
        try {
            return new IpAddress.Address4(ipv4).isCorrect();
        }
        catch (e) {
            return false;
        }
    }
    static ipv6(ipv6) {
        try {
            return new IpAddress.Address6(ipv6).isCorrect();
        }
        catch (e) {
            return false;
        }
    }
    static email(email, options = {}) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(email).toLowerCase())) {
            // Validate local domain
            const domain = email.split('@')[1];
            if (options.allowLocalDomains) {
                return true;
            }
            else {
                const tld = domain.split('.')[1] || '';
                // TLDs must have at least 2 characters to be valid
                return tld.length >= 2;
            }
        }
        return false;
    }
    static isLength(value = '', length = 8, allowEmpty = false) {
        return (!value && allowEmpty) || (value || '').length === length;
    }
    static minLength(value = '', min = 8, allowEmpty = false) {
        return (!value && allowEmpty) || (value || '').length >= min;
    }
    static maxLength(value = '', max = 16) {
        return (value || '').length <= max;
    }
    static betweenLength(value = '', min = 0, max = 0, allowEmpty = false) {
        return this.minLength(value, min, allowEmpty) && this.maxLength(value, max);
    }
    static isBetween(value = 0, min = null, max = null) {
        return !((min !== null && max !== null && (value < min || value > max)) ||
            (min !== null && value < min) ||
            (max !== null && value > max));
    }
    static isBetweenDates(value = new Date(), min = null, max = null) {
        return !((min !== null && max !== null && (value < min || value > max)) ||
            (min !== null && value < min) ||
            (max !== null && value > max));
    }
    static identical(compare = '', value = '') {
        return value === compare;
    }
    static digit(value = '') {
        return Number.isInteger(Number(value)) && value !== null;
    }
    static date(value, format = 'YYYY-MM-DD') {
        const v = moment(value, format);
        return v.isValid();
    }
    static boolean(value = '') {
        return typeof value === 'boolean' || value === '1' || value === '0' || value === 1 || value === 0;
    }
    static includes(value, domain) {
        return domain.includes(value);
    }
    static excludes(value, domain) {
        return !domain.includes(value);
    }
    // The password is at least 8 characters long (?=.{8,}).
    // The password has at least one uppercase letter (?=.*[A-Z]).
    // The password has at least one lowercase letter (?=.*[a-z]).
    // The password has at least one digit (?=.*[0-9]).
    // The password has at least one special character ([^A-Za-z0-9]).
    // Strong: The password has to meet all the requirements.
    static strongPassword(value) {
        return /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/.test(value);
    }
    // If the password is at least six characters long and meets all the other requirements, or has no digit but meets the rest of the requirements.
    static mediumPassword(value) {
        return /((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))/.test(value);
    }
    static password(value) {
        return (this.betweenLength(value, 8, 36) && this.hasLowerCase(value) && this.hasUpperCase(value) && this.hasDigit(value));
    }
    static hasLowerCase(value) {
        return typeof value === 'string' ? /[a-z]/.test(value) : false;
    }
    static hasUpperCase(value) {
        return typeof value === 'string' ? /[A-Z]/.test(value) : false;
    }
    static hasDigit(value) {
        return typeof value === 'string' ? /[0-9]/.test(value) : typeof value === 'number';
    }
    static isPositive(value) {
        return value > 0;
    }
    static isNegative(value) {
        return value < 0;
    }
    static isFuture(value) {
        const today = new Date();
        return value > today;
    }
    /**
     * Checks whether a string contains any special characters.
     *
     * This method defines "special characters" as the following:
     * ! @ # $ % ^ & * ( ) - _ = + [ ] { } ; : , . < > / ? \ | `
     *
     * The string is tested against a regular expression that matches these characters.
     * If the string is empty, this method returns the value of the `allowEmpty` parameter.
     *
     * @param {string} value - The string to be checked for special characters.
     * @param {boolean} [allowEmpty=false] - Optional. Specifies whether an empty string should be considered as containing a special character.
     * @returns {boolean} Returns `true` if the string contains a special character or is empty and `allowEmpty` is `true`. Otherwise, it returns `false`.
     *
     * @example
     * ```ts
     * const containsSpecial = MyClass.containsSpecialChar("Hello!");
     * console.log(containsSpecial); // Outputs: true
     * ```
     */
    static containsSpecialChar(value, allowEmpty = false) {
        const specialCharRegex = /[!@#$%^&*()\-_=+\[\]{};:,.<>\/?\\|`]/;
        if (value.length === 0) {
            // If the string is empty, return the value of allowEmpty.
            return allowEmpty;
        }
        else {
            // Otherwise, check if the string contains a special character.
            return specialCharRegex.test(value);
        }
    }
    static alphanumeric(value, allowEmpty = true) {
        return /[^a-zA-Z0-9]/g.test(value) || (allowEmpty && Rules.empty(value));
    }
    static isUrl(value) {
        try {
            const url = new URL(value);
            return true;
        }
        catch (err) {
            return false;
        }
    }
    static isHttpUrl(value) {
        try {
            const newUrl = new URL(value);
            return newUrl.protocol === 'http:' || newUrl.protocol === 'https:';
        }
        catch (err) {
            return false;
        }
    }
    static isRegex(value) {
        try {
            RegExp(value);
            return true;
        }
        catch (e) {
            return false;
        }
    }
}

/**
 * Simple logger system with the possibility of registering custom outputs.
 *
 * 4 different log levels are provided, with corresponding methods:
 * - debug   : for debug information
 * - info    : for informative status of the application (success, ...)
 * - warning : for non-critical errors that do not prevent normal application behavior
 * - error   : for critical errors that prevent normal application behavior
 *
 * Example usage:
 * ```
 * import Logger from 'app/core/logger.service';
 *
 * const log = new Logger('myFile');
 * ...
 * log.debug('something happened');
 * ```
 *
 * To disable debug and info logs in production, add this snippet to your root component:
 * ```
 * export class AppComponent implements OnInit {
 *   ngOnInit() {
 *     if (environment.production) {
 *       Logger.enableProductionMode();
 *     }
 *     ...
 *   }
 * }
 *
 * If you want to process logs through other outputs than console, you can add LogOutput functions to Logger.outputs.
 */
/**
 * The possible log levels.
 * LogLevel.Off is never emitted and only used with Logger.level property to disable logs.
 */
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["Off"] = 0] = "Off";
    LogLevel[LogLevel["Error"] = 1] = "Error";
    LogLevel[LogLevel["Warning"] = 2] = "Warning";
    LogLevel[LogLevel["Info"] = 3] = "Info";
    LogLevel[LogLevel["Debug"] = 4] = "Debug";
})(LogLevel || (LogLevel = {}));
class Logger {
    source;
    /**
     * Current logging level.
     * Set it to LogLevel.Off to disable logs completely.
     */
    static level = LogLevel.Debug;
    /**
     * Additional log outputs.
     */
    static outputs = [];
    /**
     * Enables production mode.
     * Sets logging level to LogLevel.Warning.
     */
    static enableProductionMode() {
        Logger.level = LogLevel.Warning;
    }
    constructor(source) {
        this.source = source;
    }
    /**
     * Logs messages or objects  with the debug level.
     * Works the same as console.log().
     */
    d = this.debug;
    debug(...objects) {
        this.log(console.log, LogLevel.Debug, objects);
    }
    /**
     * Logs messages or objects  with the info level.
     * Works the same as console.log().
     */
    info(...objects) {
        this.log(console.info, LogLevel.Info, objects);
    }
    /**
     * Logs messages or objects  with the warning level.
     * Works the same as console.log().
     */
    warn(...objects) {
        this.log(console.warn, LogLevel.Warning, objects);
    }
    /**
     * Logs messages or objects  with the error level.
     * Works the same as console.log().
     */
    error(...objects) {
        this.log(console.error, LogLevel.Error, objects);
    }
    log(func, level, objects) {
        if (level <= Logger.level) {
            const log = this.source ? ['[' + this.source + ']'].concat(objects) : objects;
            func.apply(func, log);
            Logger.outputs.forEach((output) => output.apply(output, [this.source, level, ...objects]));
        }
    }
}

const d$2 = new Logger('zemit/core/model');
class Model {
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
        d$2.d('assignToArrayByProperty', target, this, props);
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
                d$2.d('assignToArrayByProperty:assign', object, this);
                append = false;
                object.assign(this);
            }
        }
        if (append) {
            d$2.d('assignToArrayByProperty:append', target, this);
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

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const createError = require('./../../node_modules/axios/lib/core/createError.js');
const d$1 = new Logger('zemit/core/service');
class ServiceConfig {
    model = Model;
    config;
}
class Service extends ServiceConfig {
    http;
    baseUrl = '';
    modelUrl = '';
    endpointList = {
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
    refreshOnUnauthorized = true;
    constructor(opts = {}) {
        super();
        Object.assign(this, opts);
    }
    static getInstance(opts = {}) {
        const instance = new this();
        for (const key in opts) {
            if (opts.hasOwnProperty(key)) {
                const keyTyped = key;
                instance[key] = opts[keyTyped];
            }
        }
        return instance;
    }
    getEndpointUrl = (endpoint) => this.endpointList[endpoint] || endpoint;
    setEndpointUrl = (endpoint, url) => (this.endpointList[endpoint] = url);
    getBaseUrl = () => this.baseUrl;
    setBaseUrl = (url) => (this.baseUrl = url);
    setModelUrl = (url) => (this.modelUrl = url);
    getModelUrl = () => this.modelUrl;
    /**
     * Build an endpoint url using the baseUrl + modelUrl + endpointUrl
     * @param endpoint
     */
    getUrl(endpoint) {
        return [this.getBaseUrl(), this.getModelUrl(), this.getEndpointUrl(endpoint)]
            .filter(Boolean)
            .join('/')
            .replace(/\/+/g, '/');
    }
    /**
     * Endpoint URL getters
     * @return string
     */
    getGetAllUrl = () => this.getUrl('getAll');
    getGetListUrl = () => this.getUrl('getList');
    getGetUrl = () => this.getUrl('get');
    getImportUrl = () => this.getUrl('import');
    getExportUrl = () => this.getUrl('export');
    getCountUrl = () => this.getUrl('count');
    getNewUrl = () => this.getUrl('new');
    getValidateUrl = () => this.getUrl('validate');
    getCreateUrl = () => this.getUrl('create');
    getUpdateUrl = () => this.getUrl('update');
    getSaveUrl = () => this.getUrl('save');
    getDeleteUrl = () => this.getUrl('delete');
    getRestoreUrl = () => this.getUrl('restore');
    getLogoutUrl = () => this.getUrl('logout');
    getLoginUrl = () => this.getUrl('login');
    getUploadUrl = () => this.getUrl('upload');
    getAll = (data = {}, config = {}) => this.handleRequest(this.getGetAllUrl(), data, config);
    getList = (data = {}, config = {}) => this.handleRequest(this.getGetListUrl(), data, config);
    get = (data = {}, config = {}) => this.handleRequest(this.getGetUrl(), data, config);
    import = (data = {}, config = {}) => this.handleRequest(this.getImportUrl(), data, config);
    export = (data = {}, config = {}) => this.handleRequest(this.getExportUrl(), data, config);
    count = (data = {}, config = {}) => this.handleRequest(this.getCountUrl(), data, config);
    new = (data = {}, config = {}) => this.handleRequest(this.getNewUrl(), data, config);
    validate = (data = {}, config = {}) => this.handleRequest(this.getValidateUrl(), data, config);
    create = (data = {}, config = {}) => this.handleRequest(this.getCreateUrl(), data, config);
    update = (data = {}, config = {}) => this.handleRequest(this.getUpdateUrl(), data, config);
    save = (data = {}, config = {}) => this.handleRequest(this.getSaveUrl(), data, config);
    delete = (data = {}, config = {}) => this.handleRequest(this.getDeleteUrl(), data, config);
    restore = (data = {}, config = {}) => this.handleRequest(this.getRestoreUrl(), data, config);
    upload = (data = {}, config = {}) => this.handleRequest(this.getUploadUrl(), data, config);
    handleRequest(url, data, config = {}, success, error, complete) {
        /**
         * Create default Axios Request
         * Add custom interceptors
         */
        this.http = axios.create(this.config?.axiosRequestConfig);
        this.http.interceptors.response.use(this.responseInterceptor, this.rejectedResponseInterceptor);
        this.http.interceptors.request.use(this.requestInterceptor);
        return this.prepareUploads(data).then((data) => {
            this.prepareRequestConfig(url, data, config);
            this.beforeRequest(config);
            return new Promise((resolve, reject) => this.http(config)
                .then((response) => this.success(response, resolve, reject, success))
                .catch((reason) => this.error(reason, resolve, reject, error))
                .finally(() => this.complete(resolve, reject, complete)));
        });
    }
    /**
     * Prepare request config
     */
    prepareRequestConfig(url, data, config = {}) {
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
    }
    uploadFile(file, category) {
        const formData = new FormData();
        formData.append('file', file);
        return this.handleRequest(this.getBaseUrl() + '/file/upload/' + category, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }
    prepareUploads(model) {
        return new Promise((resolve, reject) => {
            if (!(model instanceof Model)) {
                resolve(model);
            }
            const data = model.toObject();
            const uploadMap = model.uploadMap();
            const promises = [];
            Object.keys(data).forEach((key) => {
                if (uploadMap[key]) {
                    if (data[key] instanceof File) {
                        promises.push(this.uploadFile(data[key], uploadMap[key].category).then((response) => {
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
            Promise.all(promises).then(() => {
                resolve(data);
            });
        });
    }
    /**
     * Process parameters before Axios Request
     */
    beforeRequest(config) {
        d$1.d('beforeRequest', config);
        // prepare model
        if (config.data instanceof Model) {
            config.data = config.data.toObject();
        }
        // prepare array of models
        if (Array.isArray(config.data)) {
            const newData = [];
            config.data.forEach((value, index) => {
                newData[index] = value instanceof Model ? value.toObject() : value;
            });
            config.data = newData;
        }
    }
    /**
     * Request Success Callback
     */
    success = (response, resolve, reject, callable) => {
        if (response?.data?.view?.single) {
            response.data.view.single = new this.model(response.data.view.single);
        }
        if (response?.data?.view?.list) {
            response.data.view.list = response.data.view.list.map((item) => {
                return new this.model(item);
            });
        }
        d$1.d('success', response);
        callable && callable(response);
        resolve(response);
    };
    /**
     * Request Error Callback
     */
    error = (reason, resolve, reject, callable) => {
        d$1.error('error', reason);
        callable && callable(reason);
        reject(reason);
    };
    /**
     * Request Complete Callback
     */
    complete = (resolve, reject, callable) => {
        d$1.d('complete');
        callable && callable();
    };
    /**
     * Axios Success Response
     * Parse Zemit Data Response and reject the request if we don't have valid response
     * - @todo Zemit should return a 401 itself
     */
    responseInterceptor = (response) => {
        d$1.info('interceptor:response', response);
        switch (response?.data?.response) {
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
    retry = false;
    rejectedResponseInterceptor = async (reject) => {
        if (this.refreshOnUnauthorized && reject.response) {
            if (reject.response.status === 401 && !this.retry) {
                this.retry = true;
                // await Identity.refreshPromise();
                // if (Identity.isLoggedIn()) {
                if (reject.config) {
                    return this.http(reject.config);
                }
                // }
            }
        }
        return Promise.reject(reject);
    };
    /**
     * Adding X-Authorization JWT header
     * Refresh the JWT token if expired
     */
    requestInterceptor = async (config) => {
        d$1.info('interceptor:config', config);
        if (config.headers) ;
        return config;
    };
}

class AuthService extends Service {
    modelUrl = '/auth';
    baseUrl = '/api';
    // auth endpoints
    endpointList = {
        get: '/get',
        logout: '/logout',
        login: '/login',
        register: '/register',
        refresh: '/refresh',
    };
    // do not send a refresh request on unauthorized
    refreshOnUnauthorized = false;
    getGetUrl = () => this.getUrl('get');
    getLoginUrl = () => this.getUrl('login');
    getLogoutUrl = () => this.getUrl('logout');
    getRegisterUrl = () => this.getUrl('register');
    getRefreshUrl = () => this.getUrl('refresh');
    get = (data = {}) => this.handleRequest(this.getGetUrl(), data);
    login = (data = {}) => this.handleRequest(this.getLoginUrl(), data);
    logout = (data = {}) => this.handleRequest(this.getLogoutUrl(), data);
    register = (data = {}) => this.handleRequest(this.getRegisterUrl(), data);
    refresh = (data = {}) => this.handleRequest(this.getRefreshUrl(), data);
}

const d = new Logger('zemit/core/identity');
class Identity {
    static identity;
    static refreshResponse = null;
    static setIdentity(identity) {
        d.d('setIdentity', identity);
        this.identity = identity;
        store.session.set('identity', this.identity);
        return this.identity;
    }
    static getIdentity() {
        if (!this.identity) {
            this.identity = store.session.get('identity', undefined);
        }
        d.d('getIdentity', this.identity);
        return this.identity;
    }
    static removeIdentity() {
        d.d('removeIdentity');
        delete this.identity;
        store.session.remove('identity');
    }
    static newIdentity() {
        d.d('newIdentity');
        this.removeIdentity();
        return AuthService.getInstance()
            .get()
            .then((success) => {
            this.setIdentity(success.data.view);
            d.d('new', this.identity);
        });
    }
    static refreshIdentity() {
        d.d('refreshIdentity');
        return AuthService.getInstance()
            .get()
            .then((success) => {
            this.setIdentity(success.data.view);
        })
            .catch((reason) => {
            d.d('refreshIdentity', reason);
            this.removeIdentity();
        });
    }
    /**
     * Check if identity is currently logged in
     */
    static isLoggedIn() {
        const isLoggedIn = this.getIdentity()?.loggedIn;
        d.d('isLoggedIn', isLoggedIn);
        return isLoggedIn;
    }
    /**
     *
     * @param roleList
     * @param or
     * @param inherit
     */
    static hasRole(roleList = [], or = false, inherit = true) {
        d.d('hasRole', roleList, Object.keys(this.identity?.roleList || {}));
        return this.has(roleList, Object.keys(this.identity?.roleList || {}), or);
    }
    /**
     * Check if the needles meet the haystack using nested arrays
     * Reversing ANDs and ORs within each nested subarray
     *
     * @param needles
     * @param haystack
     * @param or
     */
    static has(needles = [], haystack = [], or = false) {
        d.d('has', needles, haystack, or);
        if (!Array.isArray(needles)) {
            needles = [needles];
        }
        const result = [];
        for (const needle of [...needles]) {
            if (Array.isArray(needle)) {
                result.push(this.has(needle, haystack, !or));
            }
            else {
                result.push(haystack.includes(needle));
            }
        }
        return or ? !result.includes(false) : result.includes(true);
    }
    static hasPermission() { }
}

class Utils {
    /**
     * Generates a universally unique identifier (UUID) using the v4 UUID standard.
     *
     * This function is a thin wrapper around the `uuidv4` function from the `uuid` library.
     * The `uuidv4` function generates random UUIDs. With an optional configuration object,
     * you can influence the random UUID, e.g., by supplying your own random values.
     *
     * @param {Partial<V4Options>} options - An optional configuration object for the `uuidv4` function.
     *                                      It's a partial type of V4Options, which means that all properties
     *                                      are optional.
     *
     * @returns {string} A v4 UUID string.
     *
     * @example
     * ```ts
     * const id = Utils.uuid();
     * console.log(id); // Outputs: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed"
     * ```
     *
     * @see {@link https://github.com/uuidjs/uuid#version-4-random}
     */
    static uuid(options = {}) {
        return v4(options);
    }
    /**
     * Removes all types of line breaks from a string.
     *
     * The function replaces three types of line breaks: "\r\n" (Windows), "\n" (Unix), and "\r" (Macintosh)
     * with an empty string, effectively removing them from the string.
     *
     * @param {string} str - The string from which line breaks are to be removed.
     *
     * @returns {string} The string with all line breaks removed.
     *
     * @example
     * ```ts
     * const str = "Hello\nWorld\r\nHow\rAre You";
     * const result = Utils.removeLineBreaks(str);
     * console.log(result); // Outputs: "HelloWorldHowAre You"
     * ```
     */
    static removeLineBreaks(str) {
        return str.replace(/(\r\n|\n|\r)/gm, '');
    }
    /**
     * Converts a string to camelCase. The function works by replacing all words or standalone
     * characters with the first letter of each word capitalized except for the very first character
     * of the string, which is made lowercase.
     *
     * @param str - The string to convert to camelCase.
     * @returns The camelCased string.
     */
    static camelize(str) {
        return camelCase(str, { transform: camelCaseTransformMerge });
    }
    /**
     * Capitalizes the first letter of a string.
     *
     * @param str - The string to capitalize.
     * @returns The capitalized string.
     */
    static capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    /**
     * Function to remove all HTML tags from a string and optionally truncate it to a specified length.
     *
     * This function uses DOMParser().parseFromString() to convert the html string into a DOM Document,
     * and then gets the text content of the body of the Document. It then either returns the entire text
     * content (if limit is null) or a substring of the text content with length limit (if limit is a number).
     *
     * @param html - The string containing HTML tags to strip out.
     * @param limit - The maximum number of characters to keep in the resulting string. If this argument
     * is null, the function will return the entire string without HTML tags. If it's a number, the
     * function will truncate the string without HTML tags to this number of characters.
     *
     * @returns A string without HTML tags and truncated to the specified limit (if any).
     */
    static stripHtml(html, limit = null) {
        // Parse the HTML string into a DOM Document.
        const doc = new DOMParser().parseFromString(html, 'text/html');
        // Get the text content of the body element of the Document, or an empty string if there's no
        // text content.
        const text = doc.body.textContent || '';
        // If limit is null, return the entire text. If limit is a number, return up to limit characters
        // of the text.
        return limit === null ? text : text.length > limit ? text.substring(0, limit) : text;
    }
}

// Zemit Core
class Zemit {
    // Zemit
    rules = Rules;
    model = Model;
    service = Service;
    identity = Identity;
    utils = Utils;
    logger = Logger;
}

export { Identity, LogLevel, Logger, Model, Rules, Service, Utils, Zemit as default };
