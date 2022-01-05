type Compiler = (...args: any) => any;
type Evaluator = (...args: any) => any;

export default class ExpressionFunction {
    private readonly name: string;
    private readonly compiler: Compiler;
    private readonly evaluator: any;

    constructor(name: string, compiler: Compiler, evaluator: Evaluator) {
        this.name = name;
        this.compiler = compiler;
        this.evaluator = evaluator;
    }

    getName() {
        return this.name;
    }

    getCompiler() {
        return this.compiler;
    }

    getEvaluator() {
        return this.evaluator;
    }
}
