define(["require", "exports", "../ArgumentsNode", "../ConstantNode", "../../Compiler"], function (require, exports, ArgumentsNode_1, ConstantNode_1, Compiler_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function getCompileData() {
        return [
            ['"a", "b"', getArrayNode()]
        ];
    }
    function getDumpData() {
        return [
            ['"a", "b"', getArrayNode()]
        ];
    }
    function getArrayNode() {
        var arr = createArrayNode();
        arr.addElement(new ConstantNode_1.default("a"));
        arr.addElement(new ConstantNode_1.default("b"));
        return arr;
    }
    function createArrayNode() {
        return new ArgumentsNode_1.default();
    }
    test('compile ArgumentsNode', function () {
        for (var _i = 0, _a = getCompileData(); _i < _a.length; _i++) {
            var compileParams = _a[_i];
            var expected = compileParams[0];
            var node = compileParams[1];
            var compiler = new Compiler_1.default({});
            node.compile(compiler);
            expect(compiler.getSource()).toBe(expected);
        }
    });
    test('dump ArgumentsNode', function () {
        for (var _i = 0, _a = getDumpData(); _i < _a.length; _i++) {
            var dumpParam = _a[_i];
            var expected = dumpParam[0];
            var node = dumpParam[1];
            expect(node.dump()).toBe(expected);
        }
    });
});
