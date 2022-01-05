import Expression from "./Expression";
import Node from "./Node/Node";
export default class ParsedExpression extends Expression {
    private readonly nodes;
    constructor(expression: any, nodes: any);
    getNodes(): Node[];
}
