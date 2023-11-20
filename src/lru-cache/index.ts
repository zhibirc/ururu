import { ILruCache, TConfigOptions } from './types.js';

const getTimestamp = () => Date.now();

class LruCache implements ILruCache {
    #capacity: number;
    #store;
    #accessMap;

    constructor ( options: TConfigOptions ) {
        const { capacity, checkLowMemory } = options;
        let checkLowMemoryTimer;

        if (typeof capacity === 'number' && (!Number.isInteger(capacity) || capacity <= 0)) {
            throw new Error('Invalid value for LRU cache capacity: positive integer expected');
        }

        this.#capacity = capacity as number;

        if (checkLowMemory) {
            checkLowMemoryTimer = setInterval(() => {
                // @todo
            }, 5000);
            checkLowMemoryTimer.unref?.();
        }

        this.#store = new Map();
        // struct for tracking of access to cache items
        this.#accessMap = new Map();
    }

    get size() {
        return this.#store.size;
    }

    set capacity (value: number) {
        if (!Number.isInteger(value) || value <= 0) {
            throw new Error('Invalid value for LRU cache capacity: positive integer expected');
        }

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