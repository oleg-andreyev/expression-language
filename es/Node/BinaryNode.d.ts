import Node from "./Node";
export default class BinaryNode extends Node {
    static regex_expression: RegExp;
    static operators: {
        '~': string;
        and: string;
        or: string;
    };
    static functions: {
        '**': string;
        '..': string;
        in: string;
        'not in': string;
    };
    constructor(operator: any, left: any, right: any);
    compile(compiler: any): void;
    evaluate(functions: any, values: any): any;
    toArray(): (string | Node)[];
}
