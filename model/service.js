"use strict";
exports.__esModule = true;
exports.Service = void 0;
var Service = /** @class */ (function () {
    function Service(id, nameService, price) {
        this._id = id;
        this._nameService = nameService;
        this._price = price;
    }
    Object.defineProperty(Service.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Service.prototype, "nameService", {
        get: function () {
            return this._nameService;
        },
        set: function (value) {
            this._nameService = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Service.prototype, "price", {
        get: function () {
            return this._price;
        },
        set: function (value) {
            this._price = value;
        },
        enumerable: false,
        configurable: true
    });
    return Service;
}());
exports.Service = Service;
