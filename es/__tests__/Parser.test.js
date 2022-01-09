define(["require", "exports", "../Lexer", "../Parser", "../Node/ArgumentsNode", "../Node/ConstantNode", "../Node/NameNode", "../Node/UnaryNode", "../Node/BinaryNode", "../Node/GetAttrNode", "../Node/ConditionalNode", "../Node/ArrayNode"], function (require, exports, Lexer_1, Parser_1, ArgumentsNode_1, ConstantNode_1, NameNode_1, UnaryNode_1, BinaryNode_1, GetAttrNode_1, ConditionalNode_1, ArrayNode_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function getParseData() {
        var args = new ArgumentsNode_1.default();
        args.addElement(new ConstantNode_1.default('arg1'));
        args.addElement(new ConstantNode_1.default(2));
        args.addElement(new ConstantNode_1.default(true));
        var arrayNode = new ArrayNode_1.default();
        arrayNode.addElement(new NameNode_1.default('bar'));
        return [
            [new NameNode_1.default('a'), 'a', ['a']],
            [new ConstantNode_1.default('a'), '"a"'],
            [new ConstantNode_1.default(3), '3'],
            [new ConstantNode_1.default(false), 'false'],
            [new ConstantNode_1.default(true), 'true'],
            [new ConstantNode_1.default(null), 'null'],
            [new UnaryNode_1.default('-', new ConstantNode_1.default(3)), '-3'],
            [new BinaryNode_1.default('-', new ConstantNode_1.default(3), new ConstantNode_1.default(3)), '3 - 3'],
            [new BinaryNode_1.default('*', new BinaryNode_1.default('-', new ConstantNode_1.default(3), new ConstantNode_1.default(3)), new ConstantNode_1.default(2)),
                '(3 - 3) * 2'
            ],
            [
                new GetAttrNode_1.default(new NameNode_1.default('foo'), new ConstantNode_1.default('bar', true), new ArgumentsNode_1.default(), GetAttrNode_1.default.PROPERTY_CALL),
                'foo.bar',
                ['foo']
            ],
            [
                new GetAttrNode_1.default(new NameNode_1.default('foo'), new ConstantNode_1.default('bar', true), new ArgumentsNode_1.default(), GetAttrNode_1.default.METHOD_CALL),
                'foo.bar()',
                ['foo']
            ],
            [
                new GetAttrNode_1.default(new NameNode_1.default('foo'), new ConstantNode_1.default('not', true), new ArgumentsNode_1.default(), GetAttrNode_1.default.METHOD_CALL),
                'foo.not()',
                ['foo']
            ],
            [
                new GetAttrNode_1.default(new NameNode_1.default('foo'), new ConstantNode_1.default('bar', true), args, GetAttrNode_1.default.METHOD_CALL),
                'foo.bar("arg1", 2, true)',
                ['foo']
            ],
            [
                new GetAttrNode_1.default(new NameNode_1.default('foo'), new ConstantNode_1.default(3), new ArgumentsNode_1.default(), GetAttrNode_1.default.ARRAY_CALL),
                'foo[3]',
                ['foo']
            ],
            [
                new ConditionalNode_1.default(new ConstantNode_1.default(true), new ConstantNode_1.default(true), new ConstantNode_1.default(false)),
                'true ? true ? false'
            ],
            [
                new BinaryNode_1.default('matches', new ConstantNode_1.default('foo'), new ConstantNode_1.default('/foo/')),
                '"foo" matches "/foo/"'
            ],
            // chained calls
            [
                createGetAttrNode(createGetAttrNode(createGetAttrNode(createGetAttrNode(new NameNode_1.default('foo'), 'bar', GetAttrNode_1.default.METHOD_CALL), 'foo', GetAttrNode_1.default.METHOD_CALL), 'baz', GetAttrNode_1.default.PROPERTY_CALL), '3', GetAttrNode_1.default.ARRAY_CALL),
                'foo.bar().foo().baz[3]',
                ['foo']
            ],
            [
                new NameNode_1.default('foo'),
                'bar',
                [{ foo: 'bar' }]
            ],
            // Operators collisions
            [
                new BinaryNode_1.default('in', new GetAttrNode_1.default(new NameNode_1.default('foo'), new ConstantNode_1.default('not', true), new ArgumentsNode_1.default(), GetAttrNode_1.default.PROPERTY_CALL), arrayNode),
                'foo.not in [bar]',
                ['foo', 'bar'],
            ],
            [
                new BinaryNode_1.default('or', new UnaryNode_1.default('not', new NameNode_1.default('foo')), new GetAttrNode_1.default(new NameNode_1.default('foo'), new ConstantNode_1.default('not', true), new ArgumentsNode_1.default(), GetAttrNode_1.default.PROPERTY_CALL)),
                'not foo or foo.not',
                ['foo'],
            ],
            [
                new BinaryNode_1.default('..', new ConstantNode_1.default(0), new ConstantNode_1.default(3)),
                '0..3',
            ],
        ];
    }
    function createGetAttrNode(node, item, type) {
        return new GetAttrNode_1.default(node, new ConstantNode_1.default(item, GetAttrNode_1.default.ARRAY_CALL !== type), new ArgumentsNode_1.default(), type);
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
            var parser = new Parser_1.default();
            parser.parse((0, Lexer_1.tokenize)("foo"));
            console.log("The parser should throw an error.");
            expect(true).toBe(false); // This should fail
        }
        catch (err) {
            expect(err.toString()).toContain('Variable "foo" is not valid around position 1');
        }
    });
    test("parse with zero in names", function () {
        try {
            var parser = new Parser_1.default();
            parser.parse((0, Lexer_1.tokenize)("foo"), [0]);
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
                var parser = new Parser_1.default();
                parser.parse((0, Lexer_1.tokenize)(oneTest[0]), oneTest[1]);
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
            var parser = new Parser_1.default();
            parser.parse((0, Lexer_1.tokenize)('foo > bar'), ['foo', 'baz']);
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
            var parser = new Parser_1.default();
            var generated = parser.parse((0, Lexer_1.tokenize)(parseDatum[1]), parseDatum[2]);
            expect(generated.toString()).toBe(parseDatum[0].toString());
        }
    });
});
