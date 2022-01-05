"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Lexer_1 = require("../Lexer");
var TokenStream_1 = require("../TokenStream");
var Token_1 = require("../Token");
function getTokenizeData() {
    return [
        [
            [new Token_1.Token(Token_1.Token.NAME_TYPE, 'a', 3)],
            '  a  ',
        ],
        [
            [new Token_1.Token(Token_1.Token.NAME_TYPE, 'a', 1)],
            'a',
        ],
        [
            [new Token_1.Token(Token_1.Token.STRING_TYPE, 'foo', 1)],
            '"foo"',
        ],
        [
            [new Token_1.Token(Token_1.Token.NUMBER_TYPE, '3', 1)],
            '3',
        ],
        [
            [new Token_1.Token(Token_1.Token.OPERATOR_TYPE, '+', 1)],
            '+',
        ],
        [
            [new Token_1.Token(Token_1.Token.PUNCTUATION_TYPE, '.', 1)],
            '.',
        ],
        [
            [
                new Token_1.Token(Token_1.Token.PUNCTUATION_TYPE, '(', 1),
                new Token_1.Token(Token_1.Token.NUMBER_TYPE, '3', 2),
                new Token_1.Token(Token_1.Token.OPERATOR_TYPE, '+', 4),
                new Token_1.Token(Token_1.Token.NUMBER_TYPE, '5', 6),
                new Token_1.Token(Token_1.Token.PUNCTUATION_TYPE, ')', 7),
                new Token_1.Token(Token_1.Token.OPERATOR_TYPE, '~', 9),
                new Token_1.Token(Token_1.Token.NAME_TYPE, 'foo', 11),
                new Token_1.Token(Token_1.Token.PUNCTUATION_TYPE, '(', 14),
                new Token_1.Token(Token_1.Token.STRING_TYPE, 'bar', 15),
                new Token_1.Token(Token_1.Token.PUNCTUATION_TYPE, ')', 20),
                new Token_1.Token(Token_1.Token.PUNCTUATION_TYPE, '.', 21),
                new Token_1.Token(Token_1.Token.NAME_TYPE, 'baz', 22),
                new Token_1.Token(Token_1.Token.PUNCTUATION_TYPE, '[', 25),
                new Token_1.Token(Token_1.Token.NUMBER_TYPE, '4', 26),
                new Token_1.Token(Token_1.Token.PUNCTUATION_TYPE, ']', 27),
                new Token_1.Token(Token_1.Token.OPERATOR_TYPE, '-', 29),
                new Token_1.Token(Token_1.Token.NUMBER_TYPE, 1990, 31),
            ],
            '(3 + 5) ~ foo("bar").baz[4] - 1.99E+3',
        ],
        [
            [new Token_1.Token(Token_1.Token.OPERATOR_TYPE, '..', 1)],
            '..',
        ],
        [
            [
                new Token_1.Token('number', 23, 1),
                new Token_1.Token('operator', '..', 3),
                new Token_1.Token('number', 26, 5),
            ],
            '23..26',
        ],
        [
            [new Token_1.Token(Token_1.Token.OPERATOR_TYPE, '!', 1)],
            '!',
        ],
        [
            [new Token_1.Token(Token_1.Token.STRING_TYPE, '#foo', 1)],
            "'#foo'",
        ],
        [
            [new Token_1.Token(Token_1.Token.STRING_TYPE, '#foo', 1)],
            '"#foo"',
        ],
        [
            [
                new Token_1.Token('name', 'foo', 1),
                new Token_1.Token('punctuation', '.', 4),
                new Token_1.Token('name', 'not', 5),
                new Token_1.Token('operator', 'in', 9),
                new Token_1.Token('punctuation', '[', 12),
                new Token_1.Token('name', 'bar', 13),
                new Token_1.Token('punctuation', ']', 16),
            ],
            'foo.not in [bar]',
        ],
    ];
}
test('tokenize throws error with message', function () {
    var expression = "service(faulty.expression.example').dummyMethod()";
    try {
        (0, Lexer_1.tokenize)(expression);
    }
    catch (err) {
        expect(err.toString()).toContain('Unexpected character "\'"');
    }
});
test('tokenize throws error on unclosed brace', function () {
    var expression = "service(unclosed.expression.dummyMethod()";
    try {
        (0, Lexer_1.tokenize)(expression);
    }
    catch (err) {
        expect(err.toString()).toContain('Unclosed "("');
    }
});
test('tokenize', function () {
    var data = getTokenizeData();
    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
        var tokenizeData = data_1[_i];
        var tokens = tokenizeData[0];
        var expression = tokenizeData[1];
        tokens.push(new Token_1.Token(Token_1.Token.EOF_TYPE, null, expression.length + 1));
        //console.log("Testing: ", expression);
        var generatedStream = (0, Lexer_1.tokenize)(expression);
        var expectedStream = new TokenStream_1.TokenStream(expression, tokens);
        //console.log("Diff: " + JSON.stringify(generatedStream.diff(expectedStream)));
        expect(generatedStream.isEqualTo(expectedStream)).toBe(true);
    }
});
