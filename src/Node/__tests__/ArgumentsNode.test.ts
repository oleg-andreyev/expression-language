import ArgumentsNode from "../ArgumentsNode";
import ConstantNode from "../ConstantNode";
import Compiler from "../../Compiler";
import Node from "../Node";

function getCompileData() {
    return [
        ['"a", "b"', getArrayNode()]
    ]
}

function getDumpData() {
    return [
        ['"a", "b"', getArrayNode()]
    ]
}

function getArrayNode() {
    const arr = createArrayNode();
    arr.addElement(new ConstantNode("a"));
    arr.addElement(new ConstantNode("b"));
    return arr;
}

function createArrayNode() {
    return new ArgumentsNode();
}

test('compile ArgumentsNode', () => {
    for (const compileParams of getCompileData()) {
        const expected = compileParams[0];
        const node = compileParams[1] as Node;

        const compiler = new Compiler({});
        node.compile(compiler);
        expect(compiler.getSource()).toBe(expected);
    }
});

test('dump ArgumentsNode', () => {
    for (const dumpParam of getDumpData()) {
        const expected = dumpParam[0];
        const node = dumpParam[1] as Node;

        expect(node.dump()).toBe(expected);
    }
});

