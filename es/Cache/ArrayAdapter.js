(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./CacheItem"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CacheItem_1 = require("./CacheItem");
    var ArrayAdapter = /** @class */ (function () {
        function ArrayAdapter(defaultLifetime) {
            if (defaultLifetime === void 0) { defaultLifetime = 0; }
            this.defaultLifetime = defaultLifetime;
            this.values = {};
            this.expiries = {};
        }
        ArrayAdapter.prototype.createCacheItem = function (key, value, isHit) {
            var item = new CacheItem_1.CacheItem();
            item.key = key;
            item.value = value;
            item.isHit = isHit;
            item.defaultLifetime = this.defaultLifetime;
            return item;
        };
        ArrayAdapter.prototype.get = function (key, callback, beta, metadata) {
            if (beta === void 0) { beta = null; }
            if (metadata === void 0) { metadata = null; }
            var item = this.getItem(key);
            if (!item.isHit) {
                var save = true;
                this.save(item.set(callback(item, save)));
            }
            return item.get();
        };
        ArrayAdapter.prototype.getItem = function (key) {
            var isHit = this.hasItem(key);
            var value = null;
            if (!isHit) {
                this.values[key] = null;
            }
            else {
                value = this.values[key];
            }
            return this.createCacheItem(key, value, isHit);
        };
        ArrayAdapter.prototype.getItems = function (keys) {
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var key = keys_1[_i];
                if (typeof key !== "string" && !this.expiries[key]) {
                    CacheItem_1.CacheItem.validateKey(key);
                }
            }
            return this.generateItems(keys, ((new Date).getTime() / 1000), this.createCacheItem);
        };
        ArrayAdapter.prototype.deleteItems = function (keys) {
            for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
                var key = keys_2[_i];
                this.deleteItem(key);
            }
            return true;
        };
        ArrayAdapter.prototype.save = function (item) {
            if (!(item instanceof CacheItem_1.CacheItem)) {
                return false;
            }
            if (item.expiry !== null && item.expiry <= ((new Date).getTime() / 1000)) {
                this.deleteItem(item.key);
                return true;
            }
            if (null === item.expiry && 0 < item.defaultLifetime) {
                item.expiry = ((new Date()).getTime() / 1000) + item.defaultLifetime;
            }
            this.values[item.key] = item.value;
            this.expiries[item.key] = item.expiry || Number.MAX_SAFE_INTEGER;
            return true;
        };
        ArrayAdapter.prototype.saveDeferred = function (item) {
            return this.save(item);
        };
        ArrayAdapter.prototype.commit = function () {
            return true;
        };
        ArrayAdapter.prototype.delete = function (key) {
            return this.deleteItem(key);
        };
        ArrayAdapter.prototype.getValues = function () {
            return this.values;
        };
        ArrayAdapter.prototype.hasItem = function (key) {
            if (typeof key === "string" && this.expiries[key] && this.expiries[key] > ((new Date).getTime() / 1000)) {
                return true;
            }
            CacheItem_1.CacheItem.validateKey(key);
            return !!this.expiries[key] && !this.deleteItem(key);
        };
        ArrayAdapter.prototype.clear = function () {
            this.values = {};
            this.expiries = {};
            return true;
        };
        ArrayAdapter.prototype.deleteItem = function (key) {
            if (typeof key !== "string" || !this.expiries[key]) {
                CacheItem_1.CacheItem.validateKey(key);
            }
            delete this.values[key];
            delete this.expiries[key];
            return true;
        };
        ArrayAdapter.prototype.reset = function () {
            this.clear();
        };
        ArrayAdapter.prototype.generateItems = function (keys, now, f) {
            var generated = [];
            for (var _i = 0, keys_3 = keys; _i < keys_3.length; _i++) {
                var key = keys_3[_i];
                var value = null;
                var isHit = !!this.expiries[key];
                if (!isHit && (this.expiries[key] > now || !this.deleteItem(key))) {
                    this.values[key] = null;
                }
                else {
                    value = this.values[key];
                }
                generated[key] = f(key, value, isHit);
            }
            return generated;
        };
        return ArrayAdapter;
    }());
    exports.default = ArrayAdapter;
});
