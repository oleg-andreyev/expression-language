import ExpressionLanguage from "../ExpressionLanguage";
import ExpressionFunction from "../ExpressionFunction";

test('parse throws', () => {
    const exprLang = new ExpressionLanguage();

    try {
        exprLang.parse('node.', ['node']);
    } catch (err) {
        expect(err.name).toBe('SyntaxError');
        expect(err.message).toBe('Unexpected end of expression around position 6 for expression `node.`.');
    }
});

test('short circuit evaluate', () => {
    const obj = {
        foo: () => {
            throw new Error("This method should not be called due to short circuiting.");
        }
    };

    const shortCircuits = [
        ['false && object.foo()', {object: obj}, false],
        ['false and object.foo()', {object: obj}, false],
        ['true || object.foo()', {object: obj}, true],
        ['true or object.foo()', {object: obj}, true],
    ];

    for (const shortCircuit of shortCircuits) {
        //console.log("Testing: ", shortCircuit[0]);
        const exprLang = new ExpressionLanguage();
        expect(exprLang.evaluate(shortCircuit[0], shortCircuit[1])).toBe(shortCircuit[2]);
    }
});

test('short circuit compile', () => {
    const shortCircuits = [
        ['false && foo', [{foo: 'foo'}], false],
        ['false and foo', [{foo: 'foo'}], false],
        ['true || foo', [{foo: 'foo'}], true],
        ['true or foo', [{foo: 'foo'}], true],
    ];

    for (const shortCircuit of shortCircuits) {
        const exprLang = new ExpressionLanguage();
        const compiled = exprLang.compile(shortCircuit[0], shortCircuit[1]);
        expect(eval(compiled)).toBe(shortCircuit[2]);
    }
});

test('caching for overridden variable names', () => {
    const expressionLanguage = new ExpressionLanguage(),
        expression = 'a + b';

    expressionLanguage.evaluate(expression, {a: 1, b: 1});
    const result = expressionLanguage.compile(expression, ['a', {'B': 'b'}])
    expect(result).toBe("(a + B)");
});

test('strict equality', () => {
    const expressionLanguage = new ExpressionLanguage(),
        expression = '123 === a';

    const result = expressionLanguage.compile(expression, ['a']);
    expect(result).toBe("(123 === a)");
});

test('register after parse', () => {
    const callbacks = getRegisterCallbacks();

    for (const callback of callbacks) {
        try {
            const expressionLanguage = new ExpressionLanguage();
            expressionLanguage.parse("1 + 1", []);
            callback[0](expressionLanguage);
            console.log("Shouldn't get to this point.");
            expect(true).toBe(false);
        } catch (err) {
            //console.log(err);
            expect(err.name).toBe('LogicException');
        }
    }
});

test('register after eval', () => {
    const callbacks = getRegisterCallbacks();

    for (const callback of callbacks) {
        try {
            const expressionLanguage = new ExpressionLanguage();
            expressionLanguage.evaluate("1 + 1");
            callback[0](expressionLanguage);
            console.log("Shouldn't get to this point.");
            expect(true).toBe(false);
        } catch (err) {
            //console.log(err);
            expect(err.name).toBe('LogicException');
        }
    }
});

test('register after compile', () => {
    const callbacks = getRegisterCallbacks();

    for (const callback of callbacks) {
        try {
            const expressionLanguage = new ExpressionLanguage();
            expressionLanguage.compile("1 + 1");
            callback[0](expressionLanguage);
            console.log("Shouldn't get to this point.");
            expect(true).toBe(false);
        } catch (err) {
            //console.log(err);
            expect(err.name).toBe('LogicException');
        }
    }
});

test('bad callable', () => {
    try {
        const expressionLanguage = new ExpressionLanguage();
        expressionLanguage.evaluate("foo.myfunction()", {foo: {}});
        console.log("Shouldn't get to this point.");
        expect(true).toBe(false);
    }
    catch(err) {
        //console.log(err);
        expect(err.toString()).toBe('Error: Method "myfunction" is undefined on object.');
    }
});

function getRegisterCallbacks() {
    const provider = {
        getFunctions: () => {
            return [
                new ExpressionFunction('fn', () => {
                }, () => {
                })
            ]
        }
    };
    return [
        [
            (expressionLanguage) => {
                expressionLanguage.register('fn', () => {
                }, () => {
                });
            }
        ],
        [
            (expressionLanguage) => {
                expressionLanguage.addFunction(new ExpressionFunction('fn', () => {
                }, () => {
                }));
            }
        ],
        [
            (expressionLanguage) => {
                expressionLanguage.registerProvider(provider);
            }
        ]
    ]
}

test('evaluate', () => {
    const evaluateData = getEvaluateData();

    for (const evaluateDatum of evaluateData) {
        const expressionLanguage = new ExpressionLanguage(),
            provider = evaluateDatum[3],
            expression = evaluateDatum[0],
            values = evaluateDatum[1],
            expectedOutcome = evaluateDatum[2];

        if (provider) {
            expressionLanguage.registerProvider(provider);
        }

        const result = expressionLanguage.evaluate(expression, values);

        if (expectedOutcome !== null && typeof expectedOutcome === "object") {
            expect(result).toMatchObject(expectedOutcome);
        }
        else {
            expect(result).toBe(expectedOutcome);
        }
    }
});

function getEvaluateData() {
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
            {a: 1},
            // Expected Outcome
            true,
            // Provider
            null
        ],
        [
            // Expression
            'a >= 0',
            // Values
            {a: 1},
            // Expected Outcome
            true,
            // Provider
            null
        ],
        [
            // Expression
            'a <= 0',
            // Values
            {a: 1},
            // Expected Outcome
            false,
            // Provider
            null
        ],
        [
            // Expression
            'a != 0',
            // Values
            {a: 1},
            // Expected Outcome
            true,
            // Provider
            null
        ],
        [
            // Expression
            'a == 1',
            // Values
            {a: 1},
            // Expected Outcome
            true,
            // Provider
            null
        ],
        [
            // Expression
            'a === 1',
            // Values
            {a: 1},
            // Expected Outcome
            true,
            // Provider
            null
        ],
        [
            // Expression
            'a !== 1',
            // Values
            {a: 1},
            // Expected Outcome
            false,
            // Provider
            null
        ],
        [
            'foo.getFirst() + bar.getSecond()',
            {
                foo: {
                    getFirst: () => {
                        return 7;
                    }
                },
                bar: {
                    getSecond: () => {
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
                    getFirst: () => {
                        return 7;
                    }
                },
                bar: {
                    getSecond: () => {
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
                    getFirst: () => {
                        return 7;
                    }
                },
                bar: {
                    getSecond: () => {
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
                    getFirst: () => {
                        return 7;
                    },
                    second: 4
                },
                bar: {
                    first: [1,2,3,4,5],
                    getSecond: () => {
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
                    myMethod: (word) => {
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
                b: {
                    myProperty: "foo",
                    myMethod: (word) => {
                        return "bar " + word;
                    },
                    ["property with spaces and &*()*%$##@% characters"]: 'fun'
                }
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
