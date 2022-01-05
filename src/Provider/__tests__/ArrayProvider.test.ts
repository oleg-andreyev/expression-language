import ExpressionLanguage from "../../ExpressionLanguage";
import ArrayProvider from "../ArrayProvider";

test('implode evaluate', () => {
    const el = new ExpressionLanguage(null, [new ArrayProvider()]);
    const result = el.evaluate('implode(". ", ["check", "this", "out"])');
    expect(result).toBe("check. this. out");
});

test('implode compile', () => {
    const el = new ExpressionLanguage(null, [new ArrayProvider()]);
    const result = el.compile('implode(". ", ["check", "this", "out"])');
    expect(result).toBe('implode(". ", ["check", "this", "out"])');
});

test('count evaluate', () => {
    const el = new ExpressionLanguage(null, [new ArrayProvider()]);
    const result = el.evaluate('count(["1", "2", "3"])');
    expect(result).toBe(3);

    const result2 = el.evaluate('count(["1", "2", "3", ["4", "5"]], "COUNT_RECURSIVE")');
    expect(result2).toBe(6); // Counts array as one, then contents individually
});

test('count compile', () => {
    const el = new ExpressionLanguage(null, [new ArrayProvider()]);
    const result = el.compile('count(["1", "2", "3"])');
    expect(result).toBe('count(["1", "2", "3"])');

    const result2 = el.compile('count(["1", "2", "3"], "COUNT_RECURSIVE")');
    expect(result2).toBe('count(["1", "2", "3"], "COUNT_RECURSIVE")');
});

test('array_intersect evaluate', () => {
    const el = new ExpressionLanguage(null, [new ArrayProvider()]);
    const result = el.evaluate('array_intersect(["1", "2", "3"], ["1", "2", "3"], ["2", "3"])');
    expect(result).toMatchObject(["2", "3"]);
});

test('array_intersect compile', () => {
    const el = new ExpressionLanguage(null, [new ArrayProvider()]);
    const result = el.compile('array_intersect(["1", "2", "3"], ["1", "2", "3"], ["2", "3"])');
    expect(result).toBe('array_intersect(["1", "2", "3"], ["1", "2", "3"], ["2", "3"])');
});
