"use strict";
exports.__esModule = true;
exports.Account = void 0;
var Account = /** @class */ (function () {
    function Account(id, name, pass) {
        this._idUser = id;
        this._name = name;
        this._pass = pass;
    }
    Object.defineProperty(Account.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Account.prototype, "pass", {
        get: function () {
            return this._pass;
        },
        set: function (value) {
            this._pass = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Account.prototype, "idUser", {
        get: function () {
            return this._idUser;
        },
        set: function (value) {
            this._idUser = value;
        },
        enumerable: false,
        configurable: true
    });
    return Account;
}());
exports.Account = Account;
