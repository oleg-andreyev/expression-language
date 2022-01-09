define(["require", "exports", "../ConstantNode", "../ArrayNode", "../BinaryNode", "../../Compiler"], function (require, exports, ConstantNode_1, ArrayNode_1, BinaryNode_1, Compiler_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function getEvaluateData() {
        var arr = new ArrayNode_1.default();
        arr.addElement(new ConstantNode_1.default('a'));
        arr.addElement(new ConstantNode_1.default('b'));
        return [
            [true, new BinaryNode_1.default('or', new ConstantNode_1.default(true), new ConstantNode_1.default(false))],
            [true, new BinaryNode_1.default('||', new ConstantNode_1.default(true), new ConstantNode_1.default(false))],
            [false, new BinaryNode_1.default('and', new ConstantNode_1.default(true), new ConstantNode_1.default(false))],
            [false, new BinaryNode_1.default('&&', new ConstantNode_1.default(true), new ConstantNode_1.default(false))],
            [0, new BinaryNode_1.default('&', new ConstantNode_1.default(2), new ConstantNode_1.default(4))],
            [6, new BinaryNode_1.default('|', new ConstantNode_1.default(2), new ConstantNode_1.default(4))],
            [6, new BinaryNode_1.default('^', new ConstantNode_1.default(2), new ConstantNode_1.default(4))],
            [true, new BinaryNode_1.default('<', new ConstantNode_1.default(1), new ConstantNode_1.default(2))],
            [true, new BinaryNode_1.default('<=', new ConstantNode_1.default(1), new ConstantNode_1.default(2))],
            [true, new BinaryNode_1.default('<=', new ConstantNode_1.default(1), new ConstantNode_1.default(1))],
            [false, new BinaryNode_1.default('>', new ConstantNode_1.default(1), new ConstantNode_1.default(2))],
            [false, new BinaryNode_1.default('>=', new ConstantNode_1.default(1), new ConstantNode_1.default(2))],
            [true, new BinaryNode_1.default('>=', new ConstantNode_1.default(1), new ConstantNode_1.default(1))],
            [true, new BinaryNode_1.default('===', new ConstantNode_1.default(true), new ConstantNode_1.default(true))],
            [false, new BinaryNode_1.default('!==', new ConstantNode_1.default(true), new ConstantNode_1.default(true))],
            [false, new BinaryNode_1.default('==', new ConstantNode_1.default(2), new ConstantNode_1.default(1))],
            [true, new BinaryNode_1.default('!=', new ConstantNode_1.default(2), new ConstantNode_1.default(1))],
            [-1, new BinaryNode_1.default('-', new ConstantNode_1.default(1), new ConstantNode_1.default(2))],
            [3, new BinaryNode_1.default('+', new ConstantNode_1.default(1), new ConstantNode_1.default(2))],
            [4, new BinaryNode_1.default('*', new ConstantNode_1.default(2), new ConstantNode_1.default(2))],
            [1, new BinaryNode_1.default('/', new ConstantNode_1.default(2), new ConstantNode_1.default(2))],
            [1, new BinaryNode_1.default('%', new ConstantNode_1.default(5), new ConstantNode_1.default(2))],
            [25, new BinaryNode_1.default('**', new ConstantNode_1.default(5), new ConstantNode_1.default(2))],
            ['ab', new BinaryNode_1.default('~', new ConstantNode_1.default('a'), new ConstantNode_1.default('b'))],
            [true, new BinaryNode_1.default('in', new ConstantNode_1.default('a'), arr)],
            [false, new BinaryNode_1.default('in', new ConstantNode_1.default('c'), arr)],
            [true, new BinaryNode_1.default('not in', new ConstantNode_1.default('c'), arr)],
            [false, new BinaryNode_1.default('not in', new ConstantNode_1.default('a'), arr)],
            [[1, 2, 3], new BinaryNode_1.default('..', new ConstantNode_1.default(1), new ConstantNode_1.default(3))],
            [true, new BinaryNode_1.default('matches', new ConstantNode_1.default('abc'), new ConstantNode_1.default('/^[a-z]+$/'))],
        ];
    }
    function getCompileData() {
        var arr = new ArrayNode_1.default();
        arr.addElement(new ConstantNode_1.default('a'));
        arr.addElement(new ConstantNode_1.default('b'));
        return [
            ['(true || false)', new BinaryNode_1.default('or', new ConstantNode_1.default(true), new ConstantNode_1.default(false))],
            ['(true || false)', new BinaryNode_1.default('||', new ConstantNode_1.default(true), new ConstantNode_1.default(false))],
            ['(true && false)', new BinaryNode_1.default('and', new ConstantNode_1.default(true), new ConstantNode_1.default(false))],
            ['(true && false)', new BinaryNode_1.default('&&', new ConstantNode_1.default(true), new ConstantNode_1.default(false))],
            ['(2 & 4)', new BinaryNode_1.default('&', new ConstantNode_1.default(2), new ConstantNode_1.default(4))],
            ['(2 | 4)', new BinaryNode_1.default('|', new ConstantNode_1.default(2), new ConstantNode_1.default(4))],
            ['(2 ^ 4)', new BinaryNode_1.default('^', new ConstantNode_1.default(2), new ConstantNode_1.default(4))],
            ['(1 < 2)', new BinaryNode_1.default('<', new ConstantNode_1.default(1), new ConstantNode_1.default(2))],
            ['(1 <= 2)', new BinaryNode_1.default('<=', new ConstantNode_1.default(1), new ConstantNode_1.default(2))],
            ['(1 <= 1)', new BinaryNode_1.default('<=', new ConstantNode_1.default(1), new ConstantNode_1.default(1))],
            ['(1 > 2)', new BinaryNode_1.default('>', new ConstantNode_1.default(1), new ConstantNode_1.default(2))],
            ['(1 >= 2)', new BinaryNode_1.default('>=', new ConstantNode_1.default(1), new ConstantNode_1.default(2))],
            ['(1 >= 1)', new BinaryNode_1.default('>=', new ConstantNode_1.default(1), new ConstantNode_1.default(1))],
            ['(true === true)', new BinaryNode_1.default('===', new ConstantNode_1.default(true), new ConstantNode_1.default(true))],
            ['(true !== true)', new BinaryNode_1.default('!==', new ConstantNode_1.default(true), new ConstantNode_1.default(true))],
            ['(2 == 1)', new BinaryNode_1.default('==', new ConstantNode_1.default(2), new ConstantNode_1.default(1))],
            ['(2 != 1)', new BinaryNode_1.default('!=', new ConstantNode_1.default(2), new ConstantNode_1.default(1))],
            ['(1 - 2)', new BinaryNode_1.default('-', new ConstantNode_1.default(1), new ConstantNode_1.default(2))],
            ['(1 + 2)', new BinaryNode_1.default('+', new ConstantNode_1.default(1), new ConstantNode_1.default(2))],
            ['(2 * 2)', new BinaryNode_1.default('*', new ConstantNode_1.default(2), new ConstantNode_1.default(2))],
            ['(2 / 2)', new BinaryNode_1.default('/', new ConstantNode_1.default(2), new ConstantNode_1.default(2))],
            ['(5 % 2)', new BinaryNode_1.default('%', new ConstantNode_1.default(5), new ConstantNode_1.default(2))],
            ['Math.pow(5, 2)', new BinaryNode_1.default('**', new ConstantNode_1.default(5), new ConstantNode_1.default(2))],
            ['("a" . "b")', new BinaryNode_1.default('~', new ConstantNode_1.default('a'), new ConstantNode_1.default('b'))],
            ['includes("a", ["a", "b"])', new BinaryNode_1.default('in', new ConstantNode_1.default('a'), arr)],
            ['includes("c", ["a", "b"])', new BinaryNode_1.default('in', new ConstantNode_1.default('c'), arr)],
            ['!includes("c", ["a", "b"])', new BinaryNode_1.default('not in', new ConstantNode_1.default('c'), arr)],
            ['!includes("a", ["a", "b"])', new BinaryNode_1.default('not in', new ConstantNode_1.default('a'), arr)],
            ['range(1, 3)', new BinaryNode_1.default('..', new ConstantNode_1.default(1), new ConstantNode_1.default(3))],
            ['/^[a-z]+\$/i.test("abc")', new BinaryNode_1.default('matches', new ConstantNode_1.default('abc'), new ConstantNode_1.default('/^[a-z]+$/i', true))],
        ];
    }
    function getDumpData() {
        var arr = new ArrayNode_1.default();
        arr.addElement(new ConstantNode_1.default('a'));
        arr.addElement(new ConstantNode_1.default('b'));
        return [
            ['(true or false)', new BinaryNode_1.default('or', new ConstantNode_1.default(true), new ConstantNode_1.default(false))],
            ['(true || false)', new BinaryNode_1.default('||', new ConstantNode_1.default(true), new ConstantNode_1.default(false))],
            ['(true and false)', new BinaryNode_1.default('and', new ConstantNode_1.default(true), new ConstantNode_1.default(false))],
            ['(true && false)', new BinaryNode_1.default('&&', new ConstantNode_1.default(true), new ConstantNode_1.default(false))],
            ['(2 & 4)', new BinaryNode_1.default('&', new ConstantNode_1.default(2), new ConstantNode_1.default(4))],
            ['(2 | 4)', new BinaryNode_1.default('|', new ConstantNode_1.default(2), new ConstantNode_1.default(4))],
            ['(2 ^ 4)', new BinaryNode_1.default('^', new ConstantNode_1.default(2), new ConstantNode_1.default(4))],
            ['(1 < 2)', new BinaryNode_1.default('<', new ConstantNode_1.default(1), new ConstantNode_1.default(2))],
            ['(1 <= 2)', new BinaryNode_1.default('<=', new ConstantNode_1.default(1), new ConstantNode_1.default(2))],
            ['(1 <= 1)', new BinaryNode_1.default('<=', new ConstantNode_1.default(1), new ConstantNode_1.default(1))],
            ['(1 > 2)', new BinaryNode_1.default('>', new ConstantNode_1.default(1), new ConstantNode_1.default(2))],
            ['(1 >= 2)', new BinaryNode_1.default('>=', new ConstantNode_1.default(1), new ConstantNode_1.default(2))],
            ['(1 >= 1)', new BinaryNode_1.default('>=', new ConstantNode_1.default(1), new ConstantNode_1.default(1))],
            ['(true === true)', new BinaryNode_1.default('===', new ConstantNode_1.default(true), new ConstantNode_1.default(true))],
            ['(true !== true)', new BinaryNode_1.default('!==', new ConstantNode_1.default(true), new ConstantNode_1.default(true))],
            ['(2 == 1)', new BinaryNode_1.default('==', new ConstantNode_1.default(2), new ConstantNode_1.default(1))],
            ['(2 != 1)', new BinaryNode_1.default('!=', new ConstantNode_1.default(2), new ConstantNode_1.default(1))],
            ['(1 - 2)', new BinaryNode_1.default('-', new ConstantNode_1.default(1), new ConstantNode_1.default(2))],
            ['(1 + 2)', new BinaryNode_1.default('+', new ConstantNode_1.default(1), new ConstantNode_1.default(2))],
            ['(2 * 2)', new BinaryNode_1.default('*', new ConstantNode_1.default(2), new ConstantNode_1.default(2))],
            ['(2 / 2)', new BinaryNode_1.default('/', new ConstantNode_1.default(2), new ConstantNode_1.default(2))],
            ['(5 % 2)', new BinaryNode_1.default('%', new ConstantNode_1.default(5), new ConstantNode_1.default(2))],
            ['(5 ** 2)', new BinaryNode_1.default('**', new ConstantNode_1.default(5), new ConstantNode_1.default(2))],
            ['("a" ~ "b")', new BinaryNode_1.default('~', new ConstantNode_1.default('a'), new ConstantNode_1.default('b'))],
            ['("a" in ["a", "b"])', new BinaryNode_1.default('in', new ConstantNode_1.default('a'), arr)],
            ['("c" in ["a", "b"])', new BinaryNode_1.default('in', new ConstantNode_1.default('c'), arr)],
            ['("c" not in ["a", "b"])', new BinaryNode_1.default('not in', new ConstantNode_1.default('c'), arr)],
            ['("a" not in ["a", "b"])', new BinaryNode_1.default('not in', new ConstantNode_1.default('a'), arr)],
            ['(1 .. 3)', new BinaryNode_1.default('..', new ConstantNode_1.default(1), new ConstantNode_1.default(3))],
            ['("abc" matches "/^[a-z]+/i$/")', new BinaryNode_1.default('matches', new ConstantNode_1.default('abc'), new ConstantNode_1.default('/^[a-z]+/i$/'))],
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
            var compiler = new Compiler_1.default({});
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
});
