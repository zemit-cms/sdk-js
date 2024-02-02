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
var model_1 = require("../core/model");
var group_model_1 = require("./group.model");
var role_model_1 = require("./role.model");
var type_model_1 = require("./type.model");
var UserModel = /** @class */ (function (_super) {
    __extends(UserModel, _super);
    function UserModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserModel.prototype.default = function () {
        return {
            roleList: [],
            groupList: [],
            typeList: [],
        };
    };
    UserModel.prototype.relatedMap = function () {
        return {
            roleList: role_model_1.default,
            groupList: group_model_1.default,
            typeList: type_model_1.default,
        };
    };
    UserModel.prototype.getLabel = function () {
        return this.data.firstName + ' ' + this.data.lastName + ' <' + this.data.email + '>';
    };
    UserModel.prototype.getFullName = function () {
        return this.data.firstName + ' ' + this.data.lastName;
    };
    UserModel.prototype.getInitials = function () {
        var str = this.data.firstName + ' ' + this.data.lastName;
        return str.split(/\s/).reduce(function (response, word) { return (response += word.slice(0, 1)); }, '');
    };
    return UserModel;
}(model_1.default));
exports.default = UserModel;
//# sourceMappingURL=user.model.js.map