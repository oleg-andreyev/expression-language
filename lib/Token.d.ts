export declare enum TokenType {
    EOF_TYPE = "end of expression",
    NAME_TYPE = "name",
    NUMBER_TYPE = "number",
    STRING_TYPE = "string",
    OPERATOR_TYPE = "operator",
    PUNCTUATION_TYPE = "punctuation"
}
export declare class Token {
    /** @deprecated */
    static EOF_TYPE: TokenType;
    /** @deprecated */
    static NAME_TYPE: TokenType;
    /** @deprecated */
    static NUMBER_TYPE: TokenType;
    /** @deprecated */
    static STRING_TYPE: TokenType;
    /** @deprecated */
    static OPERATOR_TYPE: TokenType;
    /** @deprecated */
    static PUNCTUATION_TYPE: TokenType;
    readonly value: any;
    readonly type: any;
    readonly cursor: any;
    constructor(type: any, value: any, cursor: any);
    test(type: any, value?: any): boolean;
    toString(): string;
    isEqualTo(t: any): boolean;
    diff(t: any): any[];
}
