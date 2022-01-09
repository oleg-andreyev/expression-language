define(["require", "exports", "luxon"], function (require, exports, luxon_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.int = exports.string = exports.date = exports.year = exports.dateFormat = exports.now = exports.isCurrency = exports.isNull = exports.isPhone = exports.isEmail = exports.strLen = exports.isString = void 0;
    var isString = function (s) {
        return typeof s === "string";
    };
    exports.isString = isString;
    var strLen = function (s) {
        if ((0, exports.isString)(s)) {
            return s.length;
        }
        return 0;
    };
    exports.strLen = strLen;
    var isEmail = function (s) {
        if ((0, exports.isString)(s)) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
        }
        return false;
    };
    exports.isEmail = isEmail;
    var isPhone = function (s) {
        if ((0, exports.isString)(s)) {
            if (s.substring(0, 2) === "+1") {
                s = s.substring(2);
            }
            return /^\d{10}$/.test(s.replace(/\D/g, ""));
        }
        return false;
    };
    exports.isPhone = isPhone;
    var isNull = function (s) {
        return s === null;
    };
    exports.isNull = isNull;
    var isCurrency = function (s) {
        return /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/.test(s);
    };
    exports.isCurrency = isCurrency;
    var now = function () {
        return luxon_1.DateTime.now();
    };
    exports.now = now;
    var dateFormat = function (m, format) {
        return m.format(format);
    };
    exports.dateFormat = dateFormat;
    var year = function (m) {
        return (0, exports.dateFormat)(m, "YYYY");
    };
    exports.year = year;
    var date = function (m) {
        return (0, exports.dateFormat)(m, "YYYY-MM-DD");
    };
    exports.date = date;
    var string = function (s) {
        if (s.toString !== undefined) {
            return s.toString();
        }
        return "";
    };
    exports.string = string;
    var int = function (s) {
        return parseInt(s);
    };
    exports.int = int;
    var defaultCustomFunctions = {
        isString: exports.isString,
        strLen: exports.strLen,
        isEmail: exports.isEmail,
        isPhone: exports.isPhone,
        isNull: exports.isNull,
        isCurrency: exports.isCurrency,
        now: exports.now,
        dateFormat: exports.dateFormat,
        year: exports.year,
        date: exports.date,
        string: exports.string,
        int: exports.int
    };
    exports.default = defaultCustomFunctions;
});
