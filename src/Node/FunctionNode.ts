import Node from "./Node";

export default class FunctionNode extends Node {
    constructor(name, _arguments) {
        //console.log("Creating function node: ", name, _arguments);
        super({arguments: _arguments}, {name: name});
        this.name = 'FunctionNode';
    }

    compile(compiler) {
        const _arguments = [];
        for (const node of Object.values(this.nodes.arguments.nodes)) {
            _arguments.push(compiler.subcompile(node));
        }

        const fn = compiler.getFunction(this.attributes.name);

        compiler.raw(fn.compiler.apply(null, _arguments));
    }

    evaluate(functions, values) {
        const _arguments = [values];
        for (const node of Object.values(this.nodes.arguments.nodes)) {
            //console.log("Testing: ", node, functions, values);
            _arguments.push(node.evaluate(functions, values));
        }

        return functions[this.attributes.name]['evaluator'].apply(null, _arguments);
    }

    toArray() {
        const array = [];
        array.push(this.attributes.name);

        for (const node of Object.values(this.nodes.arguments.nodes)) {
            array.push(', ');
            array.push(node);
        }

        array[1] = '(';
        array.push(')');

        return array;
    }
}