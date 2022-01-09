define(["require", "exports", "../ExpressionLanguage", "../ExpressionFunction"], function (require, exports, ExpressionLanguage_1, ExpressionFunction_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    test('parse throws', function () {
        var exprLang = new ExpressionLanguage_1.default();
        try {
            exprLang.parse('node.', ['node']);
        }
        catch (err) {
            expect(err.name).toBe('SyntaxError');
            expect(err.message).toBe('Unexpected end of expression around position 6 for expression `node.`.');
        }
    });
    test('short circuit evaluate', function () {
        var obj = {
            foo: function () {
                throw new Error("This method should not be called due to short circuiting.");
            }
        };
        var shortCircuits = [
            ['false && object.foo()', { object: obj }, false],
            ['false and object.foo()', { object: obj }, false],
            ['true || object.foo()', { object: obj }, true],
            ['true or object.foo()', { object: obj }, true],
        ];
        for (var _i = 0, shortCircuits_1 = shortCircuits; _i < shortCircuits_1.length; _i++) {
            var shortCircuit = shortCircuits_1[_i];
            //console.log("Testing: ", shortCircuit[0]);
            var exprLang = new ExpressionLanguage_1.default();
            expect(exprLang.evaluate(shortCircuit[0], shortCircuit[1])).toBe(shortCircuit[2]);
        }
    });
    test('short circuit compile', function () {
        var shortCircuits = [
            ['false && foo', [{ foo: 'foo' }], false],
            ['false and foo', [{ foo: 'foo' }], false],
            ['true || foo', [{ foo: 'foo' }], true],
            ['true or foo', [{ foo: 'foo' }], true],
        ];
        for (var _i = 0, shortCircuits_2 = shortCircuits; _i < shortCircuits_2.length; _i++) {
            var shortCircuit = shortCircuits_2[_i];
            var exprLang = new ExpressionLanguage_1.default();
            var compiled = exprLang.compile(shortCircuit[0], shortCircuit[1]);
            expect(eval(compiled)).toBe(shortCircuit[2]);
        }
    });
    test('caching for overridden variable names', function () {
        var expressionLanguage = new ExpressionLanguage_1.default(), expression = 'a + b';
        expressionLanguage.evaluate(expression, { a: 1, b: 1 });
        var result = expressionLanguage.compile(expression, ['a', { 'B': 'b' }]);
        expect(result).toBe("(a + B)");
    });
    test('strict equality', function () {
        var expressionLanguage = new ExpressionLanguage_1.default(), expression = '123 === a';
        var result = expressionLanguage.compile(expression, ['a']);
        expect(result).toBe("(123 === a)");
    });
    test('register after parse', function () {
        var callbacks = getRegisterCallbacks();
        for (var _i = 0, callbacks_1 = callbacks; _i < callbacks_1.length; _i++) {
            var callback = callbacks_1[_i];
            try {
                var expressionLanguage = new ExpressionLanguage_1.default();
                expressionLanguage.parse("1 + 1", []);
                callback[0](expressionLanguage);
                console.log("Shouldn't get to this point.");
                expect(true).toBe(false);
            }
            catch (err) {
                //console.log(err);
                expect(err.name).toBe('LogicException');
            }
        }
    });
    test('register after eval', function () {
        var callbacks = getRegisterCallbacks();
        for (var _i = 0, callbacks_2 = callbacks; _i < callbacks_2.length; _i++) {
            var callback = callbacks_2[_i];
            try {
                var expressionLanguage = new ExpressionLanguage_1.default();
                expressionLanguage.evaluate("1 + 1");
                callback[0](expressionLanguage);
                console.log("Shouldn't get to this point.");
                expect(true).toBe(false);
            }
            catch (err) {
                //console.log(err);
                expect(err.name).toBe('LogicException');
            }
        }
    });
    test('register after compile', function () {
        var callbacks = getRegisterCallbacks();
        for (var _i = 0, callbacks_3 = callbacks; _i < callbacks_3.length; _i++) {
            var callback = callbacks_3[_i];
            try {
                var expressionLanguage = new ExpressionLanguage_1.default();
                expressionLanguage.compile("1 + 1");
                callback[0](expressionLanguage);
                console.log("Shouldn't get to this point.");
                expect(true).toBe(false);
            }
            catch (err) {
                //console.log(err);
                expect(err.name).toBe('LogicException');
            }
        }
    });
    test('bad callable', function () {
        try {
            var expressionLanguage = new ExpressionLanguage_1.default();
            expressionLanguage.evaluate("foo.myfunction()", { foo: {} });
            console.log("Shouldn't get to this point.");
            expect(true).toBe(false);
        }
        catch (err) {
            //console.log(err);
            expect(err.toString()).toBe('Error: Method "myfunction" is undefined on object.');
        }
    });
    function getRegisterCallbacks() {
        var provider = {
            getFunctions: function () {
                return [
                    new ExpressionFunction_1.default('fn', function () {
                    }, function () {
                    })
                ];
            }
        };
        return [
            [
                function (expressionLanguage) {
                    expressionLanguage.register('fn', function () {
                    }, function () {
                    });
                }
            ],
            [
                function (expressionLanguage) {
                    expressionLanguage.addFunction(new ExpressionFunction_1.default('fn', function () {
                    }, function () {
                    }));
                }
            ],
            [
                function (expressionLanguage) {
                    expressionLanguage.registerProvider(provider);
                }
            ]
        ];
    }
    test('evaluate', function () {
        var evaluateData = getEvaluateData();
        for (var _i = 0, evaluateData_1 = evaluateData; _i < evaluateData_1.length; _i++) {
            var evaluateDatum = evaluateData_1[_i];
            var expressionLanguage = new ExpressionLanguage_1.default(), provider = evaluateDatum[3], expression = evaluateDatum[0], values = evaluateDatum[1], expectedOutcome = evaluateDatum[2];
            if (provider) {
                expressionLanguage.registerProvider(provider);
            }
            var result = expressionLanguage.evaluate(expression, values);
            if (expectedOutcome !== null && typeof expectedOutcome === "object") {
                expect(result).toMatchObject(expectedOutcome);
            }
            else {
                expect(result).toBe(expectedOutcome);
            }
        }
    });
    function getEvaluateData() {
        var _a;
        return [
            [
                // Expression
                '1 + 1',
                // Values
                {},
                // Expected Outcome
                2,
                // Provider
                null
            ],
            [
                // Expression
                '2 ** 3',
                // Values
                {},
                // Expected Outcome
                8,
                // Provider
                null
            ],
            [
                // Expression
                'a > 0',
                // Values
                { a: 1 },
                // Expected Outcome
                true,
                // Provider
                null
            ],
            [
                // Expression
                'a >= 0',
                // Values
                { a: 1 },
                // Expected Outcome
                true,
                // Provider
                null
            ],
            [
                // Expression
                'a <= 0',
                // Values
                { a: 1 },
                // Expected Outcome
                false,
                // Provider
                null
            ],
            [
                // Expression
                'a != 0',
                // Values
                { a: 1 },
                // Expected Outcome
                true,
                // Provider
                null
            ],
            [
                // Expression
                'a == 1',
                // Values
                { a: 1 },
                // Expected Outcome
                true,
                // Provider
                null
            ],
            [
                // Expression
                'a === 1',
                // Values
                { a: 1 },
                // Expected Outcome
                true,
                // Provider
                null
            ],
            [
                // Expression
                'a !== 1',
                // Values
                { a: 1 },
                // Expected Outcome
                false,
                // Provider
                null
            ],
            [
                'foo.getFirst() + bar.getSecond()',
                {
                    foo: {
                        getFirst: function () {
                            return 7;
                        }
                    },
                    bar: {
                        getSecond: function () {
                            return 100;
                        }
                    }
                },
                107,
                null
            ],
            [
                '(foo.getFirst() + bar.getSecond()) / foo.second',
                {
                    foo: {
                        second: 4,
                        getFirst: function () {
                            return 7;
                        }
                    },
                    bar: {
                        getSecond: function () {
                            return 9;
                        }
                    }
                },
                4,
                null
            ],
            [
                'foo.getFirst() + bar.getSecond() / foo.second',
                {
                    foo: {
                        second: 4,
                        getFirst: function () {
                            return 7;
                        }
                    },
                    bar: {
                        getSecond: function () {
                            return 8;
                        }
                    }
                },
                9,
                null
            ],
            [
                '(foo.getFirst() + bar.getSecond() / foo.second) + bar.first[3]',
                {
                    foo: {
                        getFirst: function () {
                            return 7;
                        },
                        second: 4
                    },
                    bar: {
                        first: [1, 2, 3, 4, 5],
                        getSecond: function () {
                            return 8;
                        }
                    }
                },
                13,
                null
            ],
            [
                'b.myMethod(a[1])',
                {
                    a: ["one", "two", "three"],
                    b: {
                        myProperty: "foo",
                        myMethod: function (word) {
                            return "bar " + word;
                        }
                    }
                },
                "bar two",
                null
            ],
            [
                'a[2] === "three" and b.myMethod(a[1]) === "bar two" and (b.myProperty == "foo" or b["myProperty"] == "foo") and b["property with spaces and &*()*%$##@% characters"] == "fun"',
                {
                    a: ["one", "two", "three"],
                    b: (_a = {
                            myProperty: "foo",
                            myMethod: function (word) {
                                return "bar " + word;
                            }
                        },
                        _a["property with spaces and &*()*%$##@% characters"] = 'fun',
                        _a)
                },
                true,
                null
            ],
            [
                'a and !b',
                {
                    a: true,
                    b: false
                },
                true,
                null
            ],
            [
                'a in b',
                {
                    a: "Dogs",
                    b: ["Cats", "Dogs"]
                },
                true,
                null
            ],
            [
                'a in outputs["typesOfAnimalsAllowed"]',
                {
                    a: "Dogs",
                    outputs: {
                        typesOfAnimalsAllowed: ["Dogs", "Other"]
                    }
                },
                true,
                null
            ],
            [
                '"Other" in inputs["typesOfAnimalsAllowed"]',
                {
                    inputs: {
                        typesOfAnimalsAllowed: ["Dogs", "Other"]
                    }
                },
                true
            ],
            [
                'a not in b',
                {
                    a: "Dogs",
                    b: ["Cats", "Bags"]
                },
                true,
                null
            ]
        ];
    }
});
