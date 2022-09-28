"use strict";
exports.__esModule = true;
exports.AccountManagement = void 0;
var AccountManagement = /** @class */ (function () {
    function AccountManagement() {
        this.listAccount = [];
    }
    AccountManagement.prototype.add = function (t) {
        this.listAccount.push(t);
    };
    AccountManagement.prototype["delete"] = function (id) {
        var index = this.findById(id);
        this.listAccount.splice(index, 1);
    };
    AccountManagement.prototype.edit = function (id, t) {
        var index = this.findById(id);
        this.listAccount[index] = t;
    };
    AccountManagement.prototype.findById = function (id) {
        for (var i = 0; i < this.listAccount.length; i++) {
            if (this.listAccount[i].idUser == id) {
                return i;
            }
        }
        return -1;
    };
    AccountManagement.prototype.show = function () {
        console.log(this.listAccount);
    };
    return AccountManagement;
}());
exports.AccountManagement = AccountManagement;
