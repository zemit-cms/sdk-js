"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment_1 = require("moment");
var IpAddress = require("ip-address");
var Rules = /** @class */ (function () {
    function Rules() {
    }
    Rules.empty = function (value) {
        return typeof value === 'undefined' || value === null || value === '' || value === 0 || !value;
    };
    Rules.required = function (value) {
        if (value === void 0) { value = ''; }
        return ((Array.isArray(value) && value.length > 0) ||
            (typeof value === 'string' && !!value) ||
            (typeof value === 'object' && !Array.isArray(value) && value !== null) ||
            (typeof value === 'number' && !isNaN(value)));
    };
    Rules.ipv4 = function (ipv4) {
        try {
            return new IpAddress.Address4(ipv4).isCorrect();
        }
        catch (e) {
            return false;
        }
    };
    Rules.ipv6 = function (ipv6) {
        try {
            return new IpAddress.Address6(ipv6).isCorrect();
        }
        catch (e) {
            return false;
        }
    };
    Rules.email = function (email, options) {
        if (options === void 0) { options = {}; }
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(email).toLowerCase())) {
            // Validate local domain
            var domain = email.split('@')[1];
            if (options.allowLocalDomains) {
                return true;
            }
            else {
                var tld = domain.split('.')[1] || '';
                // TLDs must have at least 2 characters to be valid
                return tld.length >= 2;
            }
        }
        return false;
    };
    Rules.isLength = function (value, length, allowEmpty) {
        if (value === void 0) { value = ''; }
        if (length === void 0) { length = 8; }
        if (allowEmpty === void 0) { allowEmpty = false; }
        return (!value && allowEmpty) || (value || '').length === length;
    };
    Rules.minLength = function (value, min, allowEmpty) {
        if (value === void 0) { value = ''; }
        if (min === void 0) { min = 8; }
        if (allowEmpty === void 0) { allowEmpty = false; }
        return (!value && allowEmpty) || (value || '').length >= min;
    };
    Rules.maxLength = function (value, max) {
        if (value === void 0) { value = ''; }
        if (max === void 0) { max = 16; }
        return (value || '').length <= max;
    };
    Rules.betweenLength = function (value, min, max, allowEmpty) {
        if (value === void 0) { value = ''; }
        if (min === void 0) { min = 0; }
        if (max === void 0) { max = 0; }
        if (allowEmpty === void 0) { allowEmpty = false; }
        return this.minLength(value, min, allowEmpty) && this.maxLength(value, max);
    };
    Rules.isBetween = function (value, min, max) {
        if (value === void 0) { value = 0; }
        if (min === void 0) { min = null; }
        if (max === void 0) { max = null; }
        return !((min !== null && max !== null && (value < min || value > max)) ||
            (min !== null && value < min) ||
            (max !== null && value > max));
    };
    Rules.isBetweenDates = function (value, min, max) {
        if (value === void 0) { value = new Date(); }
        if (min === void 0) { min = null; }
        if (max === void 0) { max = null; }
        return !((min !== null && max !== null && (value < min || value > max)) ||
            (min !== null && value < min) ||
            (max !== null && value > max));
    };
    Rules.identical = function (compare, value) {
        if (compare === void 0) { compare = ''; }
        if (value === void 0) { value = ''; }
        return value === compare;
    };
    Rules.digit = function (value) {
        if (value === void 0) { value = ''; }
        return Number.isInteger(Number(value)) && value !== null;
    };
    Rules.date = function (value, format) {
        if (format === void 0) { format = 'YYYY-MM-DD'; }
        var v = (0, moment_1.default)(value, format);
        return v.isValid();
    };
    Rules.boolean = function (value) {
        if (value === void 0) { value = ''; }
        return typeof value === 'boolean' || value === '1' || value === '0' || value === 1 || value === 0;
    };
    Rules.includes = function (value, domain) {
        return domain.includes(value);
    };
    Rules.excludes = function (value, domain) {
        return !domain.includes(value);
    };
    // The password is at least 8 characters long (?=.{8,}).
    // The password has at least one uppercase letter (?=.*[A-Z]).
    // The password has at least one lowercase letter (?=.*[a-z]).
    // The password has at least one digit (?=.*[0-9]).
    // The password has at least one special character ([^A-Za-z0-9]).
    // Strong: The password has to meet all the requirements.
    Rules.strongPassword = function (value) {
        return /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/.test(value);
    };
    // If the password is at least six characters long and meets all the other requirements, or has no digit but meets the rest of the requirements.
    Rules.mediumPassword = function (value) {
        return /((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))/.test(value);
    };
    Rules.password = function (value) {
        return (this.betweenLength(value, 8, 36) && this.hasLowerCase(value) && this.hasUpperCase(value) && this.hasDigit(value));
    };
    Rules.hasLowerCase = function (value) {
        return typeof value === 'string' ? /[a-z]/.test(value) : false;
    };
    Rules.hasUpperCase = function (value) {
        return typeof value === 'string' ? /[A-Z]/.test(value) : false;
    };
    Rules.hasDigit = function (value) {
        return typeof value === 'string' ? /[0-9]/.test(value) : typeof value === 'number';
    };
    Rules.isPositive = function (value) {
        return value > 0;
    };
    Rules.isNegative = function (value) {
        return value < 0;
    };
    Rules.isFuture = function (value) {
        var today = new Date();
        return value > today;
    };
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
    Rules.containsSpecialChar = function (value, allowEmpty) {
        if (allowEmpty === void 0) { allowEmpty = false; }
        var specialCharRegex = /[!@#$%^&*()\-_=+\[\]{};:,.<>\/?\\|`]/;
        if (value.length === 0) {
            // If the string is empty, return the value of allowEmpty.
            return allowEmpty;
        }
        else {
            // Otherwise, check if the string contains a special character.
            return specialCharRegex.test(value);
        }
    };
    Rules.alphanumeric = function (value, allowEmpty) {
        if (allowEmpty === void 0) { allowEmpty = true; }
        return /[^a-zA-Z0-9]/g.test(value) || (allowEmpty && Rules.empty(value));
    };
    Rules.isUrl = function (value) {
        try {
            var url = new URL(value);
            return true;
        }
        catch (err) {
            return false;
        }
    };
    Rules.isHttpUrl = function (value) {
        try {
            var newUrl = new URL(value);
            return newUrl.protocol === 'http:' || newUrl.protocol === 'https:';
        }
        catch (err) {
            return false;
        }
    };
    Rules.isRegex = function (value) {
        try {
            RegExp(value);
            return true;
        }
        catch (e) {
            return false;
        }
    };
    return Rules;
}());
exports.default = Rules;
//# sourceMappingURL=rules.js.map