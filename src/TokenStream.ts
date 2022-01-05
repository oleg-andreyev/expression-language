import SyntaxError from "./SyntaxError";
import {Token, TokenType} from "./Token";

export class TokenStream {
    readonly expression: any;
    private position: number;
    private readonly tokens: Token[];

    constructor(expression, tokens: Token[]) {
        this.expression = expression;
        this.position = 0;
        this.tokens = tokens;
    }

    get current(): Token {
        return this.tokens[this.position];
    }

    get last(): Token {
        return this.tokens[this.position - 1];
    }

    toString() {
        return this.tokens.join("\n");
    }

    next() {
        this.position += 1;

        if (this.tokens[this.position] === undefined) {
            throw new SyntaxError(
                `Unexpected end of expression`,
                this.last.cursor,
                this.expression,
                null,
                null
            );
        }
    }

    expect(type: TokenType, value: string, message?: string) {
        const token = this.current;
        if (!token.test(type, value)) {
            let compiledMessage = "";
            if (message) {
                compiledMessage = message + ". ";
            }
            let valueMessage = "";
            if (value) {
                valueMessage = ` with value "${value}"`;
            }
            compiledMessage += `Unexpected token "${token.type}" of value "${token.value}" ("${type}" expected${valueMessage})`;

            throw new SyntaxError(compiledMessage, token.cursor, this.expression, null, null);
        }
        this.next();
    }

    isEOF() {
        return Token.EOF_TYPE === this.current.type;
    }

    isEqualTo(ts) {
        if (ts === null ||
            ts === undefined ||
            !(ts instanceof TokenStream)
        ) {
            return false;
        }

        if (ts.tokens.length !== this.tokens.length) {
            return false;
        }

        const tsStartPosition = ts.position;
        ts.position = 0;
        let allTokensMatch = true;
        for (const token of this.tokens) {
            const match = ts.current.isEqualTo(token);
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
    }

    diff(ts) {
        const diff = [];
        if (!this.isEqualTo(ts)) {
            const index = 0;
            const tsStartPosition = ts.position;
            ts.position = 0;
            for (const token of this.tokens) {
                const tokenDiff = token.diff(ts.current);
                if (tokenDiff.length > 0) {
                    diff.push({index: index, diff: tokenDiff});
                }
                if (ts.position < ts.tokens.length - 1) {
                    ts.next();
                }
            }
            ts.position = tsStartPosition;
        }
        return diff;
    }
}