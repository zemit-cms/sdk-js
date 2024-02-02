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
Object.defineProperty(exports, "__esModule", { value: true });
var service_1 = require("@/core/service");
var AuthService = /** @class */ (function (_super) {
    __extends(AuthService, _super);
    function AuthService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.modelUrl = '/auth';
        _this.baseUrl = '/api';
        // auth endpoints
        _this.endpointList = {
            get: '/get',
            logout: '/logout',
            login: '/login',
            register: '/register',
            refresh: '/refresh',
        };
        // do not send a refresh request on unauthorized
        _this.refreshOnUnauthorized = false;
        _this.getGetUrl = function () { return _this.getUrl('get'); };
        _this.getLoginUrl = function () { return _this.getUrl('login'); };
        _this.getLogoutUrl = function () { return _this.getUrl('logout'); };
        _this.getRegisterUrl = function () { return _this.getUrl('register'); };
        _this.getRefreshUrl = function () { return _this.getUrl('refresh'); };
        _this.get = function (data) {
            if (data === void 0) { data = {}; }
            return _this.handleRequest(_this.getGetUrl(), data);
        };
        _this.login = function (data) {
            if (data === void 0) { data = {}; }
            return _this.handleRequest(_this.getLoginUrl(), data);
        };
        _this.logout = function (data) {
            if (data === void 0) { data = {}; }
            return _this.handleRequest(_this.getLogoutUrl(), data);
        };
        _this.register = function (data) {
            if (data === void 0) { data = {}; }
            return _this.handleRequest(_this.getRegisterUrl(), data);
        };
        _this.refresh = function (data) {
            if (data === void 0) { data = {}; }
            return _this.handleRequest(_this.getRefreshUrl(), data);
        };
        return _this;
    }
    return AuthService;
}(service_1.default));
exports.default = AuthService;
//# sourceMappingURL=auth.service.js.map