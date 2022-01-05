"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConstantNode_1 = require("../ConstantNode");
var UnaryNode_1 = require("../UnaryNode");
var Compiler_1 = require("../../Compiler");
function getEvaluateData() {
    return [
        [-1, new UnaryNode_1.default('-', new ConstantNode_1.default(1))],
        [3, new UnaryNode_1.default('+', new ConstantNode_1.default(3))],
        [false, new UnaryNode_1.default('!', new ConstantNode_1.default(true))],
        [false, new UnaryNode_1.default('not', new ConstantNode_1.default(true))],
    ];
}
function getCompileData() {
    return [
        ['(-1)', new UnaryNode_1.default('-', new ConstantNode_1.default(1))],
        ['(+3)', new UnaryNode_1.default('+', new ConstantNode_1.default(3))],
        ['(!true)', new UnaryNode_1.default('!', new ConstantNode_1.default(true))],
        ['(!true)', new UnaryNode_1.default('not', new ConstantNode_1.default(true))],
    ];
}
function getDumpData() {
    return [
        ['(- 1)', new UnaryNode_1.default('-', new ConstantNode_1.default(1))],
        ['(+ 3)', new UnaryNode_1.default('+', new ConstantNode_1.default(3))],
        ['(! true)', new UnaryNode_1.default('!', new ConstantNode_1.default(true))],
        ['(not true)', new UnaryNode_1.default('not', new ConstantNode_1.default(true))],
    ];
}
test('evaluate UnaryNode', function () {
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
test('compile UnaryNode', function () {
    for (var _i = 0, _a = getCompileData(); _i < _a.length; _i++) {
        var compileParams = _a[_i];
        var expected = compileParams[0];
        var node = compileParams[1];
        var compiler = new Compiler_1.default({});
        node.compile(compiler);
        expect(compiler.getSource()).toBe(expected);
    }
});
test('dump UnaryNode', function () {
    for (var _i = 0, _a = getDumpData(); _i < _a.length; _i++) {
        var dumpParams = _a[_i];
        var expected = dumpParams[0];
        var node = dumpParams[1];
        expect(node.dump()).toBe(expected);
    }
});
