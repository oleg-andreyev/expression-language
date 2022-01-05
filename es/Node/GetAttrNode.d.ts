import Node from "./Node";
export default class GetAttrNode extends Node {
    static PROPERTY_CALL: number;
    static METHOD_CALL: number;
    static ARRAY_CALL: number;
    constructor(node: any, attribute: any, _arguments: any, type: any);
    compile(compiler: any): void;
    evaluate(functions: any, values: any): any;
    toArray(): (string | Node)[];
}
