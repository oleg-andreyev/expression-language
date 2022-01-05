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
export default Expression;
