interface ILruCache {
    get size(): number;
    set capacity(value: number);
    read: (key: any) => any;
    store: (key: any, value: any) => void;
    has: (key: any) => boolean;
    remove: (key: any) => void;
    clear: () => void;
};

type TConfigOptions = {
    /**
     * Capacity means how many items can be stored at the same time in cache.
     * For LRU cache, by definition, capacity is a required restriction,
     * without it becomes almost meaningless, so this option is mandatory.
     */
    capacity: number;
    /**
     * Detect low memory situation and act accordingly: clear cache to free up memory
     * and prevent storing new records temporarily.
     * If such situation is just hypothetical, it's better to not enable this feature
     * to not waste system resources.
     */
    checkLowMemory?: boolean;
};

const getTimestamp = () => Date.now();

class LruCache implements ILruCache {
    #capacity: number;
    #store;
    #accessMap;

    constructor ( options: TConfigOptions ) {
        const { capacity, checkLowMemory } = options;
        let checkLowMemoryTimer;

        if (!Number.isInteger(capacity) || capacity <= 0) throw new Error('invalid "capacity": positive integer expected');
        if (typeof checkLowMemory !== 'boolean') throw new Error('option "checkLowMemory" must be boolean if provided');

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

    set capacity (value: number) {
        if (!Number.isInteger(value) || value <= 0) throw new Error('invalid "capacity": positive integer expected');

        this.#capacity = value;
    }

    read (key: any) {
        if (this.#store.has(key)) {
            // update access time
            this.#accessMap.set(key, getTimestamp());

            return this.#store.get(key);
        }

        return null;
    }

    store (key: any, value: any) {
        const timestamp = getTimestamp();

        // check if cache size limit is reached
        if ( this.#store.size === this.#capacity ) {
            // first, get item with the lowest priority (oldest based on timestamp)
            const min = {
                key: null,
                value: +Infinity
            };

            for ( const [itemKey, itemValue] of this.#accessMap ) {
                if ( itemValue < min.value ) {
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

    has (key: any) {
        return this.#store.has(key);
    }

    remove(key: any) {
        this.#store.delete(key);
    }

    clear () {
        this.#store.clear();
        this.#accessMap.clear();
    }
}


export default LruCache;