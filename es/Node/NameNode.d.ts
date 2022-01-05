import Node from "./Node";
export default class NameNode extends Node {
    constructor(name: any);
    compile(compiler: any): void;
    evaluate(functions: any, values: any): any;
    toArray(): any[];
}
