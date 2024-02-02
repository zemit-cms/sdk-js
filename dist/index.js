"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moment = exports.uuid = exports.store = exports.LogLevel = exports.Logger = exports.Utils = exports.Identity = exports.Model = exports.Rules = void 0;
// Zemit Core
var rules_1 = require("@/core/rules");
exports.Rules = rules_1.default;
var model_1 = require("@/core/model");
exports.Model = model_1.default;
// import Service from '@/core/service';
var identity_1 = require("@/core/identity");
exports.Identity = identity_1.default;
var utils_1 = require("@/core/utils");
exports.Utils = utils_1.default;
var logger_1 = require("@/core/logger");
exports.Logger = logger_1.default;
Object.defineProperty(exports, "LogLevel", { enumerable: true, get: function () { return logger_1.LogLevel; } });
// External libraries
var store2_1 = require("store2");
exports.store = store2_1.default;
var moment_1 = require("moment");
exports.moment = moment_1.default;
// import jose from 'jose';
var uuid_1 = require("uuid");
exports.uuid = uuid_1.default;
var Zemit = /** @class */ (function () {
    function Zemit() {
        // Zemit
        this.rules = rules_1.default;
        this.model = model_1.default;
        // service = Service;
        this.identity = identity_1.default;
        this.utils = utils_1.default;
        this.logger = logger_1.default;
        // External
        this.moment = moment_1.default;
        this.store = store2_1.default;
        this.uuid = uuid_1.default;
        // jose = jose;
    }
    return Zemit;
}());
exports.default = Zemit;
//# sourceMappingURL=index.js.map