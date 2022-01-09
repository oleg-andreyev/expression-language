import SyntaxError from "./SyntaxError";
import { TokenStream } from "./TokenStream";
import { Token } from "./Token";
export function tokenize(expression) {
    expression = expression.replace(/\r|\n|\t|\v|\f/g, ' ');
    var cursor = 0;
    var tokens = [];
    var brackets = [];
    var end = expression.length;
    while (cursor < end) {
        if (' ' === expression[cursor]) {
            ++cursor;
            continue;
        }
        var number = extractNumber(expression.substr(cursor));
        if (number !== null) {
            // numbers
            number = parseFloat(number); // floats
            tokens.push(new Token(Token.NUMBER_TYPE, number, cursor + 1));
            cursor += number.toString().length;
        }
        else {
            if ('([{'.indexOf(expression[cursor]) >= 0) {
                // opening bracket
                brackets.push([expression[cursor], cursor]);
                tokens.push(new Token(Token.PUNCTUATION_TYPE, expression[cursor], cursor + 1));
                ++cursor;
            }
            else {
                if (')]}'.indexOf(expression[cursor]) >= 0) {
                    if (brackets.length === 0) {
                        throw new SyntaxError("Unexpected \"".concat(expression[cursor], "\""), cursor, expression);
                    }
                    var _a = brackets.pop(), expect_1 = _a[0], cur = _a[1], matchExpect = expect_1.replace("(", ")").replace("{", "}").replace("[", "]");
                    if (expression[cursor] !== matchExpect) {
                        throw new SyntaxError("Unclosed \"".concat(expect_1, "\""), cur, expression);
                    }
                    tokens.push(new Token(Token.PUNCTUATION_TYPE, expression[cursor], cursor + 1));
                    ++cursor;
                }
                else {
                    var str = extractString(expression.substr(cursor));
                    if (str !== null) {
                        //console.log("adding string: " + str);
                        tokens.push(new Token(Token.STRING_TYPE, str.captured, cursor + 1));
                        cursor += (str.length);
                        //console.log(`Extracted string: ${str.captured}; Remaining: ${expression.substr(cursor)}`, cursor, expression);
                    }
                    else {
                        var operator = extractOperator(expression.substr(cursor));
                        if (operator) {
                            tokens.push(new Token(Token.OPERATOR_TYPE, operator, cursor + 1));
                            cursor += operator.length;
                        }
                        else {
                            if (".,?:".indexOf(expression[cursor]) >= 0) {
                                tokens.push(new Token(Token.PUNCTUATION_TYPE, expression[cursor], cursor + 1));
                                ++cursor;
                            }
                            else {
                                var name_1 = extractName(expression.substr(cursor));
                                if (name_1) {
                                    tokens.push(new Token(Token.NAME_TYPE, name_1, cursor + 1));
                                    cursor += name_1.length;
                                    //console.log(`Extracted name: ${name}; Remaining: ${expression.substr(cursor)}`, cursor, expression)
                                }
                                else {
                                    throw new SyntaxError("Unexpected character \"".concat(expression[cursor], "\""), cursor, expression);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    tokens.push(new Token(Token.EOF_TYPE, null, cursor + 1));
    if (brackets.length > 0) {
        var _b = brackets.pop(), expect_2 = _b[0], cur = _b[1];
        throw new SyntaxError("Unclosed \"".concat(expect_2, "\""), cur, expression);
    }
    return new TokenStream(expression, tokens);
}
function extractNumber(str) {
    var extracted = null;
    var matches = str.match(/^[0-9]+(?:.[0-9]+)?/);
    if (matches && matches.length > 0) {
        extracted = matches[0];
        if (extracted.indexOf(".") === -1) {
            extracted = parseInt(extracted);
        }
        else {
            extracted = parseFloat(extracted);
        }
    }
    return extracted;
}
var strRegex = /^"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)'/s;
/**
 *
 * @param str
 * @returns {null|string}
 */
function extractString(str) {
    var extracted = null;
    if (["'", '"'].indexOf(str.substr(0, 1)) === -1) {
        return extracted;
    }
    var m = strRegex.exec(str);
    if (m !== null && m.length > 0) {
        if (m[1]) {
            extracted = {
                captured: m[1]
            };
        }
        else {
            extracted = {
                captured: m[2]
            };
        }
        extracted.length = m[0].length;
    }
    return extracted;
}
var operators = [
    "&&", "and", "||", "or",
    "+", "-", "**", "*", "/", "%",
    "&", "|", "^",
    "===", "!==", "!=", "==", "<=", ">=", "<", ">", "matches", "not in", "in", "not", "!",
    "~",
    '..' // Range function
];
var wordBasedOperators = ["and", "or", "matches", "not in", "in", "not"];
/**
 *
 * @param str
 * @returns {null|string}
 */
function extractOperator(str) {
    var extracted = null;
    for (var _i = 0, operators_1 = operators; _i < operators_1.length; _i++) {
        var operator = operators_1[_i];
        if (str.substr(0, operator.length) === operator) {
            // If it is one of the word based operators, make sure there is a space after it
            if (wordBasedOperators.indexOf(operator) >= 0) {
                if (str.substr(0, operator.length + 1) === operator + " ") {
                    extracted = operator;
                }
            }
            else {
                extracted = operator;
            }
            break;
        }
    }
    return extracted;
}
function extractName(str) {
    var extracted = null;
    var matches = str.match(/^[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/);
    if (matches && matches.length > 0) {
        extracted = matches[0];
    }
    return extracted;
}
