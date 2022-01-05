export default class SyntaxError extends Error {
    private readonly subject;
    private readonly proposals;
    constructor(message: string, cursor: any, expression: any, subject?: string | undefined, proposals?: string[] | undefined);
    toString(): string;
}
