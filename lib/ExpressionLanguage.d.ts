import Parser from "./Parser";
import Compiler from "./Compiler";
import ExpressionFunction from "./ExpressionFunction";
export default class ExpressionLanguage {
    private compiler;
    private readonly functions;
    private parser;
    private cache;
    constructor(cache?: any, providers?: any[]);
    /**
     * Compiles an expression source code.
     *
     * @param {Expression|string} expression The expression to compile
     * @param {Array} names An array of valid names
     *
     * @returns {string} The compiled javascript source code
     */
    compile(expression: any, names?: {}): string;
    /**
     * Evaluate an expression
     *
     * @param {Expression|string} expression The expression to compile
     * @param {Object} values An array of values
     *
     * @returns {*} The result of the evaluation of the expression
     */
    evaluate(expression: any, values?: {}): any;
    /**
     * Parses an expression
     *
     * @param {Expression|string} expression The expression to parse
     * @param {Array} names An array of valid names
     * @returns {ParsedExpression} A ParsedExpression instance
     */
    parse(expression: any, names: any): any;
    fixedEncodeURIComponent(str: any): string;
    /**
     * Registers a function
     *
     * @param {string} name The function name
     * @param {function} compiler A function able to compile the function
     * @param {function} evaluator A function able to evaluate the function
     *
     * @throws Error
     *
     * @see ExpressionFunction
     */
    register(name: any, compiler: any, evaluator: any): void;
    addFunction(expressionFunction: ExpressionFunction): void;
    registerProvider(provider: any): void;
    _registerFunctions(): void;
    getParser(): Parser;
    getCompiler(): Compiler;
}
