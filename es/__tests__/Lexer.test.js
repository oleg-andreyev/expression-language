import { tokenize } from "../Lexer";
import { TokenStream } from "../TokenStream";
import { Token } from "../Token";
function getTokenizeData() {
    return [
        [
            [new Token(Token.NAME_TYPE, 'a', 3)],
            '  a  ',
        ],
        [
            [new Token(Token.NAME_TYPE, 'a', 1)],
            'a',
        ],
        [
            [new Token(Token.STRING_TYPE, 'foo', 1)],
            '"foo"',
        ],
        [
            [new Token(Token.NUMBER_TYPE, '3', 1)],
            '3',
        ],
        [
            [new Token(Token.OPERATOR_TYPE, '+', 1)],
            '+',
        ],
        [
            [new Token(Token.PUNCTUATION_TYPE, '.', 1)],
            '.',
        ],
        [
            [
                new Token(Token.PUNCTUATION_TYPE, '(', 1),
                new Token(Token.NUMBER_TYPE, '3', 2),
                new Token(Token.OPERATOR_TYPE, '+', 4),
                new Token(Token.NUMBER_TYPE, '5', 6),
                new Token(Token.PUNCTUATION_TYPE, ')', 7),
                new Token(Token.OPERATOR_TYPE, '~', 9),
                new Token(Token.NAME_TYPE, 'foo', 11),
                new Token(Token.PUNCTUATION_TYPE, '(', 14),
                new Token(Token.STRING_TYPE, 'bar', 15),
                new Token(Token.PUNCTUATION_TYPE, ')', 20),
                new Token(Token.PUNCTUATION_TYPE, '.', 21),
                new Token(Token.NAME_TYPE, 'baz', 22),
                new Token(Token.PUNCTUATION_TYPE, '[', 25),
                new Token(Token.NUMBER_TYPE, '4', 26),
                new Token(Token.PUNCTUATION_TYPE, ']', 27),
                new Token(Token.OPERATOR_TYPE, '-', 29),
                new Token(Token.NUMBER_TYPE, 1990, 31),
            ],
            '(3 + 5) ~ foo("bar").baz[4] - 1.99E+3',
        ],
        [
            [new Token(Token.OPERATOR_TYPE, '..', 1)],
            '..',
        ],
        [
            [
                new Token('number', 23, 1),
                new Token('operator', '..', 3),
                new Token('number', 26, 5),
            ],
            '23..26',
        ],
        [
            [new Token(Token.OPERATOR_TYPE, '!', 1)],
            '!',
        ],
        [
            [new Token(Token.STRING_TYPE, '#foo', 1)],
            "'#foo'",
        ],
        [
            [new Token(Token.STRING_TYPE, '#foo', 1)],
            '"#foo"',
        ],
        [
            [
                new Token('name', 'foo', 1),
                new Token('punctuation', '.', 4),
                new Token('name', 'not', 5),
                new Token('operator', 'in', 9),
                new Token('punctuation', '[', 12),
                new Token('name', 'bar', 13),
                new Token('punctuation', ']', 16),
            ],
            'foo.not in [bar]',
        ],
    ];
}
test('tokenize throws error with message', function () {
    var expression = "service(faulty.expression.example').dummyMethod()";
    try {
        tokenize(expression);
    }
    catch (err) {
        expect(err.toString()).toContain('Unexpected character "\'"');
    }
});
test('tokenize throws error on unclosed brace', function () {
    var expression = "service(unclosed.expression.dummyMethod()";
    try {
        tokenize(expression);
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
        tokens.push(new Token(Token.EOF_TYPE, null, expression.length + 1));
        //console.log("Testing: ", expression);
        var generatedStream = tokenize(expression);
        var expectedStream = new TokenStream(expression, tokens);
        //console.log("Diff: " + JSON.stringify(generatedStream.diff(expectedStream)));
        expect(generatedStream.isEqualTo(expectedStream)).toBe(true);
    }
});
