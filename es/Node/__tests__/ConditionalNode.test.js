(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../ConditionalNode", "../ConstantNode", "../../Compiler"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ConditionalNode_1 = require("../ConditionalNode");
    var ConstantNode_1 = require("../ConstantNode");
    var Compiler_1 = require("../../Compiler");
    function getEvaluateData() {
        return [
            [1, new ConditionalNode_1.default(new ConstantNode_1.default(true), new ConstantNode_1.default(1), new ConstantNode_1.default(2))],
            [2, new ConditionalNode_1.default(new ConstantNode_1.default(false), new ConstantNode_1.default(1), new ConstantNode_1.default(2))],
        ];
    }
    function getCompileData() {
        return [
            ['((true) ? (1) : (2))', new ConditionalNode_1.default(new ConstantNode_1.default(true), new ConstantNode_1.default(1), new ConstantNode_1.default(2))],
            ['((false) ? (1) : (2))', new ConditionalNode_1.default(new ConstantNode_1.default(false), new ConstantNode_1.default(1), new ConstantNode_1.default(2))],
        ];
    }
    function getDumpData() {
        return [
            ['(true ? 1 : 2)', new ConditionalNode_1.default(new ConstantNode_1.default(true), new ConstantNode_1.default(1), new ConstantNode_1.default(2))],
            ['(false ? 1 : 2)', new ConditionalNode_1.default(new ConstantNode_1.default(false), new ConstantNode_1.default(1), new ConstantNode_1.default(2))],
        ];
    }
    test('evaluate ConditionalNode', function () {
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
    test('compile ConditionalNode', function () {
        for (var _i = 0, _a = getCompileData(); _i < _a.length; _i++) {
            var compileParams = _a[_i];
            var expected = compileParams[0];
            var node = compileParams[1];
            var compiler = new Compiler_1.default({});
            node.compile(compiler);
            expect(compiler.getSource()).toBe(expected);
        }
    });
    test('dump ConditionalNode', function () {
        for (var _i = 0, _a = getDumpData(); _i < _a.length; _i++) {
            var dumpParams = _a[_i];
            var expected = dumpParams[0];
            var node = dumpParams[1];
            expect(node.dump()).toBe(expected);
        }
    });
});
