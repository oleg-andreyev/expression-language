declare type Nodes = Partial<Record<string | number, Node>>;
export default class Node {
    name: string;
    type: string;
    nodes: Nodes;
    attributes: any;
    constructor(nodes: Nodes, attributes?: any);
    toString(): string;
    compile(compiler: any): void;
    evaluate(functions: any, values: any): any;
    toArray(): any[];
    dump(): string;
    dumpString(value: any): string;
    isHash(value: any): boolean;
}
export {};
