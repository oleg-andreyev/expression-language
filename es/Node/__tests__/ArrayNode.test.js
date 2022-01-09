(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../ArrayNode", "../ConstantNode", "../../Compiler"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ArrayNode_1 = require("../ArrayNode");
    var ConstantNode_1 = require("../ConstantNode");
    var Compiler_1 = require("../../Compiler");
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
        arrOne.addElement(new ConstantNode_1.default("c"), new ConstantNode_1.default('a"b'));
        arrOne.addElement(new ConstantNode_1.default("d"), new ConstantNode_1.default('a\\b'));
        var arrTwo = createArrayNode();
        arrTwo.addElement(new ConstantNode_1.default('c'));
        arrTwo.addElement(new ConstantNode_1.default('d'));
        return [
            ['{"0": "b", "b": "a"}', getArrayNode()],
            ['{"a\\"b": "c", "a\\\\b": "d"}', arrOne],
            ['["c", "d"]', arrTwo]
        ];
    }
    function getArrayNode() {
        var arr = createArrayNode();
        arr.addElement(new ConstantNode_1.default("a"), new ConstantNode_1.default("b"));
        arr.addElement(new ConstantNode_1.default("b"), new ConstantNode_1.default("0"));
        return arr;
    }
    function createArrayNode() {
        return new ArrayNode_1.default();
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
            var compiler = new Compiler_1.default({});
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
});
