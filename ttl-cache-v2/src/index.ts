/**
 * TTL Cache implementation, version 2.
 * One of the simplest approach to manage record expiration.
 * As a drawback, if there are no data read, all records (actual and expired) still allocate memory.
 */

type TValue = Array<Record<any, any>> | Record<any, any>;

type TCacheRecord = {
    value: TValue;
    expiredAt: number;
};

class TtlCache {
    #store: Record<string, TCacheRecord>;

    constructor() {
        this.#store = Object.create(null);
    }

    read(key: string) {
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

    store(key: string, value: TValue, ttl: number) {
        const record = {
            value,
            expiredAt: Date.now() + ttl
        };

        this.#store[key] = record;
    }

    remove(key: string) {
        delete this.#store[key];
    }
}