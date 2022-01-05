import ExpressionLanguage from "../../ExpressionLanguage";
import ArrayProvider from "../ArrayProvider";
test('implode evaluate', function () {
    var el = new ExpressionLanguage(null, [new ArrayProvider()]);
    var result = el.evaluate('implode(". ", ["check", "this", "out"])');
    expect(result).toBe("check. this. out");
});
test('implode compile', function () {
    var el = new ExpressionLanguage(null, [new ArrayProvider()]);
    var result = el.compile('implode(". ", ["check", "this", "out"])');
    expect(result).toBe('implode(". ", ["check", "this", "out"])');
});
test('count evaluate', function () {
    var el = new ExpressionLanguage(null, [new ArrayProvider()]);
    var result = el.evaluate('count(["1", "2", "3"])');
    expect(result).toBe(3);
    var result2 = el.evaluate('count(["1", "2", "3", ["4", "5"]], "COUNT_RECURSIVE")');
    expect(result2).toBe(6); // Counts array as one, then contents individually
});
test('count compile', function () {
    var el = new ExpressionLanguage(null, [new ArrayProvider()]);
    var result = el.compile('count(["1", "2", "3"])');
    expect(result).toBe('count(["1", "2", "3"])');
    var result2 = el.compile('count(["1", "2", "3"], "COUNT_RECURSIVE")');
    expect(result2).toBe('count(["1", "2", "3"], "COUNT_RECURSIVE")');
});
test('array_intersect evaluate', function () {
    var el = new ExpressionLanguage(null, [new ArrayProvider()]);
    var result = el.evaluate('array_intersect(["1", "2", "3"], ["1", "2", "3"], ["2", "3"])');
    expect(result).toMatchObject(["2", "3"]);
});
test('array_intersect compile', function () {
    var el = new ExpressionLanguage(null, [new ArrayProvider()]);
    var result = el.compile('array_intersect(["1", "2", "3"], ["1", "2", "3"], ["2", "3"])');
    expect(result).toBe('array_intersect(["1", "2", "3"], ["1", "2", "3"], ["2", "3"])');
});
