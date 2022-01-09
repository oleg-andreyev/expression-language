import { DateTime } from "luxon";
export var isString = function (s) {
    return typeof s === "string";
};
export var strLen = function (s) {
    if (isString(s)) {
        return s.length;
    }
    return 0;
};
export var isEmail = function (s) {
    if (isString(s)) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
    }
    return false;
};
export var isPhone = function (s) {
    if (isString(s)) {
        if (s.substring(0, 2) === "+1") {
            s = s.substring(2);
        }
        return /^\d{10}$/.test(s.replace(/\D/g, ""));
    }
    return false;
};
export var isNull = function (s) {
    return s === null;
};
export var isCurrency = function (s) {
    return /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/.test(s);
};
export var now = function () {
    return DateTime.now();
};
export var dateFormat = function (m, format) {
    return m.format(format);
};
export var year = function (m) {
    return dateFormat(m, "YYYY");
};
export var date = function (m) {
    return dateFormat(m, "YYYY-MM-DD");
};
export var string = function (s) {
    if (s.toString !== undefined) {
        return s.toString();
    }
    return "";
};
export var int = function (s) {
    return parseInt(s);
};
var defaultCustomFunctions = {
    isString: isString,
    strLen: strLen,
    isEmail: isEmail,
    isPhone: isPhone,
    isNull: isNull,
    isCurrency: isCurrency,
    now: now,
    dateFormat: dateFormat,
    year: year,
    date: date,
    string: string,
    int: int
};
export default defaultCustomFunctions;
