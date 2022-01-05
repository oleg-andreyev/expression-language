import Node from "./Node";

export default class NameNode extends Node {
    constructor(name) {
        super([] as Record<undefined, undefined>, {name: name});
        this.name = 'NameNode';
    }

    compile(compiler) {
        compiler.raw(this.attributes.name);
    }

    evaluate(functions, values) {
        return values[this.attributes.name];
    }

    toArray() {
        return [this.attributes.name];
    }
}