define(["require", "exports", "./SyntaxError", "./Node/Node", "./Node/BinaryNode", "./Node/UnaryNode", "./Node/ConstantNode", "./Node/ConditionalNode", "./Node/FunctionNode", "./Node/NameNode", "./Node/ArrayNode", "./Node/ArgumentsNode", "./Node/GetAttrNode", "./Token"], function (require, exports, SyntaxError_1, Node_1, BinaryNode_1, UnaryNode_1, ConstantNode_1, ConditionalNode_1, FunctionNode_1, NameNode_1, ArrayNode_1, ArgumentsNode_1, GetAttrNode_1, Token_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OPERATOR_RIGHT = exports.OPERATOR_LEFT = void 0;
    exports.OPERATOR_LEFT = 1;
    exports.OPERATOR_RIGHT = 2;
    var Parser = /** @class */ (function () {
        function Parser(functions) {
            if (functions === void 0) { functions = {}; }
            this.functions = {};
            this.unaryOperators = {
                'not': { 'precedence': 50 },
                '!': { 'precedence': 50 },
                '-': { 'precedence': 500 },
                '+': { 'precedence': 500 }
            };
            this.binaryOperators = {
                'or': { 'precedence': 10, 'associativity': exports.OPERATOR_LEFT },
                '||': { 'precedence': 10, 'associativity': exports.OPERATOR_LEFT },
                'and': { 'precedence': 15, 'associativity': exports.OPERATOR_LEFT },
                '&&': { 'precedence': 15, 'associativity': exports.OPERATOR_LEFT },
                '|': { 'precedence': 16, 'associativity': exports.OPERATOR_LEFT },
                '^': { 'precedence': 17, 'associativity': exports.OPERATOR_LEFT },
                '&': { 'precedence': 18, 'associativity': exports.OPERATOR_LEFT },
                '==': { 'precedence': 20, 'associativity': exports.OPERATOR_LEFT },
                '===': { 'precedence': 20, 'associativity': exports.OPERATOR_LEFT },
                '!=': { 'precedence': 20, 'associativity': exports.OPERATOR_LEFT },
                '!==': { 'precedence': 20, 'associativity': exports.OPERATOR_LEFT },
                '<': { 'precedence': 20, 'associativity': exports.OPERATOR_LEFT },
                '>': { 'precedence': 20, 'associativity': exports.OPERATOR_LEFT },
                '>=': { 'precedence': 20, 'associativity': exports.OPERATOR_LEFT },
                '<=': { 'precedence': 20, 'associativity': exports.OPERATOR_LEFT },
                'not in': { 'precedence': 20, 'associativity': exports.OPERATOR_LEFT },
                'in': { 'precedence': 20, 'associativity': exports.OPERATOR_LEFT },
                'matches': { 'precedence': 20, 'associativity': exports.OPERATOR_LEFT },
                '..': { 'precedence': 25, 'associativity': exports.OPERATOR_LEFT },
                '+': { 'precedence': 30, 'associativity': exports.OPERATOR_LEFT },
                '-': { 'precedence': 30, 'associativity': exports.OPERATOR_LEFT },
                '~': { 'precedence': 40, 'associativity': exports.OPERATOR_LEFT },
                '*': { 'precedence': 60, 'associativity': exports.OPERATOR_LEFT },
                '/': { 'precedence': 60, 'associativity': exports.OPERATOR_LEFT },
                '%': { 'precedence': 60, 'associativity': exports.OPERATOR_LEFT },
                '**': { 'precedence': 200, 'associativity': exports.OPERATOR_RIGHT }
            };
            this.cachedNames = [];
            this.functions = functions;
            this.objectMatches = {};
            this.nestedExecutions = 0;
        }
        Parser.prototype.parse = function (tokenStream, names) {
            if (names === void 0) { names = []; }
            this.tokenStream = tokenStream;
            this.names = names;
            this.objectMatches = {};
            this.cachedNames = null;
            this.nestedExecutions = 0;
            //console.log("tokens: ", tokenStream.toString());
            var node = this.parseExpression();
            if (!this.tokenStream.isEOF()) {
                throw new SyntaxError_1.default("Unexpected token \"".concat(this.tokenStream.current.type, "\" of value \"").concat(this.tokenStream.current.value, "\"."), this.tokenStream.current.cursor, this.tokenStream.expression);
            }
            return node;
        };
        Parser.prototype.parseExpression = function (precedence) {
            if (precedence === void 0) { precedence = 0; }
            var expr = this.getPrimary();
            var token = this.tokenStream.current;
            this.nestedExecutions++;
            if (this.nestedExecutions > 100) {
                throw new Error("Way to many executions on '" + token.toString() + "' of '" + this.tokenStream.toString() + "'");
            }
            //console.log("Parsing: ", token);
            while (token.test(Token_1.Token.OPERATOR_TYPE)
                && this.binaryOperators[token.value] !== undefined
                && this.binaryOperators[token.value] !== null
                && this.binaryOperators[token.value].precedence >= precedence) {
                var op = this.binaryOperators[token.value];
                this.tokenStream.next();
                var expr1 = this.parseExpression(exports.OPERATOR_LEFT === op.associativity ? op.precedence + 1 : op.precedence);
                expr = new BinaryNode_1.default(token.value, expr, expr1);
                token = this.tokenStream.current;
            }
            if (0 === precedence) {
                return this.parseConditionalExpression(expr);
            }
            return expr;
        };
        Parser.prototype.getPrimary = function () {
            var token = this.tokenStream.current;
            if (token.test(Token_1.Token.OPERATOR_TYPE)
                && this.unaryOperators[token.value] !== undefined
                && this.unaryOperators[token.value] !== null) {
                var operator = this.unaryOperators[token.value];
                this.tokenStream.next();
                var expr = this.parseExpression(operator.precedence);
                return this.parsePostfixExpression(new UnaryNode_1.default(token.value, expr));
            }
            if (token.test(Token_1.Token.PUNCTUATION_TYPE, "(")) {
                //console.log("Found '('.", token.type, token.value);
                this.tokenStream.next();
                var expr = this.parseExpression();
                this.tokenStream.expect(Token_1.Token.PUNCTUATION_TYPE, ")", "An opened parenthesis is not properly closed");
                return this.parsePostfixExpression(expr);
            }
            return this.parsePrimaryExpression();
        };
        Parser.prototype.parseConditionalExpression = function (expr) {
            while (this.tokenStream.current.test(Token_1.Token.PUNCTUATION_TYPE, "?")) {
                this.tokenStream.next();
                var expr2 = void 0, expr3 = void 0;
                if (!this.tokenStream.current.test(Token_1.Token.PUNCTUATION_TYPE, ":")) {
                    expr2 = this.parseExpression();
                    if (this.tokenStream.current.test(Token_1.Token.PUNCTUATION_TYPE, ":")) {
                        this.tokenStream.next();
                        expr3 = this.parseExpression();
                    }
                    else {
                        expr3 = new ConstantNode_1.default(null);
                    }
                }
                else {
                    this.tokenStream.next();
                    expr2 = expr;
                    expr3 = this.parseExpression();
                }
                expr = new ConditionalNode_1.default(expr, expr2, expr3);
            }
            return expr;
        };
        Parser.prototype.parsePrimaryExpression = function () {
            var token = this.tokenStream.current;
            var node = null;
            switch (token.type) {
                case Token_1.Token.NAME_TYPE:
                    this.tokenStream.next();
                    switch (token.value) {
                        case 'true':
                        case 'TRUE':
                            return new ConstantNode_1.default(true);
                        case 'false':
                        case 'FALSE':
                            return new ConstantNode_1.default(false);
                        case 'null':
                        case 'NULL':
                            return new ConstantNode_1.default(null);
                        default:
                            if ("(" === this.tokenStream.current.value) {
                                if (this.functions[token.value] === undefined) {
                                    throw new SyntaxError_1.default("The function \"".concat(token.value, "\" does not exist"), token.cursor, this.tokenStream.expression, token.value, Object.keys(this.functions));
                                }
                                node = new FunctionNode_1.default(token.value, this.parseArguments());
                            }
                            else {
                                if (!this.hasVariable(token.value)) {
                                    throw new SyntaxError_1.default("Variable \"".concat(token.value, "\" is not valid"), token.cursor, this.tokenStream.expression, token.value, this.getNames());
                                }
                                var name_1 = token.value;
                                //console.log("Checking for object matches: ", name, this.objectMatches, this.getNames());
                                if (this.objectMatches[name_1] !== undefined) {
                                    name_1 = this.getNames()[this.objectMatches[name_1]];
                                }
                                node = new NameNode_1.default(name_1);
                            }
                    }
                    break;
                case Token_1.Token.NUMBER_TYPE:
                case Token_1.Token.STRING_TYPE:
                    this.tokenStream.next();
                    return new ConstantNode_1.default(token.value);
                default:
                    if (token.test(Token_1.Token.PUNCTUATION_TYPE, "[")) {
                        node = this.parseArrayExpression();
                    }
                    else if (token.test(Token_1.Token.PUNCTUATION_TYPE, "{")) {
                        node = this.parseHashExpression();
                    }
                    else {
                        throw new SyntaxError_1.default("Unexpected token \"".concat(token.type, "\" of value \"").concat(token.value, "\""), token.cursor, this.tokenStream.expression);
                    }
            }
            return this.parsePostfixExpression(node);
        };
        Parser.prototype.hasVariable = function (name) {
            return this.getNames().indexOf(name) >= 0;
        };
        Parser.prototype.getNames = function () {
            if (this.cachedNames !== null) {
                return this.cachedNames;
            }
            if (this.names && this.names.length > 0) {
                var names = [];
                var index = 0;
                this.objectMatches = {};
                for (var _i = 0, _a = this.names; _i < _a.length; _i++) {
                    var name_2 = _a[_i];
                    if (typeof name_2 === "object") {
                        var values = Object.values(name_2);
                        this.objectMatches[values[0]] = index;
                        names.push(Object.keys(name_2)[0]);
                        names.push(values[0]);
                    }
                    else {
                        names.push(name_2);
                    }
                    index++;
                }
                this.cachedNames = names;
                return names;
            }
            return [];
        };
        Parser.prototype.parseArrayExpression = function () {
            this.tokenStream.expect(Token_1.Token.PUNCTUATION_TYPE, '[', 'An array element was expected');
            var node = new ArrayNode_1.default();
            var first = true;
            while (!this.tokenStream.current.test(Token_1.Token.PUNCTUATION_TYPE, ']')) {
                if (!first) {
                    this.tokenStream.expect(Token_1.Token.PUNCTUATION_TYPE, ",", "An array element must be followed by a comma");
                    // trailing ,?
                    if (this.tokenStream.current.test(Token_1.Token.PUNCTUATION_TYPE, "]")) {
                        break;
                    }
                }
                first = false;
                node.addElement(this.parseExpression());
            }
            this.tokenStream.expect(Token_1.Token.PUNCTUATION_TYPE, "]", "An opened array is not properly closed");
            return node;
        };
        Parser.prototype.parseHashExpression = function () {
            this.tokenStream.expect(Token_1.Token.PUNCTUATION_TYPE, "{", "A hash element was expected");
            var node = new ArrayNode_1.default();
            var first = true;
            while (!this.tokenStream.current.test(Token_1.Token.PUNCTUATION_TYPE, '}')) {
                if (!first) {
                    this.tokenStream.expect(Token_1.Token.PUNCTUATION_TYPE, ",", "An array element must be followed by a comma");
                    // trailing ,?
                    if (this.tokenStream.current.test(Token_1.Token.PUNCTUATION_TYPE, "}")) {
                        break;
                    }
                }
                first = false;
                var key = null;
                // a hash key can be:
                //
                //  * a number -- 12
                //  * a string -- 'a'
                //  * a name, which is equivalent to a string -- a
                //  * an expression, which must be enclosed in parentheses -- (1 + 2)
                if (this.tokenStream.current.test(Token_1.Token.STRING_TYPE)
                    || this.tokenStream.current.test(Token_1.Token.NAME_TYPE)
                    || this.tokenStream.current.test(Token_1.Token.NUMBER_TYPE)) {
                    key = new ConstantNode_1.default(this.tokenStream.current.value);
                    this.tokenStream.next();
                }
                else if (this.tokenStream.current.test(Token_1.Token.PUNCTUATION_TYPE, "(")) {
                    key = this.parseExpression();
                }
                else {
                    var current = this.tokenStream.current;
                    throw new SyntaxError_1.default("A hash key must be a quoted string, a number, a name, or an expression enclosed in parentheses (unexpected token \"".concat(current.type, "\" of value \"").concat(current.value, "\""), current.cursor, this.tokenStream.expression);
                }
                this.tokenStream.expect(Token_1.Token.PUNCTUATION_TYPE, ":", "A hash key must be followed by a colon (:)");
                var value = this.parseExpression();
                node.addElement(value, key);
            }
            this.tokenStream.expect(Token_1.Token.PUNCTUATION_TYPE, "}", "An opened hash is not properly closed");
            return node;
        };
        Parser.prototype.parsePostfixExpression = function (node) {
            var token = this.tokenStream.current;
            while (Token_1.Token.PUNCTUATION_TYPE === token.type) {
                if ('.' === token.value) {
                    this.tokenStream.next();
                    token = this.tokenStream.current;
                    this.tokenStream.next();
                    if (Token_1.Token.NAME_TYPE !== token.type &&
                        // Operators like "not" and "matches" are valid method or property names,
                        //
                        // In other words, besides NAME_TYPE, OPERATOR_TYPE could also be parsed as a property or method.
                        // This is because operators are processed by the lexer prior to names. So "not" in "foo.not()" or "matches" in "foo.matches" will be recognized as an operator first.
                        // But in fact, "not" and "matches" in such expressions shall be parsed as method or property names.
                        //
                        // And this ONLY works if the operator consists of valid characters for a property or method name.
                        //
                        // Other types, such as STRING_TYPE and NUMBER_TYPE, can't be parsed as property nor method names.
                        //
                        // As a result, if $token is NOT an operator OR $token->value is NOT a valid property or method name, an exception shall be thrown.
                        (Token_1.Token.OPERATOR_TYPE !== token.type || !/[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/.test(token.value))) {
                        throw new SyntaxError_1.default('Expected name', token.cursor, this.tokenStream.expression);
                    }
                    var arg = new ConstantNode_1.default(token.value, true);
                    var _arguments = new ArgumentsNode_1.default();
                    var type = null;
                    if (this.tokenStream.current.test(Token_1.Token.PUNCTUATION_TYPE, "(")) {
                        type = GetAttrNode_1.default.METHOD_CALL;
                        for (var _i = 0, _a = Object.values(this.parseArguments().nodes); _i < _a.length; _i++) {
                            var n = _a[_i];
                            _arguments.addElement(n);
                        }
                    }
                    else {
                        type = GetAttrNode_1.default.PROPERTY_CALL;
                    }
                    node = new GetAttrNode_1.default(node, arg, _arguments, type);
                }
                else if ('[' === token.value) {
                    this.tokenStream.next();
                    var arg = this.parseExpression();
                    this.tokenStream.expect(Token_1.Token.PUNCTUATION_TYPE, "]");
                    node = new GetAttrNode_1.default(node, arg, new ArgumentsNode_1.default(), GetAttrNode_1.default.ARRAY_CALL);
                }
                else {
                    break;
                }
                token = this.tokenStream.current;
            }
            return node;
        };
        Parser.prototype.parseArguments = function () {
            var args = [];
            this.tokenStream.expect(Token_1.Token.PUNCTUATION_TYPE, "(", "A list of arguments must begin with an opening parenthesis");
            while (!this.tokenStream.current.test(Token_1.Token.PUNCTUATION_TYPE, ")")) {
                if (args.length !== 0) {
                    this.tokenStream.expect(Token_1.Token.PUNCTUATION_TYPE, ",", "Arguments must be separated by a comma");
                }
                args.push(this.parseExpression());
            }
            this.tokenStream.expect(Token_1.Token.PUNCTUATION_TYPE, ")", "A list of arguments must be closed by a parenthesis");
            return new Node_1.default(args);
        };
        return Parser;
    }());
    exports.default = Parser;
});
