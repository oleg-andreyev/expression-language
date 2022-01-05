import Node from './Node/Node';
export default class Compiler {
    private source;
    private functions;
    constructor(functions: any);
    getFunction(name: any): any;
    /**
     * Gets the current javascript code after compilation.
     *
     * @returns {string} The javascript code
     */
    getSource(): string;
    reset(): this;
    /**
     * Compiles a node
     *
     * @param {Node} node
     * @returns {Compiler}
     */
    compile(node: Node): this;
    subcompile(node: Node): string;
    /**
     * Adds a raw string to the compiled code.
     *
     * @param {string} str The string
     * @returns {Compiler}
     */
    raw(str: string): this;
    /**
     * Adds a quoted string to the compiled code.
     * @param {string} value The string
     * @returns {Compiler}
     */
    string(value: string): this;
    /**
     * Returns a javascript representation of a given value.
     * @param {int|float|null|boolean|Object|Array|string} value The value to convert
     * @param {boolean} isIdentifier
     * @returns {Compiler}
     */
    repr(value: any, isIdentifier?: boolean): this;
}
