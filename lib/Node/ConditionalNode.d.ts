import Node from "./Node";
export default class ConditionalNode extends Node {
    constructor(expr1: Node, expr2: Node, expr3: Node);
    compile(compiler: any): void;
    evaluate(functions: any, values: any): any;
    toArray(): (string | Node)[];
}
