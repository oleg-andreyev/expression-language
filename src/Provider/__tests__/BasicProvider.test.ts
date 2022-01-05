import ExpressionLanguage from "../../ExpressionLanguage";
import BasicProvider from "../BasicProvider";

test('isset evaluate', () => {
    const el = new ExpressionLanguage(null, [new BasicProvider()]);
    const result = el.evaluate("isset(\"foo['bar']\")", {foo: {bar: 'yep'}});
    expect(result).toBe(true);

    const result2 = el.evaluate('isset(\'foo["bar"]\')', {foo: {bar: 'yep'}});
    expect(result2).toBe(true);
});

test('isset short circuit', () => {
    const el = new ExpressionLanguage(null, [new BasicProvider()]);
    const result = el.evaluate("isset(\"foo['bar']\") or foo['baz'] == 'yep'", {foo: {bar: 'yep'}});
    expect(result).toBe(true);

    const result2 = el.evaluate("isset(\"foo['bar']\") and foo['bar'] == 'yep'", {foo: {baz: 'yep'}});
    expect(result2).toBe(false);
});

test('isset deep resolution', () => {
    const el = new ExpressionLanguage(null, [new BasicProvider()]);
    const result = el.evaluate("isset(\"foo['bar']['buzz']\") and foo['bar']['buzz'] == 'yep'", {foo: {bar: {buzz: 'yep'}}});
    expect(result).toBe(true);

    const result2 = el.evaluate("isset(\"foo['bar']['buzz']\") and foo['bar']['buzz'] == 'yeppers'", {foo: {bar: {buzz: 'yep'}}});
    expect(result2).toBe(false);
});

test('isset array resolution', () => {
    const el = new ExpressionLanguage(null, [new BasicProvider()]);
    const result = el.evaluate("isset(\"foo[0]['buzz']\") and foo[0]['buzz'] == 'yep'", {foo: [{buzz: 'yep'}]});
    expect(result).toBe(true);
});

test('isset with dot notation', () => {
    const el = new ExpressionLanguage(null, [new BasicProvider()]);
    const result = el.evaluate("isset(\"foo.bar\") and foo.bar == 'yep'", {foo: {bar: 'yep'}});
    expect(result).toBe(true);

    const result2 = el.evaluate("isset(\"foo.bar.buzz\") and foo.bar.buzz == 'yep'", {foo: {bar: {buzz: 'yep'}}});
    expect(result2).toBe(true);
});

test('isset with ! operator', () => {
    const el = new ExpressionLanguage(null, [new BasicProvider()]);
    const result = el.evaluate("!isset(\"foo.baz\") and foo.bar == 'yep'", {foo: {bar: 'yep'}});
    expect(result).toBe(true);
});

test('isset with not operator', () => {
    const el = new ExpressionLanguage(null, [new BasicProvider()]);
    const result = el.evaluate("not isset(\"foo.baz\") and foo.bar == 'yep'", {foo: {bar: 'yep'}});
    expect(result).toBe(true);
});
