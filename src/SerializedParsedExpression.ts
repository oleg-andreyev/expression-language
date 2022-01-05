
export default class SerializedParsedExpression {
    private expression: any;
    private nodes: any;

    constructor(expression, nodes) {
        this.expression = expression;
        this.nodes = nodes;
    }

    getNodes() {
        return JSON.parse(this.nodes);
    }

}