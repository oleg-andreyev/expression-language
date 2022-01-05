import ConditionalNode from "../ConditionalNode";
import ConstantNode from "../ConstantNode";
import Compiler from "../../Compiler";
import Node from "../Node";

function getEvaluateData()
{
    return [
        [1, new ConditionalNode(new ConstantNode(true), new ConstantNode(1), new ConstantNode(2))],
        [2, new ConditionalNode(new ConstantNode(false), new ConstantNode(1), new ConstantNode(2))],
    ];
}

function getCompileData()
{
    return [
        ['((true) ? (1) : (2))', new ConditionalNode(new ConstantNode(true), new ConstantNode(1), new ConstantNode(2))],
        ['((false) ? (1) : (2))', new ConditionalNode(new ConstantNode(false), new ConstantNode(1), new ConstantNode(2))],
    ];
}

function getDumpData()
{
    return [
        ['(true ? 1 : 2)', new ConditionalNode(new ConstantNode(true), new ConstantNode(1), new ConstantNode(2))],
        ['(false ? 1 : 2)', new ConditionalNode(new ConstantNode(false), new ConstantNode(1), new ConstantNode(2))],
    ];
}

test('evaluate ConditionalNode', () => {
    for (const evaluateParams of getEvaluateData()) {
        const expected = evaluateParams[0];
        const node = evaluateParams[1] as Node;

        //console.log("Evaluating: ", evaluateParams);
        const evaluated = node.evaluate({}, {});
        //console.log("Evaluated: ", evaluated);
        if (expected !== null && typeof expected === "object") {
            expect(evaluated).toMatchObject(expected);
        }
        else {
            expect(evaluated).toBe(expected);
        }
    }
});

test('compile ConditionalNode', () => {
    for (const compileParams of getCompileData()) {
        const expected = compileParams[0];
        const node = compileParams[1] as Node;

        const compiler = new Compiler({});
        node.compile(compiler);
        expect(compiler.getSource()).toBe(expected);
    }
});

test('dump ConditionalNode', () => {
    for (const dumpParams of getDumpData()) {
        const expected = dumpParams[0];
        const node = dumpParams[1] as Node;

        expect(node.dump()).toBe(expected);
    }
});