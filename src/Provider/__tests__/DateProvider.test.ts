import ExpressionLanguage from "../../ExpressionLanguage";
import DateProvider from "../DateProvider";
import date from "locutus/php/datetime/date";
import strtotime from "locutus/php/datetime/strtotime";

test('date evaluate', () => {
    const el = new ExpressionLanguage(null, [new DateProvider()]);
    const result = el.evaluate('date("Y-m-d")');
    expect(result).toBe(date("Y-m-d"));
});

test('strtotime evaluate', () => {
    const el = new ExpressionLanguage(null, [new DateProvider()]);
    const result = el.evaluate('strtotime("yesterday")');
    expect(result).toBe(strtotime("yesterday"));
});
