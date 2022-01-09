define(["require", "exports", "../ConstantNode", "../../Compiler"], function (require, exports, ConstantNode_1, Compiler_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function getEvaluateData() {
        return [
            [false, new ConstantNode_1.default(false)],
            [true, new ConstantNode_1.default(true)],
            [null, new ConstantNode_1.default(null)],
            [3, new ConstantNode_1.default(3)],
            [3.3, new ConstantNode_1.default(3.3)],
            ['foo', new ConstantNode_1.default('foo')],
            [{ one: 1, b: 'a' }, new ConstantNode_1.default({ one: 1, b: 'a' })]
        ];
    }
    function getCompileData() {
        return [
            ['false', new ConstantNode_1.default(false)],
            ['true', new ConstantNode_1.default(true)],
            ['null', new ConstantNode_1.default(null)],
            ['3', new ConstantNode_1.default(3)],
            ['3.3', new ConstantNode_1.default(3.3)],
            ['"foo"', new ConstantNode_1.default('foo')],
            ['{\"one\":1, \"b\":"a"}', new ConstantNode_1.default({ one: 1, b: 'a' })]
        ];
    }
    function getDumpData() {
        return [
            ['false', new ConstantNode_1.default(false)],
            ['true', new ConstantNode_1.default(true)],
            ['null', new ConstantNode_1.default(null)],
            ['3', new ConstantNode_1.default(3)],
            ['3.3', new ConstantNode_1.default(3.3)],
            ['"foo"', new ConstantNode_1.default('foo')],
            ['foo', new ConstantNode_1.default('foo', true)],
            ['{"one": 1}', new ConstantNode_1.default({ one: 1 })],
            ['{\"one\": 1, "c": true, \"b\": "a"}', new ConstantNode_1.default({ one: 1, c: true, b: 'a' })],
            ['["c","d"]', new ConstantNode_1.default(["c", "d"])],
            ['{"a": ["b"]}', new ConstantNode_1.default({ a: ["b"] })]
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
            var compiler = new Compiler_1.default({});
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
});
