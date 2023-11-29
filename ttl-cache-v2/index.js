/**
 * TTL Cache implementation, version 2.
 * One of the simplest approach to manage record expiration.
 * As a drawback, if there are no data read, all records (actual and expired) still allocate memory.
 */
class TtlCache {
    #store;
    constructor() {
        this.#store = Object.create(null);
    }
    read(key) {
        const record = this.#store[key];
        if (!record) {
            return null;
        }
        if (record.expiredAt < Date.now()) {
            this.remove(key);
            return null;
        }
        return record.value;
    }
    store(key, value, ttl) {
        const record = {
            value,
            expiredAt: Date.now() + ttl
        };
        this.#store[key] = record;
    }
    remove(key) {
        delete this.#store[key];
    }
}
export {};
