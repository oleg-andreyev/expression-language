var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import ExpressionFunction from "../ExpressionFunction";
import AbstractProvider from "./AbstractProvider";
import array_intersect from "locutus/php/array/array_intersect";
import count from "locutus/php/array/count";
import implode from "locutus/php/strings/implode";
var ArrayProvider = /** @class */ (function (_super) {
    __extends(ArrayProvider, _super);
    function ArrayProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ArrayProvider.prototype.getFunctions = function () {
        return [
            implodeFn,
            countFn,
            arrayIntersectFn
        ];
    };
    return ArrayProvider;
}(AbstractProvider));
export default ArrayProvider;
export var implodeFn = new ExpressionFunction('implode', function compiler(glue, pieces) {
    //console.log("compile implode: ", pieces, glue, typeof pieces);
    return "implode(".concat(glue, ", ").concat(pieces, ")");
}, function evaluator(values, glue, pieces) {
    return implode(glue, pieces);
});
export var countFn = new ExpressionFunction('count', function compiler(mixedVar, mode) {
    var remaining = '';
    if (mode) {
        remaining = ", ".concat(mode);
    }
    return "count(".concat(mixedVar).concat(remaining, ")");
}, function evaluator(values, mixedVar, mode) {
    return count(mixedVar, mode);
});
export var arrayIntersectFn = new ExpressionFunction('array_intersect', function compiler(arr1) {
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
    var remaining = '';
    if (rest.length > 0) {
        remaining = ", " + rest.join(", ");
    }
    return "array_intersect(".concat(arr1).concat(remaining, ")");
}, function evaluator(values) {
    var newArgs = [], allArrays = true;
    for (var i = 1; i < arguments.length; i++) {
        newArgs.push(arguments[i]);
        if (!Array.isArray(arguments[i])) {
            allArrays = false;
        }
    }
    var res = array_intersect.apply(null, newArgs);
    if (allArrays) {
        return Object.values(res);
    }
    return res;
});
