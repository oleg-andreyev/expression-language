import ConstantNode from "../ConstantNode";
import UnaryNode from "../UnaryNode";
import Compiler from "../../Compiler";
import Node from "../Node";

function getEvaluateData()
{
    return [
        [-1, new UnaryNode('-', new ConstantNode(1))],
        [3, new UnaryNode('+', new ConstantNode(3))],
        [false, new UnaryNode('!', new ConstantNode(true))],
        [false, new UnaryNode('not', new ConstantNode(true))],
    ];
}
function getCompileData()
{
    return [
        ['(-1)', new UnaryNode('-', new ConstantNode(1))],
        ['(+3)', new UnaryNode('+', new ConstantNode(3))],
        ['(!true)', new UnaryNode('!', new ConstantNode(true))],
        ['(!true)', new UnaryNode('not', new ConstantNode(true))],
    ];
}
function getDumpData()
{
    return [
        ['(- 1)', new UnaryNode('-', new ConstantNode(1))],
        ['(+ 3)', new UnaryNode('+', new ConstantNode(3))],
        ['(! true)', new UnaryNode('!', new ConstantNode(true))],
        ['(not true)', new UnaryNode('not', new ConstantNode(true))],
    ];
}
test('evaluate UnaryNode', () => {
    for (const evaluateParams of getEvaluateData()) {
        const expected = evaluateParams[0];
        const node = evaluateParams[1] as Node;
        const args = evaluateParams[2] as Node;
        
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

test('compile UnaryNode', () => {
    for (const compileParams of getCompileData()) {
        const expected = compileParams[0];
        const node = compileParams[1] as Node;

        const compiler = new Compiler({});
        node.compile(compiler);
        expect(compiler.getSource()).toBe(expected);
    }
});

test('dump UnaryNode', () => {
    for (const dumpParams of getDumpData()) {
        const expected = dumpParams[0];
        const node = dumpParams[1] as Node;

        expect(node.dump()).toBe(expected);
    }
});