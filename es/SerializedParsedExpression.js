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
    var SerializedParsedExpression = /** @class */ (function () {
        function SerializedParsedExpression(expression, nodes) {
            this.expression = expression;
            this.nodes = nodes;
        }
        SerializedParsedExpression.prototype.getNodes = function () {
            return JSON.parse(this.nodes);
        };
        return SerializedParsedExpression;
    }());
    exports.default = SerializedParsedExpression;
});
