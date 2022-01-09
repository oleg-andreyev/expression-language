import ArrayNode from "../ArrayNode";
import ConstantNode from "../ConstantNode";
import Compiler from "../../Compiler";
function getEvaluateData() {
    return [
        [{ b: 'a', "0": "b" }, getArrayNode()]
    ];
}
function getCompileData() {
    return [
        ['{"b": "a", "0": "b"}', getArrayNode()]
    ];
}
function getDumpData() {
    var arrOne = createArrayNode();
    arrOne.addElement(new ConstantNode("c"), new ConstantNode('a"b'));
    arrOne.addElement(new ConstantNode("d"), new ConstantNode('a\\b'));
    var arrTwo = createArrayNode();
    arrTwo.addElement(new ConstantNode('c'));
    arrTwo.addElement(new ConstantNode('d'));
    return [
        ['{"0": "b", "b": "a"}', getArrayNode()],
        ['{"a\\"b": "c", "a\\\\b": "d"}', arrOne],
        ['["c", "d"]', arrTwo]
    ];
}
function getArrayNode() {
    var arr = createArrayNode();
    arr.addElement(new ConstantNode("a"), new ConstantNode("b"));
    arr.addElement(new ConstantNode("b"), new ConstantNode("0"));
    return arr;
}
function createArrayNode() {
    return new ArrayNode();
}
test('evaluate ArrayNode', function () {
    for (var _i = 0, _a = getEvaluateData(); _i < _a.length; _i++) {
        var evaluateParams = _a[_i];
        var args = evaluateParams[0];
        var node = evaluateParams[1];
        //console.log("Evaluating: ", evaluateParams);
        var evaluated = node.evaluate({}, {});
        //console.log("Evaluated: ", evaluated);
        if (args !== null && typeof args === "object") {
            expect(evaluated).toMatchObject(args);
        }
        else {
            expect(evaluated).toBe(args);
        }
    }
});
test('compile ArrayNode', function () {
    for (var _i = 0, _a = getCompileData(); _i < _a.length; _i++) {
        var compileParams = _a[_i];
        var args = compileParams[0];
        var node = compileParams[1];
        var compiler = new Compiler({});
        node.compile(compiler);
        expect(compiler.getSource()).toBe(args);
    }
});
test('dump ArrayNode', function () {
    for (var _i = 0, _a = getDumpData(); _i < _a.length; _i++) {
        var dumpParams = _a[_i];
        var args = dumpParams[0];
        var node = dumpParams[1];
        expect(node.dump()).toBe(args);
    }
});
