(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AbstractProvider = /** @class */ (function () {
        function AbstractProvider() {
        }
        AbstractProvider.prototype.getFunctions = function () {
            throw new Error("getFunctions must be implemented by " + this);
        };
        return AbstractProvider;
    }());
    exports.default = AbstractProvider;
});
