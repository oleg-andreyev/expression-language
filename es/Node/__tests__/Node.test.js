define(["require", "exports", "../Node", "../ConstantNode"], function (require, exports, Node_1, ConstantNode_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    test("toString", function () {
        var node = new Node_1.default({ 0: new ConstantNode_1.default('foo') });
        expect(node.toString()).toBe("Node(\n    ConstantNode(value: 'foo')\n)");
    });
    test("isHash false", function () {
        var node = new Node_1.default({});
        expect(node.isHash([1, 2, 3])).toBe(false);
    });
    test("isHash true", function () {
        var node = new Node_1.default({});
        expect(node.isHash({ 1: 'a', 2: 'b', 3: 'c' })).toBe(true);
        expect(node.isHash({ 'a': 'a', 'b': 'b', 'c': 'c' })).toBe(true);
    });
});