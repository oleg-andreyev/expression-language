define(["require", "exports", "../ConstantNode", "../FunctionNode", "../Node", "../../Compiler"], function (require, exports, ConstantNode_1, FunctionNode_1, Node_1, Compiler_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function getEvaluateData() {
        return [
            ['bar', new FunctionNode_1.default('foo', new Node_1.default([new ConstantNode_1.default('bar')])), [], { foo: getCallables() }]
        ];
    }
    function getCompileData() {
        return [
            ['foo("bar")', new FunctionNode_1.default('foo', new Node_1.default([new ConstantNode_1.default('bar')])), { foo: getCallables() }],
        ];
    }
    function getDumpData() {
        return [
            ['foo("bar")', new FunctionNode_1.default('foo', new Node_1.default([new ConstantNode_1.default('bar')])), { foo: getCallables() }],
        ];
    }
    function getCallables() {
        return {
            'compiler': function (arg) {
                return "foo(".concat(arg, ")");
            },
            'evaluator': function (variables, arg) {
                return arg;
            }
        };
    }
    test('evaluate FunctionNode', function () {
        for (var _i = 0, _a = getEvaluateData(); _i < _a.length; _i++) {
            var evaluateParams = _a[_i];
            var expected = evaluateParams[0];
            var node = evaluateParams[1];
            var args = evaluateParams[2];
            //console.log("Evaluating: ", evaluateParams);
            var evaluated = node.evaluate(evaluateParams[3], args);
            //console.log("Evaluated: ", evaluated);
            if (expected !== null && typeof expected === "object") {
                expect(evaluated).toMatchObject(expected);
            }
            else {
                expect(evaluated).toBe(expected);
            }
        }
    });
    test('compile FunctionNode', function () {
        for (var _i = 0, _a = getCompileData(); _i < _a.length; _i++) {
            var compileParams = _a[_i];
            var expected = compileParams[0];
            var node = compileParams[1];
            var functions = compileParams[2];
            var compiler = new Compiler_1.default(functions);
            node.compile(compiler);
            expect(compiler.getSource()).toBe(expected);
        }
    });
    test('dump FunctionNode', function () {
        for (var _i = 0, _a = getDumpData(); _i < _a.length; _i++) {
            var dumpParams = _a[_i];
            var expected = dumpParams[0];
            var node = dumpParams[1];
            expect(node.dump()).toBe(expected);
        }
    });
});
