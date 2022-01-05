export default class Expression {
    private expression: any;

    constructor(expression) {
        this.expression = expression;
    }

    /**
     * Gets the expression.
     * @returns {string} The expression
     */
    toString() {
        return this.expression;
    }
}