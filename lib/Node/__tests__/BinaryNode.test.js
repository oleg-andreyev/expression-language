import ConstantNode from "../ConstantNode";
import ArrayNode from "../ArrayNode";
import BinaryNode from "../BinaryNode";
import Compiler from "../../Compiler";
function getEvaluateData() {
    var arr = new ArrayNode();
    arr.addElement(new ConstantNode('a'));
    arr.addElement(new ConstantNode('b'));
    return [
        [true, new BinaryNode('or', new ConstantNode(true), new ConstantNode(false))],
        [true, new BinaryNode('||', new ConstantNode(true), new ConstantNode(false))],
        [false, new BinaryNode('and', new ConstantNode(true), new ConstantNode(false))],
        [false, new BinaryNode('&&', new ConstantNode(true), new ConstantNode(false))],
        [0, new BinaryNode('&', new ConstantNode(2), new ConstantNode(4))],
        [6, new BinaryNode('|', new ConstantNode(2), new ConstantNode(4))],
        [6, new BinaryNode('^', new ConstantNode(2), new ConstantNode(4))],
        [true, new BinaryNode('<', new ConstantNode(1), new ConstantNode(2))],
        [true, new BinaryNode('<=', new ConstantNode(1), new ConstantNode(2))],
        [true, new BinaryNode('<=', new ConstantNode(1), new ConstantNode(1))],
        [false, new BinaryNode('>', new ConstantNode(1), new ConstantNode(2))],
        [false, new BinaryNode('>=', new ConstantNode(1), new ConstantNode(2))],
        [true, new BinaryNode('>=', new ConstantNode(1), new ConstantNode(1))],
        [true, new BinaryNode('===', new ConstantNode(true), new ConstantNode(true))],
        [false, new BinaryNode('!==', new ConstantNode(true), new ConstantNode(true))],
        [false, new BinaryNode('==', new ConstantNode(2), new ConstantNode(1))],
        [true, new BinaryNode('!=', new ConstantNode(2), new ConstantNode(1))],
        [-1, new BinaryNode('-', new ConstantNode(1), new ConstantNode(2))],
        [3, new BinaryNode('+', new ConstantNode(1), new ConstantNode(2))],
        [4, new BinaryNode('*', new ConstantNode(2), new ConstantNode(2))],
        [1, new BinaryNode('/', new ConstantNode(2), new ConstantNode(2))],
        [1, new BinaryNode('%', new ConstantNode(5), new ConstantNode(2))],
        [25, new BinaryNode('**', new ConstantNode(5), new ConstantNode(2))],
        ['ab', new BinaryNode('~', new ConstantNode('a'), new ConstantNode('b'))],
        [true, new BinaryNode('in', new ConstantNode('a'), arr)],
        [false, new BinaryNode('in', new ConstantNode('c'), arr)],
        [true, new BinaryNode('not in', new ConstantNode('c'), arr)],
        [false, new BinaryNode('not in', new ConstantNode('a'), arr)],
        [[1, 2, 3], new BinaryNode('..', new ConstantNode(1), new ConstantNode(3))],
        [true, new BinaryNode('matches', new ConstantNode('abc'), new ConstantNode('/^[a-z]+$/'))],
    ];
}
function getCompileData() {
    var arr = new ArrayNode();
    arr.addElement(new ConstantNode('a'));
    arr.addElement(new ConstantNode('b'));
    return [
        ['(true || false)', new BinaryNode('or', new ConstantNode(true), new ConstantNode(false))],
        ['(true || false)', new BinaryNode('||', new ConstantNode(true), new ConstantNode(false))],
        ['(true && false)', new BinaryNode('and', new ConstantNode(true), new ConstantNode(false))],
        ['(true && false)', new BinaryNode('&&', new ConstantNode(true), new ConstantNode(false))],
        ['(2 & 4)', new BinaryNode('&', new ConstantNode(2), new ConstantNode(4))],
        ['(2 | 4)', new BinaryNode('|', new ConstantNode(2), new ConstantNode(4))],
        ['(2 ^ 4)', new BinaryNode('^', new ConstantNode(2), new ConstantNode(4))],
        ['(1 < 2)', new BinaryNode('<', new ConstantNode(1), new ConstantNode(2))],
        ['(1 <= 2)', new BinaryNode('<=', new ConstantNode(1), new ConstantNode(2))],
        ['(1 <= 1)', new BinaryNode('<=', new ConstantNode(1), new ConstantNode(1))],
        ['(1 > 2)', new BinaryNode('>', new ConstantNode(1), new ConstantNode(2))],
        ['(1 >= 2)', new BinaryNode('>=', new ConstantNode(1), new ConstantNode(2))],
        ['(1 >= 1)', new BinaryNode('>=', new ConstantNode(1), new ConstantNode(1))],
        ['(true === true)', new BinaryNode('===', new ConstantNode(true), new ConstantNode(true))],
        ['(true !== true)', new BinaryNode('!==', new ConstantNode(true), new ConstantNode(true))],
        ['(2 == 1)', new BinaryNode('==', new ConstantNode(2), new ConstantNode(1))],
        ['(2 != 1)', new BinaryNode('!=', new ConstantNode(2), new ConstantNode(1))],
        ['(1 - 2)', new BinaryNode('-', new ConstantNode(1), new ConstantNode(2))],
        ['(1 + 2)', new BinaryNode('+', new ConstantNode(1), new ConstantNode(2))],
        ['(2 * 2)', new BinaryNode('*', new ConstantNode(2), new ConstantNode(2))],
        ['(2 / 2)', new BinaryNode('/', new ConstantNode(2), new ConstantNode(2))],
        ['(5 % 2)', new BinaryNode('%', new ConstantNode(5), new ConstantNode(2))],
        ['Math.pow(5, 2)', new BinaryNode('**', new ConstantNode(5), new ConstantNode(2))],
        ['("a" . "b")', new BinaryNode('~', new ConstantNode('a'), new ConstantNode('b'))],
        ['includes("a", ["a", "b"])', new BinaryNode('in', new ConstantNode('a'), arr)],
        ['includes("c", ["a", "b"])', new BinaryNode('in', new ConstantNode('c'), arr)],
        ['!includes("c", ["a", "b"])', new BinaryNode('not in', new ConstantNode('c'), arr)],
        ['!includes("a", ["a", "b"])', new BinaryNode('not in', new ConstantNode('a'), arr)],
        ['range(1, 3)', new BinaryNode('..', new ConstantNode(1), new ConstantNode(3))],
        ['/^[a-z]+\$/i.test("abc")', new BinaryNode('matches', new ConstantNode('abc'), new ConstantNode('/^[a-z]+$/i', true))],
    ];
}
function getDumpData() {
    var arr = new ArrayNode();
    arr.addElement(new ConstantNode('a'));
    arr.addElement(new ConstantNode('b'));
    return [
        ['(true or false)', new BinaryNode('or', new ConstantNode(true), new ConstantNode(false))],
        ['(true || false)', new BinaryNode('||', new ConstantNode(true), new ConstantNode(false))],
        ['(true and false)', new BinaryNode('and', new ConstantNode(true), new ConstantNode(false))],
        ['(true && false)', new BinaryNode('&&', new ConstantNode(true), new ConstantNode(false))],
        ['(2 & 4)', new BinaryNode('&', new ConstantNode(2), new ConstantNode(4))],
        ['(2 | 4)', new BinaryNode('|', new ConstantNode(2), new ConstantNode(4))],
        ['(2 ^ 4)', new BinaryNode('^', new ConstantNode(2), new ConstantNode(4))],
        ['(1 < 2)', new BinaryNode('<', new ConstantNode(1), new ConstantNode(2))],
        ['(1 <= 2)', new BinaryNode('<=', new ConstantNode(1), new ConstantNode(2))],
        ['(1 <= 1)', new BinaryNode('<=', new ConstantNode(1), new ConstantNode(1))],
        ['(1 > 2)', new BinaryNode('>', new ConstantNode(1), new ConstantNode(2))],
        ['(1 >= 2)', new BinaryNode('>=', new ConstantNode(1), new ConstantNode(2))],
        ['(1 >= 1)', new BinaryNode('>=', new ConstantNode(1), new ConstantNode(1))],
        ['(true === true)', new BinaryNode('===', new ConstantNode(true), new ConstantNode(true))],
        ['(true !== true)', new BinaryNode('!==', new ConstantNode(true), new ConstantNode(true))],
        ['(2 == 1)', new BinaryNode('==', new ConstantNode(2), new ConstantNode(1))],
        ['(2 != 1)', new BinaryNode('!=', new ConstantNode(2), new ConstantNode(1))],
        ['(1 - 2)', new BinaryNode('-', new ConstantNode(1), new ConstantNode(2))],
        ['(1 + 2)', new BinaryNode('+', new ConstantNode(1), new ConstantNode(2))],
        ['(2 * 2)', new BinaryNode('*', new ConstantNode(2), new ConstantNode(2))],
        ['(2 / 2)', new BinaryNode('/', new ConstantNode(2), new ConstantNode(2))],
        ['(5 % 2)', new BinaryNode('%', new ConstantNode(5), new ConstantNode(2))],
        ['(5 ** 2)', new BinaryNode('**', new ConstantNode(5), new ConstantNode(2))],
        ['("a" ~ "b")', new BinaryNode('~', new ConstantNode('a'), new ConstantNode('b'))],
        ['("a" in ["a", "b"])', new BinaryNode('in', new ConstantNode('a'), arr)],
        ['("c" in ["a", "b"])', new BinaryNode('in', new ConstantNode('c'), arr)],
        ['("c" not in ["a", "b"])', new BinaryNode('not in', new ConstantNode('c'), arr)],
        ['("a" not in ["a", "b"])', new BinaryNode('not in', new ConstantNode('a'), arr)],
        ['(1 .. 3)', new BinaryNode('..', new ConstantNode(1), new ConstantNode(3))],
        ['("abc" matches "/^[a-z]+/i$/")', new BinaryNode('matches', new ConstantNode('abc'), new ConstantNode('/^[a-z]+/i$/'))],
    ];
}
test('evaluate BinaryNode', function () {
    for (var _i = 0, _a = getEvaluateData(); _i < _a.length; _i++) {
        var evaluateParams = _a[_i];
        var expected = evaluateParams[0];
        var node = evaluateParams[1];
        //console.log("Evaluating: ", evaluateParams);
        var evaluated = node.evaluate({}, {});
        //console.log("Evaluated: ", evaluated);
        if (expected !== null && typeof expected === "object") {
            expect(evaluated).toMatchObject(expected);
        }
        else {
            expect(evaluated).toBe(expected);
        }
    }
});
test('compile BinaryNode', function () {
    for (var _i = 0, _a = getCompileData(); _i < _a.length; _i++) {
        var compileParams = _a[_i];
        var expected = compileParams[0];
        var node = compileParams[1];
        var compiler = new Compiler({});
        node.compile(compiler);
        expect(compiler.getSource()).toBe(expected);
    }
});
test('dump BinaryNode', function () {
    for (var _i = 0, _a = getDumpData(); _i < _a.length; _i++) {
        var dumpParams = _a[_i];
        var expected = dumpParams[0];
        var node = dumpParams[1];
        expect(node.dump()).toBe(expected);
    }
});
