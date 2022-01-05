export enum TokenType {
    EOF_TYPE = 'end of expression',
    NAME_TYPE = 'name',
    NUMBER_TYPE = 'number',
    STRING_TYPE = 'string',
    OPERATOR_TYPE = 'operator',
    PUNCTUATION_TYPE = 'punctuation'
}

export class Token {
    /** @deprecated */
    static EOF_TYPE = TokenType.EOF_TYPE;

    /** @deprecated */
    static NAME_TYPE = TokenType.NAME_TYPE;

    /** @deprecated */
    static NUMBER_TYPE = TokenType.NUMBER_TYPE;

    /** @deprecated */
    static STRING_TYPE = TokenType.STRING_TYPE;

    /** @deprecated */
    static OPERATOR_TYPE = TokenType.OPERATOR_TYPE;

    /** @deprecated */
    static PUNCTUATION_TYPE = TokenType.PUNCTUATION_TYPE;

    readonly value: any;
    readonly type: any;
    readonly cursor: any;

    constructor(type, value, cursor) {
        this.value = value;
        this.type = type;
        this.cursor = cursor;
    }

    test(type, value = null) {
        return this.type === type && (null === value || this.value === value);
    }

    toString() {
        return `${this.cursor} [${this.type}] ${this.value}`;
    }

    isEqualTo(t: any) {
        if (t === null || t === undefined || !(t instanceof Token)) {
            return false;
        }

        return t.value == this.value && t.type === this.type && t.cursor === this.cursor;
    }

    diff(t) {
        const diff = [];
        if (!this.isEqualTo(t)) {
            if (t.value !== this.value) {
                diff.push(`Value: ${t.value} != ${this.value}`);
            }
            if (t.cursor !== this.cursor) {
                diff.push(`Cursor: ${t.cursor} != ${this.cursor}`);
            }
            if (t.type !== this.type) {
                diff.push(`Type: ${t.type} != ${this.type}`);
            }
        }
        return diff;
    }
}