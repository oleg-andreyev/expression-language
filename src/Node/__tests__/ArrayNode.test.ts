import ArrayNode from "../ArrayNode";
import ConstantNode from "../ConstantNode";
import Compiler from "../../Compiler";
import Node from "../Node";

function getEvaluateData() {
    return [
        [{b: 'a', "0": "b"}, getArrayNode()]
    ]
}

function getCompileData() {
    return [
        ['{"b": "a", "0": "b"}', getArrayNode()]
    ]
}

function getDumpData() {
    const arrOne = createArrayNode();
    arrOne.addElement(new ConstantNode("c"), new ConstantNode('a"b'));
    arrOne.addElement(new ConstantNode("d"), new ConstantNode('a\\b'));

    const arrTwo = createArrayNode();
    arrTwo.addElement(new ConstantNode('c'));
    arrTwo.addElement(new ConstantNode('d'));
    return [
        ['{"0": "b", "b": "a"}', getArrayNode()],
        ['{"a\\"b": "c", "a\\\\b": "d"}', arrOne],
        ['["c", "d"]', arrTwo]
    ];
}

function getArrayNode() {
    const arr = createArrayNode();
    arr.addElement(new ConstantNode("a"), new ConstantNode("b"));
    arr.addElement(new ConstantNode("b"), new ConstantNode("0"));
    return arr;
}

function createArrayNode() {
    return new ArrayNode();
}

test('evaluate ArrayNode', () => {
    for (const evaluateParams of getEvaluateData()) {
        const args = evaluateParams[0];
        const node = evaluateParams[1] as Node;

        //console.log("Evaluating: ", evaluateParams);
        const evaluated = node.evaluate({}, {});
        //console.log("Evaluated: ", evaluated);
        if (args !== null && typeof args === "object") {
            expect(evaluated).toMatchObject(args);
        }
        else {
            expect(evaluated).toBe(args);
        }
    }
});

test('compile ArrayNode', () => {
    for (const compileParams of getCompileData()) {
        const args = compileParams[0];
        const node = compileParams[1] as Node;

        const compiler = new Compiler({});
        node.compile(compiler);
        expect(compiler.getSource()).toBe(args);
    }
});

test('dump ArrayNode', () => {
    for (const dumpParams of getDumpData()) {
        const args = dumpParams[0];
        const node = dumpParams[1] as Node;

        expect(node.dump()).toBe(args);
    }
});