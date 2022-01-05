import ConstantNode from "../ConstantNode";
import FunctionNode from "../FunctionNode";
import Node from "../Node";
import Compiler from "../../Compiler";

function getEvaluateData() {
    return [
        ['bar', new FunctionNode('foo', new Node([new ConstantNode('bar')] as Record<number, Node>)), [], {foo: getCallables()}]
    ];
}

function getCompileData() {
    return [
        ['foo("bar")', new FunctionNode('foo', new Node([new ConstantNode('bar')] as Record<number, Node>)), {foo: getCallables()}],
    ];
}

function getDumpData() {
    return [
        ['foo("bar")', new FunctionNode('foo', new Node([new ConstantNode('bar')] as Record<number, Node>)), {foo: getCallables()}],
    ];
}

function getCallables() {
    return {
        'compiler': (arg) => {
            return `foo(${arg})`;
        },
        'evaluator': (variables, arg) => {
            return arg;
        }
    };
}

test('evaluate FunctionNode', () => {
    for (const evaluateParams of getEvaluateData()) {
        const expected = evaluateParams[0];
        const node = evaluateParams[1] as Node;
        const args = evaluateParams[2];

        //console.log("Evaluating: ", evaluateParams);
        const evaluated = node.evaluate(evaluateParams[3], args);
        //console.log("Evaluated: ", evaluated);
        if (expected !== null && typeof expected === "object") {
            expect(evaluated).toMatchObject(expected);
        } else {
            expect(evaluated).toBe(expected);
        }
    }
});

test('compile FunctionNode', () => {
    for (const compileParams of getCompileData()) {
        const expected = compileParams[0];
        const node = compileParams[1] as Node;
        const functions = compileParams[2];

        const compiler = new Compiler(functions);
        node.compile(compiler);
        expect(compiler.getSource()).toBe(expected);
    }
});

test('dump FunctionNode', () => {
    for (const dumpParams of getDumpData()) {
        const expected = dumpParams[0];
        const node = dumpParams[1] as Node;

        expect(node.dump()).toBe(expected);
    }
});