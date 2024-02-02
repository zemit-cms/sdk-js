"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var auth_service_1 = require("@/services/auth.service");
var logger_1 = require("@/core/logger");
var store2_1 = require("store2");
var d = new logger_1.default('zemit/core/identity');
var Identity = /** @class */ (function () {
    function Identity() {
    }
    Identity.setIdentity = function (identity) {
        d.d('setIdentity', identity);
        this.identity = identity;
        store2_1.default.session.set('identity', this.identity);
        return this.identity;
    };
    Identity.getIdentity = function () {
        if (!this.identity) {
            this.identity = store2_1.default.session.get('identity', undefined);
        }
        d.d('getIdentity', this.identity);
        return this.identity;
    };
    Identity.removeIdentity = function () {
        d.d('removeIdentity');
        delete this.identity;
        store2_1.default.session.remove('identity');
    };
    Identity.newIdentity = function () {
        var _this = this;
        d.d('newIdentity');
        this.removeIdentity();
        return auth_service_1.default.getInstance()
            .get()
            .then(function (success) {
            _this.setIdentity(success.data.view);
            d.d('new', _this.identity);
        });
    };
    Identity.refreshIdentity = function () {
        var _this = this;
        d.d('refreshIdentity');
        return auth_service_1.default.getInstance()
            .get()
            .then(function (success) {
            _this.setIdentity(success.data.view);
        })
            .catch(function (reason) {
            d.d('refreshIdentity', reason);
            _this.removeIdentity();
        });
    };
    /**
     * Check if identity is currently logged in
     */
    Identity.isLoggedIn = function () {
        var _a;
        var isLoggedIn = (_a = this.getIdentity()) === null || _a === void 0 ? void 0 : _a.loggedIn;
        d.d('isLoggedIn', isLoggedIn);
        return isLoggedIn;
    };
    /**
     *
     * @param roleList
     * @param or
     * @param inherit
     */
    Identity.hasRole = function (roleList, or, inherit) {
        var _a, _b;
        if (roleList === void 0) { roleList = []; }
        if (or === void 0) { or = false; }
        if (inherit === void 0) { inherit = true; }
        d.d('hasRole', roleList, Object.keys(((_a = this.identity) === null || _a === void 0 ? void 0 : _a.roleList) || {}));
        return this.has(roleList, Object.keys(((_b = this.identity) === null || _b === void 0 ? void 0 : _b.roleList) || {}), or);
    };
    /**
     * Check if the needles meet the haystack using nested arrays
     * Reversing ANDs and ORs within each nested subarray
     *
     * @param needles
     * @param haystack
     * @param or
     */
    Identity.has = function (needles, haystack, or) {
        if (needles === void 0) { needles = []; }
        if (haystack === void 0) { haystack = []; }
        if (or === void 0) { or = false; }
        d.d('has', needles, haystack, or);
        if (!Array.isArray(needles)) {
            needles = [needles];
        }
        var result = [];
        for (var _i = 0, _a = __spreadArray([], needles, true); _i < _a.length; _i++) {
            var needle = _a[_i];
            if (Array.isArray(needle)) {
                result.push(this.has(needle, haystack, !or));
            }
            else {
                result.push(haystack.includes(needle));
            }
        }
        return or ? !result.includes(false) : result.includes(true);
    };
    Identity.hasPermission = function () { };
    Identity.refreshResponse = null;
    Identity.refreshPromise = function () {
        var _a;
        if (!Identity.refreshResponse) {
            var refreshToken_1 = (_a = Identity.getIdentity()) === null || _a === void 0 ? void 0 : _a.refreshToken;
            Identity.refreshResponse = new Promise(function (resolve, reject) {
                return auth_service_1.default.getInstance()
                    .refresh({ refreshToken: refreshToken_1 })
                    .then(function (response) { return Identity.setIdentity(response.data.view) && resolve(response); })
                    .catch(function (reason) { return reject(reason); })
                    .finally(function () { return (Identity.refreshResponse = null); });
            });
        }
        return Identity.refreshResponse;
    };
    return Identity;
}());
exports.default = Identity;
//# sourceMappingURL=identity.js.map