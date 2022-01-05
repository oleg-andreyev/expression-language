import {addcslashes} from "./lib/addcslashes";
import Node from './Node/Node';

export default class Compiler {
    private source: string;
    private functions: any;

    constructor(functions) {
        this.source = '';
        this.functions = functions;
    }

    getFunction(name) {
        return this.functions[name];
    }

    /**
     * Gets the current javascript code after compilation.
     *
     * @returns {string} The javascript code
     */
    getSource():string {
        return this.source;
    }

    reset() {
        this.source = '';

        return this;
    }

    /**
     * Compiles a node
     *
     * @param {Node} node
     * @returns {Compiler}
     */
    compile (node: Node) {
        node.compile(this);
        return this;
    }

    subcompile (node: Node) {
        const current = this.source;
        this.source = '';

        node.compile(this);

        const source = this.source;
        this.source = current;

        return source;
    }

    /**
     * Adds a raw string to the compiled code.
     *
     * @param {string} str The string
     * @returns {Compiler}
     */
    raw (str:string) {
        this.source += str;
        return this;
    }

    /**
     * Adds a quoted string to the compiled code.
     * @param {string} value The string
     * @returns {Compiler}
     */
    string (value: string) {
        this.source += '"' + addcslashes(value, "\0\t\"\$\\") + '"';
        return this;
    }

    /**
     * Returns a javascript representation of a given value.
     * @param {int|float|null|boolean|Object|Array|string} value The value to convert
     * @param {boolean} isIdentifier
     * @returns {Compiler}
     */
    repr(value: any, isIdentifier = false) {
        // Integer or Float
        if (isIdentifier) {
            this.raw(value);
        } else if (Number.isInteger(value) || (+value === value && (!isFinite(value) || !!(value % 1)))) {
            this.raw(value);
        } else if (null === value) {
            this.raw('null');
        } else if (typeof value === 'boolean') {
            this.raw(value ? 'true' : 'false');
        } else if (typeof value === 'object') {
            this.raw('{');
            let first = true;
            for (const oneKey of Object.keys(value)) {
                if (!first) {
                    this.raw(', ');
                }
                first = false;
                this.repr(oneKey);
                this.raw(':');
                this.repr(value[oneKey]);
            }
            this.raw('}');
        } else if (Array.isArray(value)) {
            this.raw('[');
            let first = true;
            for (const oneValue of value) {
                if (!first) {
                    this.raw(', ');
                }
                first = false;
                this.repr(oneValue);
            }
            this.raw(']');
        } else {
            this.string(value);
        }

        return this;
    }
}