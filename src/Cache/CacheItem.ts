export class CacheItem {
    static METADATA_EXPIRY_OFFSET = 1527506807;
    static RESERVED_CHARACTERS = ["{", "}", "(", ")", "/", "\\", "@", ":"];

    key: string;
    value: null;
    isHit: boolean;
    defaultLifetime = 0;
    expiry: number|null = null;

    private metadata = {};
    private newMetadata = {
        tags:{}
    };
    private innerItem: null;
    private poolHash: null;
    private isTaggable: boolean;

    constructor() {
        this.key = null;
        this.value = null;
        this.isHit = false;
        this.innerItem = null;
        this.poolHash = null;
        this.isTaggable = false;
    }

    getKey() {
        return this.key;
    }

    get() {
        return this.value;
    }

    set(value) {
        this.value = value;
        return this;
    }

    expiresAt(expiration) {
        if (null === expiration) {
            this.expiry = this.defaultLifetime > 0 ? ((Date.now() / 1000) + this.defaultLifetime) : null;
        } else if (expiration instanceof Date) {
            this.expiry = (expiration.getTime() / 1000);
        } else {
            throw new Error(`Expiration date must be instance of Date or be null, "${(expiration.name)}" given`)
        }

        return this;
    }

    expiresAfter(time) {
        if (null === time) {
            this.expiry = this.defaultLifetime > 0 ? ((Date.now() / 1000) + this.defaultLifetime) : null;
        } else if (Number.isInteger(time)) {
            this.expiry = ((new Date).getTime() / 1000) + time;
        } else {
            throw new Error(`Expiration date must be an integer or be null, "${(time.name)}" given`)
        }

        return this;
    }

    tag(tags) {
        if (!this.isTaggable) {
            throw new Error(`Cache item "${this.key}" comes from a non tag-aware pool: you cannot tag it.`);
        }
        if (!Array.isArray(tags)) {
            tags = [tags];
        }

        for (const tag of tags) {
            if (typeof tag !== "string") {
                throw new Error(`Cache tag must by a string, "${(typeof tag)}" given.`);
            }
            if (this.newMetadata.tags[tag]) {
                if (tag === '') {
                    throw new Error("Cache tag length must be greater than zero");
                }
            }
            this.newMetadata.tags[tag] = tag;
        }

        return this;
    }

    getMetadata() {
        return this.metadata;
    }

    static validateKey(key) {
        if (typeof key !== "string") {
            throw new Error(`Cache key must be string, "${(typeof key)}" given.`);
        }
        if ('' === key) {
            throw new Error("Cache key length must be greater than zero");
        }
        for (const reserved of CacheItem.RESERVED_CHARACTERS) {
            if (key.indexOf(reserved) >= 0) {
                throw new Error(`Cache key "${key}" contains reserved character "${reserved}".`);
            }
        }

        return key;
    }
}