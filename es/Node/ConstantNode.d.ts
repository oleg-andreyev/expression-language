import Node from "./Node";
export default class ConstantNode extends Node {
    private isIdentifier;
    constructor(value: any, isIdentifier?: boolean);
    compile(compiler: any): void;
    evaluate(functions: any, values: any): any;
    toArray(): any[];
}
