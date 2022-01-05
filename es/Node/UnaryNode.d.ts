import Node from "./Node";
export default class UnaryNode extends Node {
    static operators: {
        '!': string;
        not: string;
        '+': string;
        '-': string;
    };
    constructor(operator: any, node: any);
    compile(compiler: any): void;
    evaluate(functions: any, values: any): any;
    toArray(): (string | Node)[];
}
