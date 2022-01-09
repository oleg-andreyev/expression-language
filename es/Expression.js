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
    var Expression = /** @class */ (function () {
        function Expression(expression) {
            this.expression = expression;
        }
        /**
         * Gets the expression.
         * @returns {string} The expression
         */
        Expression.prototype.toString = function () {
            return this.expression;
        };
        return Expression;
    }());
    exports.default = Expression;
});
