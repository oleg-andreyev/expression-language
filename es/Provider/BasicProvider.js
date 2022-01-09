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
define(["require", "exports", "../ExpressionFunction", "./AbstractProvider"], function (require, exports, ExpressionFunction_1, AbstractProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.issetFn = void 0;
    var ArrayProvider = /** @class */ (function (_super) {
        __extends(ArrayProvider, _super);
        function ArrayProvider() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ArrayProvider.prototype.getFunctions = function () {
            return [
                exports.issetFn
            ];
        };
        return ArrayProvider;
    }(AbstractProvider_1.default));
    exports.default = ArrayProvider;
    exports.issetFn = new ExpressionFunction_1.default('isset', function compiler(variable) {
        return "isset(".concat(variable, ")");
    }, function evaluator(values, variable) {
        var baseName = "", parts = [], gathering = "", gathered = "";
        for (var i = 0; i < variable.length; i++) {
            var char = variable[i];
            if (char === "]") {
                gathering = "";
                parts.push({ type: 'array', index: gathered.replace(/"/g, "").replace(/'/g, "") });
                gathered = "";
                continue;
            }
            if (char === "[") {
                gathering = "array";
                gathered = "";
                continue;
            }
            if (gathering === "object" && (!/[A-z0-9_]/.test(char) || i === variable.length - 1)) {
                var lastChar = false;
                if (i === variable.length - 1) {
                    gathered += char;
                    lastChar = true;
                }
                gathering = "";
                parts.push({ type: 'object', attribute: gathered });
                gathered = "";
                if (lastChar) {
                    continue;
                }
            }
            if (char === ".") {
                gathering = "object";
                gathered = "";
                continue;
            }
            if (gathering) {
                gathered += char;
            }
            else {
                baseName += char;
            }
        }
        if (parts.length > 0) {
            //console.log("Parts: ", parts);
            if (values[baseName] !== undefined) {
                var baseVar = values[baseName];
                for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
                    var part = parts_1[_i];
                    if (part.type === "array") {
                        if (baseVar[part.index] === undefined) {
                            return false;
                        }
                        baseVar = baseVar[part.index];
                    }
                    if (part.type === "object") {
                        if (baseVar[part.attribute] === undefined) {
                            return false;
                        }
                        baseVar = baseVar[part.attribute];
                    }
                }
                return true;
            }
            return false;
        }
        else {
            return values[baseName] !== undefined;
        }
    });
});
