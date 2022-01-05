"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var addcslashes_1 = require("./lib/addcslashes");
var Compiler = /** @class */ (function () {
    function Compiler(functions) {
        this.source = '';
        this.functions = functions;
    }
    Compiler.prototype.getFunction = function (name) {
        return this.functions[name];
    };
    /**
     * Gets the current javascript code after compilation.
     *
     * @returns {string} The javascript code
     */
    Compiler.prototype.getSource = function () {
        return this.source;
    };
    Compiler.prototype.reset = function () {
        this.source = '';
        return this;
    };
    /**
     * Compiles a node
     *
     * @param {Node} node
     * @returns {Compiler}
     */
    Compiler.prototype.compile = function (node) {
        node.compile(this);
        return this;
    };
    Compiler.prototype.subcompile = function (node) {
        var current = this.source;
        this.source = '';
        node.compile(this);
        var source = this.source;
        this.source = current;
        return source;
    };
    /**
     * Adds a raw string to the compiled code.
     *
     * @param {string} str The string
     * @returns {Compiler}
     */
    Compiler.prototype.raw = function (str) {
        this.source += str;
        return this;
    };
    /**
     * Adds a quoted string to the compiled code.
     * @param {string} value The string
     * @returns {Compiler}
     */
    Compiler.prototype.string = function (value) {
        this.source += '"' + (0, addcslashes_1.addcslashes)(value, "\0\t\"\$\\") + '"';
        return this;
    };
    /**
     * Returns a javascript representation of a given value.
     * @param {int|float|null|boolean|Object|Array|string} value The value to convert
     * @param {boolean} isIdentifier
     * @returns {Compiler}
     */
    Compiler.prototype.repr = function (value, isIdentifier) {
        if (isIdentifier === void 0) { isIdentifier = false; }
        // Integer or Float
        if (isIdentifier) {
            this.raw(value);
        }
        else if (Number.isInteger(value) || (+value === value && (!isFinite(value) || !!(value % 1)))) {
            this.raw(value);
        }
        else if (null === value) {
            this.raw('null');
        }
        else if (typeof value === 'boolean') {
            this.raw(value ? 'true' : 'false');
        }
        else if (typeof value === 'object') {
            this.raw('{');
            var first = true;
            for (var _i = 0, _a = Object.keys(value); _i < _a.length; _i++) {
                var oneKey = _a[_i];
                if (!first) {
                    this.raw(', ');
                }
                first = false;
                this.repr(oneKey);
                this.raw(':');
                this.repr(value[oneKey]);
            }
            this.raw('}');
        }
        else if (Array.isArray(value)) {
            this.raw('[');
            var first = true;
            for (var _b = 0, value_1 = value; _b < value_1.length; _b++) {
                var oneValue = value_1[_b];
                if (!first) {
                    this.raw(', ');
                }
                first = false;
                this.repr(oneValue);
            }
            this.raw(']');
        }
        else {
            this.string(value);
        }
        return this;
    };
    return Compiler;
}());
exports.default = Compiler;
