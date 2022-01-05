import ConstantNode from "../ConstantNode";
import Compiler from "../../Compiler";
function getEvaluateData() {
    return [
        [false, new ConstantNode(false)],
        [true, new ConstantNode(true)],
        [null, new ConstantNode(null)],
        [3, new ConstantNode(3)],
        [3.3, new ConstantNode(3.3)],
        ['foo', new ConstantNode('foo')],
        [{ one: 1, b: 'a' }, new ConstantNode({ one: 1, b: 'a' })]
    ];
}
function getCompileData() {
    return [
        ['false', new ConstantNode(false)],
        ['true', new ConstantNode(true)],
        ['null', new ConstantNode(null)],
        ['3', new ConstantNode(3)],
        ['3.3', new ConstantNode(3.3)],
        ['"foo"', new ConstantNode('foo')],
        ['{\"one\":1, \"b\":"a"}', new ConstantNode({ one: 1, b: 'a' })]
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
        ['{"one": 1}', new ConstantNode({ one: 1 })],
        ['{\"one\": 1, "c": true, \"b\": "a"}', new ConstantNode({ one: 1, c: true, b: 'a' })],
        ['["c","d"]', new ConstantNode(["c", "d"])],
        ['{"a": ["b"]}', new ConstantNode({ a: ["b"] })]
    ];
}
test('evaluate ConstantNode', function () {
    for (var _i = 0, _a = getEvaluateData(); _i < _a.length; _i++) {
        var evaluateParams = _a[_i];
        var expected = evaluateParams[0];
        var node = evaluateParams[1];
        var evaluate = node.evaluate({}, {});
        if (expected !== null && typeof expected === "object") {
            expect(evaluate).toMatchObject(expected);
        }
        else {
            expect(evaluate).toBe(expected);
        }
    }
});
test('compile ConstantNode', function () {
    for (var _i = 0, _a = getCompileData(); _i < _a.length; _i++) {
        var compileParams = _a[_i];
        var expected = compileParams[0];
        var node = compileParams[1];
        var compiler = new Compiler({});
        node.compile(compiler);
        expect(compiler.getSource()).toBe(expected);
    }
});
test('dump ConstantNode', function () {
    for (var _i = 0, _a = getDumpData(); _i < _a.length; _i++) {
        var dumpParams = _a[_i];
        var expected = dumpParams[0];
        var node = dumpParams[1];
        expect(node.dump()).toBe(expected);
    }
});
