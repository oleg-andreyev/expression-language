var AbstractProvider = /** @class */ (function () {
    function AbstractProvider() {
    }
    AbstractProvider.prototype.getFunctions = function () {
        throw new Error("getFunctions must be implemented by " + this);
    };
    return AbstractProvider;
}());
export default AbstractProvider;
