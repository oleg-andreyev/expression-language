import Node from "./Node";
export default class ArrayNode extends Node {
    private index;
    private keyIndex;
    constructor();
    addElement(value: any, key?: any): void;
    compile(compiler: any): void;
    evaluate(functions: any, values: any): any;
    toArray(): any[];
    getKeyValuePairs(): any[];
    compileArguments(compiler: any, withKeys?: boolean): void;
}
