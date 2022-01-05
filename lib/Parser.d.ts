import Node from "./Node/Node";
import ArrayNode from "./Node/ArrayNode";
import { TokenStream } from "./TokenStream";
export declare const OPERATOR_LEFT = 1;
export declare const OPERATOR_RIGHT = 2;
export default class Parser {
    functions: {};
    unaryOperators: {
        not: {
            precedence: number;
        };
        '!': {
            precedence: number;
        };
        '-': {
            precedence: number;
        };
        '+': {
            precedence: number;
        };
    };
    binaryOperators: {
        or: {
            precedence: number;
            associativity: number;
        };
        '||': {
            precedence: number;
            associativity: number;
        };
        and: {
            precedence: number;
            associativity: number;
        };
        '&&': {
            precedence: number;
            associativity: number;
        };
        '|': {
            precedence: number;
            associativity: number;
        };
        '^': {
            precedence: number;
            associativity: number;
        };
        '&': {
            precedence: number;
            associativity: number;
        };
        '==': {
            precedence: number;
            associativity: number;
        };
        '===': {
            precedence: number;
            associativity: number;
        };
        '!=': {
            precedence: number;
            associativity: number;
        };
        '!==': {
            precedence: number;
            associativity: number;
        };
        '<': {
            precedence: number;
            associativity: number;
        };
        '>': {
            precedence: number;
            associativity: number;
        };
        '>=': {
            precedence: number;
            associativity: number;
        };
        '<=': {
            precedence: number;
            associativity: number;
        };
        'not in': {
            precedence: number;
            associativity: number;
        };
        in: {
            precedence: number;
            associativity: number;
        };
        matches: {
            precedence: number;
            associativity: number;
        };
        '..': {
            precedence: number;
            associativity: number;
        };
        '+': {
            precedence: number;
            associativity: number;
        };
        '-': {
            precedence: number;
            associativity: number;
        };
        '~': {
            precedence: number;
            associativity: number;
        };
        '*': {
            precedence: number;
            associativity: number;
        };
        '/': {
            precedence: number;
            associativity: number;
        };
        '%': {
            precedence: number;
            associativity: number;
        };
        '**': {
            precedence: number;
            associativity: number;
        };
    };
    private tokenStream;
    private names;
    private objectMatches;
    private cachedNames;
    private nestedExecutions;
    constructor(functions?: {});
    parse(tokenStream: TokenStream, names?: any[]): Node;
    parseExpression(precedence?: number): Node;
    getPrimary(): any;
    parseConditionalExpression(expr: any): any;
    parsePrimaryExpression(): any;
    hasVariable(name: any): boolean;
    getNames(): any[];
    parseArrayExpression(): ArrayNode;
    parseHashExpression(): ArrayNode;
    parsePostfixExpression(node: any): any;
    parseArguments(): Node;
}
