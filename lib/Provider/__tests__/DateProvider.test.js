"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ExpressionLanguage_1 = require("../../ExpressionLanguage");
var DateProvider_1 = require("../DateProvider");
var date_1 = require("locutus/php/datetime/date");
var strtotime_1 = require("locutus/php/datetime/strtotime");
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
