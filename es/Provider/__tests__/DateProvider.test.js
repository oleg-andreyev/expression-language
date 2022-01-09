define(["require", "exports", "../../ExpressionLanguage", "../DateProvider", "locutus/php/datetime/date", "locutus/php/datetime/strtotime"], function (require, exports, ExpressionLanguage_1, DateProvider_1, date_1, strtotime_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    test('date evaluate', function () {
        var el = new ExpressionLanguage_1.default(null, [new DateProvider_1.default()]);
        var result = el.evaluate('date("Y-m-d")');
        expect(result).toBe((0, date_1.default)("Y-m-d"));
    });
    test('strtotime evaluate', function () {
        var el = new ExpressionLanguage_1.default(null, [new DateProvider_1.default()]);
        var result = el.evaluate('strtotime("yesterday")');
        expect(result).toBe((0, strtotime_1.default)("yesterday"));
    });
});
