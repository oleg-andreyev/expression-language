import { tokenize } from "./Lexer";
import Parser from "./Parser";
import Compiler from "./Compiler";
import ParsedExpression from "./ParsedExpression";
import ArrayAdapter from "./Cache/ArrayAdapter";
import LogicException from "./LogicException";
var ExpressionLanguage = /** @class */ (function () {
    function ExpressionLanguage(cache, providers) {
        if (cache === void 0) { cache = null; }
        if (providers === void 0) { providers = []; }
        this.compiler = null;
        this.functions = [];
        this.parser = null;
        this.cache = cache || new ArrayAdapter();
        for (var _i = 0, providers_1 = providers; _i < providers_1.length; _i++) {
            var provider = providers_1[_i];
            this.registerProvider(provider);
        }
    }
    /**
     * Compiles an expression source code.
     *
     * @param {Expression|string} expression The expression to compile
     * @param {Array} names An array of valid names
     *
     * @returns {string} The compiled javascript source code
     */
    ExpressionLanguage.prototype.compile = function (expression, names) {
        if (names === void 0) { names = {}; }
        return this.getCompiler()
            .compile(this.parse(expression, names).getNodes()).getSource();
    };
    /**
     * Evaluate an expression
     *
     * @param {Expression|string} expression The expression to compile
     * @param {Object} values An array of values
     *
     * @returns {*} The result of the evaluation of the expression
     */
    ExpressionLanguage.prototype.evaluate = function (expression, values) {
        if (values === void 0) { values = {}; }
        return this.parse(expression, Object.keys(values)).getNodes().evaluate(this.functions, values);
    };
    /**
     * Parses an expression
     *
     * @param {Expression|string} expression The expression to parse
     * @param {Array} names An array of valid names
     * @returns {ParsedExpression} A ParsedExpression instance
     */
    ExpressionLanguage.prototype.parse = function (expression, names) {
        if (expression instanceof ParsedExpression) {
            return expression;
        }
        var cacheKeyItems = [];
        names.sort(function (a, b) {
            var a_value = a, b_value = b;
            if (typeof a === "object") {
                a_value = Object.values(a)[0];
            }
            if (typeof b === "object") {
                b_value = Object.values(b)[0];
            }
            return a_value.localeCompare(b_value);
        });
        for (var _i = 0, names_1 = names; _i < names_1.length; _i++) {
            var name_1 = names_1[_i];
            var value = name_1;
            if (typeof name_1 === "object") {
                var tmpName = Object.keys(name_1)[0], tmpValue = Object.values(name_1)[0];
                value = tmpName + ":" + tmpValue;
            }
            cacheKeyItems.push(value);
        }
        var cacheItem = this.cache.getItem(this.fixedEncodeURIComponent(expression + "//" + cacheKeyItems.join("|")));
        var parsedExpression = cacheItem.get();
        if (null === parsedExpression) {
            var nodes = this.getParser().parse(tokenize(expression), names);
            parsedExpression = new ParsedExpression(expression, nodes);
            cacheItem.set(parsedExpression);
            this.cache.save(cacheItem);
        }
        return parsedExpression;
    };
    ExpressionLanguage.prototype.fixedEncodeURIComponent = function (str) {
        return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
            return '%' + c.charCodeAt(0).toString(16);
        });
    };
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
    ExpressionLanguage.prototype.register = function (name, compiler, evaluator) {
        if (null !== this.parser) {
            throw new LogicException("Registering functions after calling evaluate(), compile(), or parse() is not supported.");
        }
        this.functions[name] = { compiler: compiler, evaluator: evaluator };
    };
    ExpressionLanguage.prototype.addFunction = function (expressionFunction) {
        this.register(expressionFunction.getName(), expressionFunction.getCompiler(), expressionFunction.getEvaluator());
    };
    ExpressionLanguage.prototype.registerProvider = function (provider) {
        for (var _i = 0, _a = provider.getFunctions(); _i < _a.length; _i++) {
            var fn = _a[_i];
            this.addFunction(fn);
        }
    };
    ExpressionLanguage.prototype._registerFunctions = function () {
        // TODO figure out a way to replicate "constant" function from PHP
    };
    ExpressionLanguage.prototype.getParser = function () {
        if (null === this.parser) {
            this.parser = new Parser(this.functions);
        }
        return this.parser;
    };
    ExpressionLanguage.prototype.getCompiler = function () {
        if (null === this.compiler) {
            this.compiler = new Compiler(this.functions);
        }
        return this.compiler.reset();
    };
    return ExpressionLanguage;
}());
export default ExpressionLanguage;
