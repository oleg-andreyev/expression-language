import {CacheItem} from "./CacheItem";

export default class ArrayAdapter {
    private readonly defaultLifetime: number;
    private values: {};
    private expiries: {};

    constructor(defaultLifetime = 0) {
        this.defaultLifetime = defaultLifetime;
        this.values = {};
        this.expiries = {};
    }

    createCacheItem(key, value, isHit) {
        const item = new CacheItem();
        item.key = key;
        item.value = value;
        item.isHit = isHit;
        item.defaultLifetime = this.defaultLifetime;

        return item;
    }

    get(key, callback, beta = null, metadata = null) {
        const item = this.getItem(key);
        if (!item.isHit) {
            const save = true;
            this.save(item.set(callback(item, save)));
        }
        return item.get();
    }

    getItem(key) {
        const isHit = this.hasItem(key);
        let value = null;
        if (!isHit) {
            this.values[key] = null;
        } else {
            value = this.values[key];
        }

        return this.createCacheItem(key, value, isHit);
    }

    getItems(keys) {
        for (const key of keys) {
            if (typeof key !== "string" && !this.expiries[key]) {
                CacheItem.validateKey(key);
            }
        }

        return this.generateItems(keys, ((new Date).getTime() / 1000), this.createCacheItem);
    }

    deleteItems(keys) {
        for (const key of keys) {
            this.deleteItem(key);
        }

        return true;
    }

    save(item) {
        if (!(item instanceof CacheItem)) {
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
    }

    saveDeferred(item) {
        return this.save(item);
    }

    commit() {
        return true;
    }

    delete(key) {
        return this.deleteItem(key);
    }

    getValues() {
        return this.values;
    }

    hasItem(key) {
        if (typeof key === "string" && this.expiries[key] && this.expiries[key] > ((new Date).getTime() / 1000)) {
            return true;
        }
        CacheItem.validateKey(key);

        return !!this.expiries[key] && !this.deleteItem(key);
    }

    clear() {
        this.values = {};
        this.expiries = {};
        return true;
    }

    deleteItem(key) {
        if (typeof key !== "string" || !this.expiries[key]) {
            CacheItem.validateKey(key);
        }
        delete this.values[key];
        delete this.expiries[key];

        return true;
    }

    reset() {
        this.clear();
    }

    generateItems(keys, now, f) {
        const generated = [];
        for (const key of keys) {
            let value = null;
            const isHit = !!this.expiries[key];
            if (!isHit && (this.expiries[key] > now || !this.deleteItem(key))) {
                this.values[key] = null;
            } else {
                value = this.values[key];
            }

            generated[key] = f(key, value, isHit);
        }

        return generated;
    }
}

