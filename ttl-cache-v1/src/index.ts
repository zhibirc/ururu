/**
 * TTL Cache implementation, version 1.
 * Cache is self cleaning, without external cleanup trigger.
 * As a drawback, timer objects allocate additional memory.
 */

type TValue = Array<Record<string, any>> | Record<string, any>;

type TCacheRecord = {
    value: TValue;
    timeout: ReturnType<typeof setTimeout>;
};

class TtlCache {
    #store: Record<string, TCacheRecord>;

    constructor() {
        this.#store = Object.create(null);
    }

    read(key: string) {
        return this.#store[key];
    }

    store(
        key: string,
        value: TValue,
        timeLimit: number,
        onExpireCallback?: (storedKey: string, storedValue: TValue) => any
    ) {
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

    remove(key: string) {
        const record = this.#store[key];

        if (record) {
            clearTimeout(record.timeout);
        }

        delete this.#store[key];
    }
}