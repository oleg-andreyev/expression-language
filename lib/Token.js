"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = exports.TokenType = void 0;
var TokenType;
(function (TokenType) {
    TokenType["EOF_TYPE"] = "end of expression";
    TokenType["NAME_TYPE"] = "name";
    TokenType["NUMBER_TYPE"] = "number";
    TokenType["STRING_TYPE"] = "string";
    TokenType["OPERATOR_TYPE"] = "operator";
    TokenType["PUNCTUATION_TYPE"] = "punctuation";
})(TokenType = exports.TokenType || (exports.TokenType = {}));
var Token = /** @class */ (function () {
    function Token(type, value, cursor) {
        this.value = value;
        this.type = type;
        this.cursor = cursor;
    }
    Token.prototype.test = function (type, value) {
        if (value === void 0) { value = null; }
        return this.type === type && (null === value || this.value === value);
    };
    Token.prototype.toString = function () {
        return "".concat(this.cursor, " [").concat(this.type, "] ").concat(this.value);
    };
    Token.prototype.isEqualTo = function (t) {
        if (t === null || t === undefined || !(t instanceof Token)) {
            return false;
        }
        return t.value == this.value && t.type === this.type && t.cursor === this.cursor;
    };
    Token.prototype.diff = function (t) {
        var diff = [];
        if (!this.isEqualTo(t)) {
            if (t.value !== this.value) {
                diff.push("Value: ".concat(t.value, " != ").concat(this.value));
            }
            if (t.cursor !== this.cursor) {
                diff.push("Cursor: ".concat(t.cursor, " != ").concat(this.cursor));
            }
            if (t.type !== this.type) {
                diff.push("Type: ".concat(t.type, " != ").concat(this.type));
            }
        }
        return diff;
    };
    /** @deprecated */
    Token.EOF_TYPE = TokenType.EOF_TYPE;
    /** @deprecated */
    Token.NAME_TYPE = TokenType.NAME_TYPE;
    /** @deprecated */
    Token.NUMBER_TYPE = TokenType.NUMBER_TYPE;
    /** @deprecated */
    Token.STRING_TYPE = TokenType.STRING_TYPE;
    /** @deprecated */
    Token.OPERATOR_TYPE = TokenType.OPERATOR_TYPE;
    /** @deprecated */
    Token.PUNCTUATION_TYPE = TokenType.PUNCTUATION_TYPE;
    return Token;
}());
exports.Token = Token;
