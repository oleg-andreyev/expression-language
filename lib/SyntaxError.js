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
import { getEditDistance } from "./lib/Levenshtein";
var SyntaxError = /** @class */ (function (_super) {
    __extends(SyntaxError, _super);
    function SyntaxError(message, cursor, expression, subject, proposals) {
        if (subject === void 0) { subject = undefined; }
        if (proposals === void 0) { proposals = undefined; }
        var _this = this;
        message = "".concat(message, " around position ").concat(cursor);
        if (expression) {
            message = message + " for expression `".concat(expression, "`");
        }
        message += ".";
        _this = _super.call(this, message) || this;
        _this.name = "SyntaxError";
        _this.subject = subject;
        _this.proposals = proposals;
        return _this;
    }
    SyntaxError.prototype.toString = function () {
        var message = this.message;
        if (this.subject && this.proposals) {
            var minScore = Number.MAX_SAFE_INTEGER, guess = null;
            for (var _i = 0, _a = this.proposals; _i < _a.length; _i++) {
                var proposal = _a[_i];
                var distance = getEditDistance(this.subject, proposal);
                if (distance < minScore) {
                    guess = proposal;
                    minScore = distance;
                }
            }
            if (guess !== null && minScore < 3) {
                message += " Did you mean \"".concat(guess, "\"?");
            }
        }
        return message;
    };
    return SyntaxError;
}(Error));
export default SyntaxError;
