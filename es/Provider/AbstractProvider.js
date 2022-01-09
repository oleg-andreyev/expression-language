define(["require", "exports"], function (require, exports) {
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
