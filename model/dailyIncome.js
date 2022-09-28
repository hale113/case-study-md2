"use strict";
exports.__esModule = true;
exports.DailyIncome = void 0;
var DailyIncome = /** @class */ (function () {
    function DailyIncome() {
        this._income = 0;
    }
    Object.defineProperty(DailyIncome.prototype, "date", {
        get: function () {
            return this._date;
        },
        set: function (value) {
            this._date = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DailyIncome.prototype, "income", {
        get: function () {
            return this._income;
        },
        set: function (value) {
            this._income = value;
        },
        enumerable: false,
        configurable: true
    });
    return DailyIncome;
}());
exports.DailyIncome = DailyIncome;
