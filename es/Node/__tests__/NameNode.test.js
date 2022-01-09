define(["require", "exports", "../NameNode", "../../Compiler"], function (require, exports, NameNode_1, Compiler_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function getEvaluateData() {
        return [
            ['bar', new NameNode_1.default('foo'), { foo: 'bar' }],
        ];
    }
    function getCompileData() {
        return [
            ['foo', new NameNode_1.default('foo')],
        ];
    }
    function getDumpData() {
        return [
            ['foo', new NameNode_1.default('foo')],
        ];
    }
    test('evaluate NameNode', function () {
        for (var _i = 0, _a = getEvaluateData(); _i < _a.length; _i++) {
            var evaluateParams = _a[_i];
            var expected = evaluateParams[0];
            var node = evaluateParams[1];
            var args = evaluateParams[2];
            //console.log("Evaluating: ", evaluateParams);
            var evaluated = node.evaluate(evaluateParams[3] || {}, args);
            //console.log("Evaluated: ", evaluated);
            if (expected !== null && typeof expected === "object") {
                expect(evaluated).toMatchObject(expected);
            }
            else {
                expect(evaluated).toBe(expected);
            }
        }
    });
    test('compile NameNode', function () {
        for (var _i = 0, _a = getCompileData(); _i < _a.length; _i++) {
            var compileParams = _a[_i];
            var expected = compileParams[0];
            var node = compileParams[1];
            var compiler = new Compiler_1.default({});
            node.compile(compiler);
            expect(compiler.getSource()).toBe(expected);
        }
    });
    test('dump NameNode', function () {
        for (var _i = 0, _a = getDumpData(); _i < _a.length; _i++) {
            var dumpParams = _a[_i];
            var expected = dumpParams[0];
            var node = dumpParams[1];
            expect(node.dump()).toBe(expected);
        }
    });
});
