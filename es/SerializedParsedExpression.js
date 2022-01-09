define(["require", "exports"], function (require, exports) {
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
