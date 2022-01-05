import ConstantNode from "../ConstantNode";
import Compiler from "../../Compiler";
import Node from "../Node";

function getEvaluateData() {
    return [
        [false, new ConstantNode(false)],
        [true, new ConstantNode(true)],
        [null, new ConstantNode(null)],
        [3, new ConstantNode(3)],
        [3.3, new ConstantNode(3.3)],
        ['foo', new ConstantNode('foo')],
        [{one: 1, b: 'a'}, new ConstantNode({one: 1, b: 'a'})]
    ]
}

function getCompileData() {
    return [
        ['false', new ConstantNode(false)],
        ['true', new ConstantNode(true)],
        ['null', new ConstantNode(null)],
        ['3', new ConstantNode(3)],
        ['3.3', new ConstantNode(3.3)],
        ['"foo"', new ConstantNode('foo')],
        ['{\"one\":1, \"b\":"a"}', new ConstantNode({one: 1, b: 'a'})]
    ];
}

function getDumpData() {
    return [
        ['false', new ConstantNode(false)],
        ['true', new ConstantNode(true)],
        ['null', new ConstantNode(null)],
        ['3', new ConstantNode(3)],
        ['3.3', new ConstantNode(3.3)],
        ['"foo"', new ConstantNode('foo')],
        ['foo', new ConstantNode('foo', true)],
        ['{"one": 1}', new ConstantNode({one: 1})],
        ['{\"one\": 1, "c": true, \"b\": "a"}', new ConstantNode({one: 1, c: true, b: 'a'})],
        ['["c","d"]', new ConstantNode(["c", "d"])],
        ['{"a": ["b"]}', new ConstantNode({a: ["b"]})]
    ]
}

test('evaluate ConstantNode', () => {
    for (const evaluateParams of getEvaluateData()) {
        const expected = evaluateParams[0];
        const node = evaluateParams[1] as Node;

        const evaluate = node.evaluate({}, {});
        if (expected !== null && typeof expected === "object") {
            expect(evaluate).toMatchObject(expected);
        }
        else {
            expect(evaluate).toBe(expected);
        }
    }
});

test('compile ConstantNode', () => {
    for (const compileParams of getCompileData()) {
        const expected = compileParams[0];
        const node = compileParams[1] as Node;

        const compiler = new Compiler({});
        node.compile(compiler);
        expect(compiler.getSource()).toBe(expected);
    }
});

test('dump ConstantNode', () => {
    for (const dumpParams of getDumpData()) {
        const expected = dumpParams[0];
        const node = dumpParams[1] as Node;

        expect(node.dump()).toBe(expected);
    }
});