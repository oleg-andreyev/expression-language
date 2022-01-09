import Node from "../Node";
import ConstantNode from "../ConstantNode";
test("toString", function () {
    var node = new Node({ 0: new ConstantNode('foo') });
    expect(node.toString()).toBe("Node(\n    ConstantNode(value: 'foo')\n)");
});
test("isHash false", function () {
    var node = new Node({});
    expect(node.isHash([1, 2, 3])).toBe(false);
});
test("isHash true", function () {
    var node = new Node({});
    expect(node.isHash({ 1: 'a', 2: 'b', 3: 'c' })).toBe(true);
    expect(node.isHash({ 'a': 'a', 'b': 'b', 'c': 'c' })).toBe(true);
});
