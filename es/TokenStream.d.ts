import { Token, TokenType } from "./Token";
export declare class TokenStream {
    readonly expression: any;
    private position;
    private readonly tokens;
    constructor(expression: any, tokens: Token[]);
    get current(): Token;
    get last(): Token;
    toString(): string;
    next(): void;
    expect(type: TokenType, value: string, message?: string): void;
    isEOF(): boolean;
    isEqualTo(ts: any): boolean;
    diff(ts: any): any[];
}
