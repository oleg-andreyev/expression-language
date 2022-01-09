define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CacheItem = void 0;
    var CacheItem = /** @class */ (function () {
        function CacheItem() {
            this.defaultLifetime = 0;
            this.expiry = null;
            this.metadata = {};
            this.newMetadata = {
                tags: {}
            };
            this.key = null;
            this.value = null;
            this.isHit = false;
            this.innerItem = null;
            this.poolHash = null;
            this.isTaggable = false;
        }
        CacheItem.prototype.getKey = function () {
            return this.key;
        };
        CacheItem.prototype.get = function () {
            return this.value;
        };
        CacheItem.prototype.set = function (value) {
            this.value = value;
            return this;
        };
        CacheItem.prototype.expiresAt = function (expiration) {
            if (null === expiration) {
                this.expiry = this.defaultLifetime > 0 ? ((Date.now() / 1000) + this.defaultLifetime) : null;
            }
            else if (expiration instanceof Date) {
                this.expiry = (expiration.getTime() / 1000);
            }
            else {
                throw new Error("Expiration date must be instance of Date or be null, \"".concat((expiration.name), "\" given"));
            }
            return this;
        };
        CacheItem.prototype.expiresAfter = function (time) {
            if (null === time) {
                this.expiry = this.defaultLifetime > 0 ? ((Date.now() / 1000) + this.defaultLifetime) : null;
            }
            else if (Number.isInteger(time)) {
                this.expiry = ((new Date).getTime() / 1000) + time;
            }
            else {
                throw new Error("Expiration date must be an integer or be null, \"".concat((time.name), "\" given"));
            }
            return this;
        };
        CacheItem.prototype.tag = function (tags) {
            if (!this.isTaggable) {
                throw new Error("Cache item \"".concat(this.key, "\" comes from a non tag-aware pool: you cannot tag it."));
            }
            if (!Array.isArray(tags)) {
                tags = [tags];
            }
            for (var _i = 0, tags_1 = tags; _i < tags_1.length; _i++) {
                var tag = tags_1[_i];
                if (typeof tag !== "string") {
                    throw new Error("Cache tag must by a string, \"".concat((typeof tag), "\" given."));
                }
                if (this.newMetadata.tags[tag]) {
                    if (tag === '') {
                        throw new Error("Cache tag length must be greater than zero");
                    }
                }
                this.newMetadata.tags[tag] = tag;
            }
            return this;
        };
        CacheItem.prototype.getMetadata = function () {
            return this.metadata;
        };
        CacheItem.validateKey = function (key) {
            if (typeof key !== "string") {
                throw new Error("Cache key must be string, \"".concat((typeof key), "\" given."));
            }
            if ('' === key) {
                throw new Error("Cache key length must be greater than zero");
            }
            for (var _i = 0, _a = CacheItem.RESERVED_CHARACTERS; _i < _a.length; _i++) {
                var reserved = _a[_i];
                if (key.indexOf(reserved) >= 0) {
                    throw new Error("Cache key \"".concat(key, "\" contains reserved character \"").concat(reserved, "\"."));
                }
            }
            return key;
        };
        CacheItem.METADATA_EXPIRY_OFFSET = 1527506807;
        CacheItem.RESERVED_CHARACTERS = ["{", "}", "(", ")", "/", "\\", "@", ":"];
        return CacheItem;
    }());
    exports.CacheItem = CacheItem;
});
