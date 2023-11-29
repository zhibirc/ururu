/**
 * TTL Cache implementation, version 1.
 * Cache is self cleaning, without external cleanup trigger.
 * As a drawback, timer objects allocate additional memory.
 */
class TtlCache {
    #store;
    constructor() {
        this.#store = Object.create(null);
    }
    read(key) {
        return this.#store[key];
    }
    store(key, value, timeLimit, onExpireCallback) {
        const record = {
            value,
            timeout: setTimeout(() => {
                this.remove(key);
                return onExpireCallback?.(key, value);
            }, timeLimit)
        };
        record.timeout.unref?.();
        this.#store[key] = record;
    }
    remove(key) {
        const record = this.#store[key];
        if (record) {
            clearTimeout(record.timeout);
        }
        delete this.#store[key];
    }
}
export {};
