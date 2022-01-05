declare type Compiler = (...args: any) => any;
declare type Evaluator = (...args: any) => any;
export default class ExpressionFunction {
    private readonly name;
    private readonly compiler;
    private readonly evaluator;
    constructor(name: string, compiler: Compiler, evaluator: Evaluator);
    getName(): string;
    getCompiler(): Compiler;
    getEvaluator(): any;
}
export {};
