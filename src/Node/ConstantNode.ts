import Node from "./Node";

export default class ConstantNode extends Node {
    private isIdentifier: boolean;

    constructor(value, isIdentifier = false) {
        super({}, {value: value});
        this.isIdentifier = isIdentifier;
        this.name = 'ConstantNode';
    }

    compile(compiler) {
        compiler.repr(this.attributes.value, this.isIdentifier);
    }

    evaluate(functions, values) {
        return this.attributes.value;
    }

    toArray() {
        const array = [],
            value = this.attributes.value;

        if (this.isIdentifier) {
            array.push(value);
        } else if (true === value) {
            array.push('true');
        } else if (false === value) {
            array.push('false');
        } else if (null === value) {
            array.push('null');
        } else if (typeof value === "number") {
            array.push(value);
        } else if (typeof value === "string") {
            array.push(this.dumpString(value));
        } else if (Array.isArray(value)) {
            for (const v of value) {
                array.push(',');
                array.push(new ConstantNode(v));
            }
            array[0] = '[';
            array.push(']');
        } else if (this.isHash(value)) {
            for (const k of Object.keys(value)) {
                array.push(', ');
                array.push(new ConstantNode(k));
                array.push(': ');
                array.push(new ConstantNode(value[k]));
            }
            array[0] = '{';
            array.push('}');
        }

        return array;
    }
}