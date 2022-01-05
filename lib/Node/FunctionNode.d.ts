import Node from "./Node";
export default class FunctionNode extends Node {
    constructor(name: any, _arguments: any);
    compile(compiler: any): void;
    evaluate(functions: any, values: any): any;
    toArray(): any[];
}
