import { tokenize } from "../Lexer";
import Parser from "../Parser";
import ArgumentsNode from "../Node/ArgumentsNode";
import ConstantNode from "../Node/ConstantNode";
import NameNode from "../Node/NameNode";
import UnaryNode from "../Node/UnaryNode";
import BinaryNode from "../Node/BinaryNode";
import GetAttrNode from "../Node/GetAttrNode";
import ConditionalNode from "../Node/ConditionalNode";
import ArrayNode from "../Node/ArrayNode";
function getParseData() {
    var args = new ArgumentsNode();
    args.addElement(new ConstantNode('arg1'));
    args.addElement(new ConstantNode(2));
    args.addElement(new ConstantNode(true));
    var arrayNode = new ArrayNode();
    arrayNode.addElement(new NameNode('bar'));
    return [
        [new NameNode('a'), 'a', ['a']],
        [new ConstantNode('a'), '"a"'],
        [new ConstantNode(3), '3'],
        [new ConstantNode(false), 'false'],
        [new ConstantNode(true), 'true'],
        [new ConstantNode(null), 'null'],
        [new UnaryNode('-', new ConstantNode(3)), '-3'],
        [new BinaryNode('-', new ConstantNode(3), new ConstantNode(3)), '3 - 3'],
        [new BinaryNode('*', new BinaryNode('-', new ConstantNode(3), new ConstantNode(3)), new ConstantNode(2)),
            '(3 - 3) * 2'
        ],
        [
            new GetAttrNode(new NameNode('foo'), new ConstantNode('bar', true), new ArgumentsNode(), GetAttrNode.PROPERTY_CALL),
            'foo.bar',
            ['foo']
        ],
        [
            new GetAttrNode(new NameNode('foo'), new ConstantNode('bar', true), new ArgumentsNode(), GetAttrNode.METHOD_CALL),
            'foo.bar()',
            ['foo']
        ],
        [
            new GetAttrNode(new NameNode('foo'), new ConstantNode('not', true), new ArgumentsNode(), GetAttrNode.METHOD_CALL),
            'foo.not()',
            ['foo']
        ],
        [
            new GetAttrNode(new NameNode('foo'), new ConstantNode('bar', true), args, GetAttrNode.METHOD_CALL),
            'foo.bar("arg1", 2, true)',
            ['foo']
        ],
        [
            new GetAttrNode(new NameNode('foo'), new ConstantNode(3), new ArgumentsNode(), GetAttrNode.ARRAY_CALL),
            'foo[3]',
            ['foo']
        ],
        [
            new ConditionalNode(new ConstantNode(true), new ConstantNode(true), new ConstantNode(false)),
            'true ? true ? false'
        ],
        [
            new BinaryNode('matches', new ConstantNode('foo'), new ConstantNode('/foo/')),
            '"foo" matches "/foo/"'
        ],
        // chained calls
        [
            createGetAttrNode(createGetAttrNode(createGetAttrNode(createGetAttrNode(new NameNode('foo'), 'bar', GetAttrNode.METHOD_CALL), 'foo', GetAttrNode.METHOD_CALL), 'baz', GetAttrNode.PROPERTY_CALL), '3', GetAttrNode.ARRAY_CALL),
            'foo.bar().foo().baz[3]',
            ['foo']
        ],
        [
            new NameNode('foo'),
            'bar',
            [{ foo: 'bar' }]
        ],
        // Operators collisions
        [
            new BinaryNode('in', new GetAttrNode(new NameNode('foo'), new ConstantNode('not', true), new ArgumentsNode(), GetAttrNode.PROPERTY_CALL), arrayNode),
            'foo.not in [bar]',
            ['foo', 'bar'],
        ],
        [
            new BinaryNode('or', new UnaryNode('not', new NameNode('foo')), new GetAttrNode(new NameNode('foo'), new ConstantNode('not', true), new ArgumentsNode(), GetAttrNode.PROPERTY_CALL)),
            'not foo or foo.not',
            ['foo'],
        ],
        [
            new BinaryNode('..', new ConstantNode(0), new ConstantNode(3)),
            '0..3',
        ],
    ];
}
function createGetAttrNode(node, item, type) {
    return new GetAttrNode(node, new ConstantNode(item, GetAttrNode.ARRAY_CALL !== type), new ArgumentsNode(), type);
}
function getInvalidPostfixData() {
    return [
        ['foo."#"', ['foo']],
        ['foo."bar"', ['foo']],
        ['foo.**', ['foo']],
        ['foo.123', ['foo']]
    ];
}
test("parse with invalid name", function () {
    try {
        var parser = new Parser();
        parser.parse(tokenize("foo"));
        console.log("The parser should throw an error.");
        expect(true).toBe(false); // This should fail
    }
    catch (err) {
        expect(err.toString()).toContain('Variable "foo" is not valid around position 1');
    }
});
test("parse with zero in names", function () {
    try {
        var parser = new Parser();
        parser.parse(tokenize("foo"), [0]);
        console.log("The parser should throw an error.");
        expect(true).toBe(false); // This should fail
    }
    catch (err) {
        expect(err.toString()).toContain('Variable "foo" is not valid around position 1');
    }
});
test('parse with invalid postfix data', function () {
    var invalidPostfixData = getInvalidPostfixData();
    for (var _i = 0, invalidPostfixData_1 = invalidPostfixData; _i < invalidPostfixData_1.length; _i++) {
        var oneTest = invalidPostfixData_1[_i];
        try {
            var parser = new Parser();
            parser.parse(tokenize(oneTest[0]), oneTest[1]);
            console.log("The parser should throw an error.");
            expect(true).toBe(false); // This should fail
        }
        catch (err) {
            expect(err.name).toBe('SyntaxError');
        }
    }
});
test('name proposal', function () {
    try {
        var parser = new Parser();
        parser.parse(tokenize('foo > bar'), ['foo', 'baz']);
        console.log("The parser should throw an error.");
        expect(true).toBe(false); // This should fail
    }
    catch (err) {
        expect(err.toString()).toContain('Did you mean "baz"?');
    }
});
test('parse', function () {
    var parseData = getParseData();
    for (var _i = 0, parseData_1 = parseData; _i < parseData_1.length; _i++) {
        var parseDatum = parseData_1[_i];
        //console.log("Testing ", parseDatum[1], parseDatum[2]);
        var parser = new Parser();
        var generated = parser.parse(tokenize(parseDatum[1]), parseDatum[2]);
        expect(generated.toString()).toBe(parseDatum[0].toString());
    }
});
