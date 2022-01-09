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
export default SerializedParsedExpression;
