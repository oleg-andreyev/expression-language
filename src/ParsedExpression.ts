import Expression from "./Expression";
import Node from "./Node/Node";

export default class ParsedExpression extends Expression {
    private readonly nodes: Node[];

    constructor(expression, nodes) {
        super(expression);
        this.nodes = nodes;
    }

    getNodes () {
        return this.nodes;
    }
}