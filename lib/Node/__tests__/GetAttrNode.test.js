import GetAttrNode from "../GetAttrNode";
import ArrayNode from "../ArrayNode";
import ConstantNode from "../ConstantNode";
import NameNode from "../NameNode";
import Compiler from "../../Compiler";
function getArrayNode() {
    var arr = new ArrayNode();
    arr.addElement(new ConstantNode('a'), new ConstantNode('b'));
    arr.addElement(new ConstantNode('b'));
    return arr;
}
var Obj = /** @class */ (function () {
    function Obj() {
        this.foo = 'bar';
    }
    Obj.prototype.fooFn = function () {
        return 'baz';
    };
    return Obj;
}());
function getEvaluateData() {
    return [
        ['b', new GetAttrNode(new NameNode('foo'), new ConstantNode('0'), getArrayNode(), GetAttrNode.ARRAY_CALL), {
                foo: {
                    b: 'a',
                    '0': 'b'
                }
            }],
        ['a', new GetAttrNode(new NameNode('foo'), new ConstantNode('b'), getArrayNode(), GetAttrNode.ARRAY_CALL), {
                foo: {
                    b: 'a',
                    '0': 'b'
                }
            }],
        ['bar', new GetAttrNode(new NameNode('foo'), new ConstantNode('foo'), getArrayNode(), GetAttrNode.PROPERTY_CALL), { foo: new Obj() }],
        ['baz', new GetAttrNode(new NameNode('foo'), new ConstantNode('fooFn'), getArrayNode(), GetAttrNode.METHOD_CALL), { foo: new Obj() }],
        ['a', new GetAttrNode(new NameNode('foo'), new NameNode('index'), getArrayNode(), GetAttrNode.ARRAY_CALL), {
                foo: {
                    b: 'a',
                    '0': 'b'
                },
                index: 'b'
            }],
    ];
}
function getCompileData() {
    return [
        ['foo[0]', new GetAttrNode(new NameNode('foo'), new ConstantNode(0), getArrayNode(), GetAttrNode.ARRAY_CALL)],
        ['foo["b"]', new GetAttrNode(new NameNode('foo'), new ConstantNode('b'), getArrayNode(), GetAttrNode.ARRAY_CALL)],
        ['foo.foo', new GetAttrNode(new NameNode('foo'), new ConstantNode('foo'), getArrayNode(), GetAttrNode.PROPERTY_CALL), { foo: new Obj() }],
        ['foo.fooFn({"b": "a", 0: "b"})', new GetAttrNode(new NameNode('foo'), new ConstantNode('fooFn'), getArrayNode(), GetAttrNode.METHOD_CALL), { foo: new Obj() }
        ],
        ['foo[index]', new GetAttrNode(new NameNode('foo'), new NameNode('index'), getArrayNode(), GetAttrNode.ARRAY_CALL)],
    ];
}
function getDumpData() {
    return [
        ['foo[0]', new GetAttrNode(new NameNode('foo'), new ConstantNode(0), getArrayNode(), GetAttrNode.ARRAY_CALL)],
        ['foo["b"]', new GetAttrNode(new NameNode('foo'), new ConstantNode('b'), getArrayNode(), GetAttrNode.ARRAY_CALL)],
        ['foo.foo', new GetAttrNode(new NameNode('foo'), new NameNode('foo'), getArrayNode(), GetAttrNode.PROPERTY_CALL), { foo: new Obj() }],
        ['foo.fooFn({"0": "b", "b": "a"})', new GetAttrNode(new NameNode('foo'), new NameNode('fooFn'), getArrayNode(), GetAttrNode.METHOD_CALL), { foo: new Obj() }
        ],
        ['foo[index]', new GetAttrNode(new NameNode('foo'), new NameNode('index'), getArrayNode(), GetAttrNode.ARRAY_CALL)],
    ];
}
test('evaluate GetAttrNode', function () {
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
test('compile GetAttrNode', function () {
    for (var _i = 0, _a = getCompileData(); _i < _a.length; _i++) {
        var compileParams = _a[_i];
        var expected = compileParams[0];
        var node = compileParams[1];
        var compiler = new Compiler({});
        node.compile(compiler);
        expect(compiler.getSource()).toBe(expected);
    }
});
test('dump GetAttrNode', function () {
    for (var _i = 0, _a = getDumpData(); _i < _a.length; _i++) {
        var dumpParams = _a[_i];
        var expected = dumpParams[0];
        var node = dumpParams[1];
        expect(node.dump()).toBe(expected);
    }
});
