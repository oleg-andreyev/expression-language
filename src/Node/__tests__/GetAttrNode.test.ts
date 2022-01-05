import GetAttrNode from "../GetAttrNode";
import ArrayNode from "../ArrayNode";
import ConstantNode from "../ConstantNode";
import NameNode from "../NameNode";
import Compiler from "../../Compiler";
import Node from "../Node";

function getArrayNode() {
    const arr = new ArrayNode();
    arr.addElement(new ConstantNode('a'), new ConstantNode('b'));
    arr.addElement(new ConstantNode('b'));

    return arr;
}

class Obj {
    foo = 'bar';
    fooFn() {
        return 'baz';
    }
}

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

        ['bar', new GetAttrNode(new NameNode('foo'), new ConstantNode('foo'), getArrayNode(), GetAttrNode.PROPERTY_CALL), {foo: new Obj()}],

        ['baz', new GetAttrNode(new NameNode('foo'), new ConstantNode('fooFn'), getArrayNode(), GetAttrNode.METHOD_CALL), {foo: new Obj()}],
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

        ['foo.foo', new GetAttrNode(new NameNode('foo'), new ConstantNode('foo'), getArrayNode(), GetAttrNode.PROPERTY_CALL), {foo: new Obj()}],

        ['foo.fooFn({"b": "a", 0: "b"})', new GetAttrNode(new NameNode('foo'), new ConstantNode('fooFn'), getArrayNode(), GetAttrNode.METHOD_CALL), {foo: new Obj()}
        ],
        ['foo[index]', new GetAttrNode(new NameNode('foo'), new NameNode('index'), getArrayNode(), GetAttrNode.ARRAY_CALL)],
    ];
}

function getDumpData() {
    return [
        ['foo[0]', new GetAttrNode(new NameNode('foo'), new ConstantNode(0), getArrayNode(), GetAttrNode.ARRAY_CALL)],
        ['foo["b"]', new GetAttrNode(new NameNode('foo'), new ConstantNode('b'), getArrayNode(), GetAttrNode.ARRAY_CALL)],

        ['foo.foo', new GetAttrNode(new NameNode('foo'), new NameNode('foo'), getArrayNode(), GetAttrNode.PROPERTY_CALL), {foo: new Obj()}],

        ['foo.fooFn({"0": "b", "b": "a"})', new GetAttrNode(new NameNode('foo'), new NameNode('fooFn'), getArrayNode(), GetAttrNode.METHOD_CALL), {foo: new Obj()}
        ],
        ['foo[index]', new GetAttrNode(new NameNode('foo'), new NameNode('index'), getArrayNode(), GetAttrNode.ARRAY_CALL)],
    ];
}

test('evaluate GetAttrNode', () => {
    for (const evaluateParams of getEvaluateData()) {
        const expected = evaluateParams[0];
        const node = evaluateParams[1] as Node;
        const args = evaluateParams[2];

        //console.log("Evaluating: ", evaluateParams);
        const evaluated = node.evaluate(evaluateParams[3]||{}, args);
        //console.log("Evaluated: ", evaluated);
        if (expected !== null && typeof expected === "object") {
            expect(evaluated).toMatchObject(expected);
        }
        else {
            expect(evaluated).toBe(expected);
        }
    }
});

test('compile GetAttrNode', () => {
    for (const compileParams of getCompileData()) {
        const expected = compileParams[0];
        const node = compileParams[1] as Node;

        const compiler = new Compiler({});
        node.compile(compiler);
        expect(compiler.getSource()).toBe(expected);
    }
});

test('dump GetAttrNode', () => {
    for (const dumpParams of getDumpData()) {
        const expected = dumpParams[0];
        const node = dumpParams[1] as Node;

        expect(node.dump()).toBe(expected);
    }
});