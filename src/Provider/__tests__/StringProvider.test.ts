import ExpressionLanguage from "../../ExpressionLanguage";
import StringProvider from "../StringProvider";

test('strtolower evaluate', () => {
    const el = new ExpressionLanguage(null, [new StringProvider()]);
    const result = el.evaluate('strtolower("TESTING")');
    expect(result).toBe("testing");
});

test('strtolower compile', () => {
    const el = new ExpressionLanguage(null, [new StringProvider()]);
    const result = el.compile('strtolower("TESTING")');
    expect(result).toBe('strtolower("TESTING")');
});

test('strtoupper evaluate', () => {
    const el = new ExpressionLanguage(null, [new StringProvider()]);
    const result = el.evaluate('strtoupper("testing")');
    expect(result).toBe("TESTING");
});

test('explode evaluate', () => {
    const el = new ExpressionLanguage(null, [new StringProvider()]);
    const result = el.evaluate('explode(" ", "check this out")');
    expect(result).toMatchObject(["check", "this", "out"]);
});

test('explode evaluate with complex string', () => {
    const el = new ExpressionLanguage(null, [new StringProvider()]);
    const result = el.evaluate('explode(" .*&3 ", "check .*&3 this .*&3 out")');
    expect(result).toMatchObject(["check", "this", "out"]);

    const result2 = el.evaluate('explode(" .*&3 ", "check  .*&3  this  .*&3  out")');
    expect(result2).toMatchObject(["check ", " this ", " out"]);
});

test('explode compile', () => {
    const el = new ExpressionLanguage(null, [new StringProvider()]);
    const result = el.compile('explode(". ", "check this out")');
    expect(result).toBe('explode(". ", "check this out", null)');
});

test('strlen evaluate', () => {
    const el = new ExpressionLanguage(null, [new StringProvider()]);
    const result = el.evaluate('strlen("Hats are cool")');
    expect(result).toBe(13);
});

test('substr evaluate', () => {
    const el = new ExpressionLanguage(null, [new StringProvider()]);
    const result = el.evaluate('substr("Hats are cool", 0, 3)');
    expect(result).toBe('Hat');
});

test('stristr evaluate', () => {
    const el = new ExpressionLanguage(null, [new StringProvider()]);
    const result = el.evaluate('stristr("Hats are cool", "Are")');
    expect(result).toBe('are cool');
});

test('strstr evaluate', () => {
    const el = new ExpressionLanguage(null, [new StringProvider()]);
    const result = el.evaluate('strstr("Hats are cool", "are")');
    expect(result).toBe('are cool');

    const result2 = el.evaluate('strstr("Hats are cool", "Are")');
    expect(result2).toBe(false);
});
