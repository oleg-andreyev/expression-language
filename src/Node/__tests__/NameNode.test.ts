import NameNode from "../NameNode";
import Compiler from "../../Compiler";
import Node from "../Node";

function getEvaluateData() {
    return [
        ['bar', new NameNode('foo'), {foo: 'bar'}],
    ];
}
function getCompileData()
{
    return [
        ['foo', new NameNode('foo')],
    ];
}
function getDumpData()
{
    return [
        ['foo', new NameNode('foo')],
    ];
}

test('evaluate NameNode', () => {
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

test('compile NameNode', () => {
    for (const compileParams of getCompileData()) {
        const expected = compileParams[0];
        const node = compileParams[1] as Node;

        const compiler = new Compiler({});
        node.compile(compiler);
        expect(compiler.getSource()).toBe(expected);
    }
});

test('dump NameNode', () => {
    for (const dumpParams of getDumpData()) {
        const expected = dumpParams[0];
        const node = dumpParams[1] as Node;

        expect(node.dump()).toBe(expected);
    }
});