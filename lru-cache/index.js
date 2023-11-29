;
const getTimestamp = () => Date.now();
class LruCache {
    #capacity;
    #store;
    #accessMap;
    constructor(options) {
        const { capacity, checkLowMemory } = options;
        let checkLowMemoryTimer;
        if (!Number.isInteger(capacity) || capacity <= 0)
            throw new Error('invalid "capacity": positive integer expected');
        if (typeof checkLowMemory !== 'boolean')
            throw new Error('option "checkLowMemory" must be boolean if provided');
        this.#capacity = capacity;
        if (checkLowMemory) {
            checkLowMemoryTimer = setInterval(() => {
                // @todo
            }, 5000);
            // checkLowMemoryTimer.unref?.();
        }
        this.#store = new Map();
        // struct for tracking of access to cache items
        this.#accessMap = new Map();
    }
    get size() {
        return this.#store.size;
    }
    set capacity(value) {
        if (!Number.isInteger(value) || value <= 0)
            throw new Error('invalid "capacity": positive integer expected');
        this.#capacity = value;
    }
    read(key) {
        if (this.#store.has(key)) {
            // update access time
            this.#accessMap.set(key, getTimestamp());
            return this.#store.get(key);
        }
        return null;
    }
    store(key, value) {
        const timestamp = getTimestamp();
        // check if cache size limit is reached
        if (this.#store.size === this.#capacity) {
            // first, get item with the lowest priority (oldest based on timestamp)
            const min = {
                key: null,
                value: +Infinity
            };
            for (const [itemKey, itemValue] of this.#accessMap) {
                if (itemValue < min.value) {
                    min.key = itemKey;
                    min.value = itemValue;
                }
            }
            this.#accessMap.delete(min.key);
            this.#store.delete(min.key);
        }
        this.#accessMap.set(key, timestamp);
        this.#store.set(key, value);
    }
    has(key) {
        return this.#store.has(key);
    }
    remove(key) {
        this.#store.delete(key);
    }
    clear() {
        this.#store.clear();
        this.#accessMap.clear();
    }
}
export default LruCache;
