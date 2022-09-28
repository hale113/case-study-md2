"use strict";
exports.__esModule = true;
exports.ComputerManagement = void 0;
var computer_1 = require("../model/computer");
var ComputerManagement = /** @class */ (function () {
    function ComputerManagement() {
        this.listComputer = [];
        var may1 = new computer_1.Computer(1, "may 1", "off");
        var may2 = new computer_1.Computer(2, "may 2", "off");
        var may3 = new computer_1.Computer(3, "may 3", "off");
        var may4 = new computer_1.Computer(4, "may 4", "off");
        var may5 = new computer_1.Computer(5, "may 5", "off");
        var may6 = new computer_1.Computer(6, "may 6", "off");
        var may7 = new computer_1.Computer(7, "may 7", "off");
        var may8 = new computer_1.Computer(8, "may 8", "off");
        var may9 = new computer_1.Computer(9, "may 9", "off");
        var may10 = new computer_1.Computer(10, "may 10", "off");
        this.listComputer.push(may1, may2, may3, may4, may5, may6, may7, may8, may9, may10);
    }
    ComputerManagement.prototype.add = function (t) {
        this.listComputer.push(t);
    };
    ComputerManagement.prototype["delete"] = function (id) {
        var index = this.findById(id);
        this.listComputer.splice(index, 1);
    };
    ComputerManagement.prototype.edit = function (id, t) {
        var index = this.findById(id);
        this.listComputer[index] = t;
    };
    ComputerManagement.prototype.findById = function (id) {
        for (var i = 0; i < this.listComputer.length; i++) {
            if (this.listComputer[i].id == id) {
                return i;
            }
        }
        return -1;
    };
    ComputerManagement.prototype.show = function () {
        return this.listComputer;
    };
    return ComputerManagement;
}());
exports.ComputerManagement = ComputerManagement;
