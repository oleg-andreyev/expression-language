"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GetAttrNode_1 = require("../GetAttrNode");
var ArrayNode_1 = require("../ArrayNode");
var ConstantNode_1 = require("../ConstantNode");
var NameNode_1 = require("../NameNode");
var Compiler_1 = require("../../Compiler");
function getArrayNode() {
    var arr = new ArrayNode_1.default();
    arr.addElement(new ConstantNode_1.default('a'), new ConstantNode_1.default('b'));
    arr.addElement(new ConstantNode_1.default('b'));
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
        ['b', new GetAttrNode_1.default(new NameNode_1.default('foo'), new ConstantNode_1.default('0'), getArrayNode(), GetAttrNode_1.default.ARRAY_CALL), {
                foo: {
                    b: 'a',
                    '0': 'b'
                }
            }],
        ['a', new GetAttrNode_1.default(new NameNode_1.default('foo'), new ConstantNode_1.default('b'), getArrayNode(), GetAttrNode_1.default.ARRAY_CALL), {
                foo: {
                    b: 'a',
                    '0': 'b'
                }
            }],
        ['bar', new GetAttrNode_1.default(new NameNode_1.default('foo'), new ConstantNode_1.default('foo'), getArrayNode(), GetAttrNode_1.default.PROPERTY_CALL), { foo: new Obj() }],
        ['baz', new GetAttrNode_1.default(new NameNode_1.default('foo'), new ConstantNode_1.default('fooFn'), getArrayNode(), GetAttrNode_1.default.METHOD_CALL), { foo: new Obj() }],
        ['a', new GetAttrNode_1.default(new NameNode_1.default('foo'), new NameNode_1.default('index'), getArrayNode(), GetAttrNode_1.default.ARRAY_CALL), {
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
        ['foo[0]', new GetAttrNode_1.default(new NameNode_1.default('foo'), new ConstantNode_1.default(0), getArrayNode(), GetAttrNode_1.default.ARRAY_CALL)],
        ['foo["b"]', new GetAttrNode_1.default(new NameNode_1.default('foo'), new ConstantNode_1.default('b'), getArrayNode(), GetAttrNode_1.default.ARRAY_CALL)],
        ['foo.foo', new GetAttrNode_1.default(new NameNode_1.default('foo'), new ConstantNode_1.default('foo'), getArrayNode(), GetAttrNode_1.default.PROPERTY_CALL), { foo: new Obj() }],
        ['foo.fooFn({"b": "a", 0: "b"})', new GetAttrNode_1.default(new NameNode_1.default('foo'), new ConstantNode_1.default('fooFn'), getArrayNode(), GetAttrNode_1.default.METHOD_CALL), { foo: new Obj() }
        ],
        ['foo[index]', new GetAttrNode_1.default(new NameNode_1.default('foo'), new NameNode_1.default('index'), getArrayNode(), GetAttrNode_1.default.ARRAY_CALL)],
    ];
}
function getDumpData() {
    return [
        ['foo[0]', new GetAttrNode_1.default(new NameNode_1.default('foo'), new ConstantNode_1.default(0), getArrayNode(), GetAttrNode_1.default.ARRAY_CALL)],
        ['foo["b"]', new GetAttrNode_1.default(new NameNode_1.default('foo'), new ConstantNode_1.default('b'), getArrayNode(), GetAttrNode_1.default.ARRAY_CALL)],
        ['foo.foo', new GetAttrNode_1.default(new NameNode_1.default('foo'), new NameNode_1.default('foo'), getArrayNode(), GetAttrNode_1.default.PROPERTY_CALL), { foo: new Obj() }],
        ['foo.fooFn({"0": "b", "b": "a"})', new GetAttrNode_1.default(new NameNode_1.default('foo'), new NameNode_1.default('fooFn'), getArrayNode(), GetAttrNode_1.default.METHOD_CALL), { foo: new Obj() }
        ],
        ['foo[index]', new GetAttrNode_1.default(new NameNode_1.default('foo'), new NameNode_1.default('index'), getArrayNode(), GetAttrNode_1.default.ARRAY_CALL)],
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
        var compiler = new Compiler_1.default({});
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
