"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenStream = void 0;
var SyntaxError_1 = require("./SyntaxError");
var Token_1 = require("./Token");
var TokenStream = /** @class */ (function () {
    function TokenStream(expression, tokens) {
        this.expression = expression;
        this.position = 0;
        this.tokens = tokens;
    }
    Object.defineProperty(TokenStream.prototype, "current", {
        get: function () {
            return this.tokens[this.position];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TokenStream.prototype, "last", {
        get: function () {
            return this.tokens[this.position - 1];
        },
        enumerable: false,
        configurable: true
    });
    TokenStream.prototype.toString = function () {
        return this.tokens.join("\n");
    };
    TokenStream.prototype.next = function () {
        this.position += 1;
        if (this.tokens[this.position] === undefined) {
            throw new SyntaxError_1.default("Unexpected end of expression", this.last.cursor, this.expression, null, null);
        }
    };
    TokenStream.prototype.expect = function (type, value, message) {
        var token = this.current;
        if (!token.test(type, value)) {
            var compiledMessage = "";
            if (message) {
                compiledMessage = message + ". ";
            }
            var valueMessage = "";
            if (value) {
                valueMessage = " with value \"".concat(value, "\"");
            }
            compiledMessage += "Unexpected token \"".concat(token.type, "\" of value \"").concat(token.value, "\" (\"").concat(type, "\" expected").concat(valueMessage, ")");
            throw new SyntaxError_1.default(compiledMessage, token.cursor, this.expression, null, null);
        }
        this.next();
    };
    TokenStream.prototype.isEOF = function () {
        return Token_1.Token.EOF_TYPE === this.current.type;
    };
    TokenStream.prototype.isEqualTo = function (ts) {
        if (ts === null ||
            ts === undefined ||
            !(ts instanceof TokenStream)) {
            return false;
        }
        if (ts.tokens.length !== this.tokens.length) {
            return false;
        }
        var tsStartPosition = ts.position;
        ts.position = 0;
        var allTokensMatch = true;
        for (var _i = 0, _a = this.tokens; _i < _a.length; _i++) {
            var token = _a[_i];
            var match = ts.current.isEqualTo(token);
            if (!match) {
                allTokensMatch = false;
                break;
            }
            if (ts.position < ts.tokens.length - 1) {
                ts.next();
            }
        }
        ts.position = tsStartPosition;
        return allTokensMatch;
    };
    TokenStream.prototype.diff = function (ts) {
        var diff = [];
        if (!this.isEqualTo(ts)) {
            var index = 0;
            var tsStartPosition = ts.position;
            ts.position = 0;
            for (var _i = 0, _a = this.tokens; _i < _a.length; _i++) {
                var token = _a[_i];
                var tokenDiff = token.diff(ts.current);
                if (tokenDiff.length > 0) {
                    diff.push({ index: index, diff: tokenDiff });
                }
                if (ts.position < ts.tokens.length - 1) {
                    ts.next();
                }
            }
            ts.position = tsStartPosition;
        }
        return diff;
    };
    return TokenStream;
}());
exports.TokenStream = TokenStream;
