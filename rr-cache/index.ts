type TStats = {
    // represent number of cache entries
    size: number;
    // represent value of cache capacity
    capacity: number;
    // represent if cache is locked currently
    locked: boolean;
    // @todo: may contain other props like cache misses, etc.
}

interface IRRCache {
    // get cache statistics
    get stats(): TStats;
    // set lock state, if locked cache isn't growing
    set locked(state: boolean);
    // read value from cache by its key
    read: (key: any) => any;
    // add value to cache by corresponding key
    add: (key: any, value: any) => void;
    // check if cache contains value by given key
    has: (key: any) => boolean;
    // remove value from cache by associated key
    remove: (key: any) => void;
    // clear cache by removing all stored data and release all auxiliary resources
    clear: () => void;
}

type TConfigOptions = {
    /**
     * Capacity means how many items can be stored at the same time in cache.
     * For RR cache, by definition, capacity is a required restriction,
     * without it becomes almost meaningless, so this option is mandatory.
     */
    capacity: number;
}

class RRCache implements IRRCache {
    #capacity: number;
    #locked: boolean;
    #keys: Array<any>;
    #freeSlots: Array<number>;
    #store;

    constructor ( options: TConfigOptions ) {
        const { capacity } = options;

        if (!Number.isInteger(capacity) || capacity <= 0) throw new Error('invalid "capacity": positive integer expected');

        this.#capacity = capacity;
        this.#locked = false;
        this.#keys = new Array(capacity);
        this.#freeSlots = [];
        this.#store = new Map();
    }

    get stats() {
        return {
            size: this.#store.size,
            capacity: this.#capacity,
            locked: this.#locked
        };
    }

    set locked (state: boolean) {
        this.#locked = state;
    }

    /**
     * Read value stored in cache by assosiated key.
     * @param {*} key - cache record's key
     * @return {*|null} record's value retrieved by key or null if record is absent
     */
    read (key: any) {
        if (this.#store.has(key)) {
            return this.#store.get(key).value;
        }

        return null;
    }

    add (key: any, value: any) {
        if (this.#locked) return;

        let keyIndex: number;

        // check if cache capacity limit is reached
        if (this.#store.size === this.#capacity) {
            // evict randomly selected entry since we are out of capacity
            keyIndex = Math.random() * this.#capacity | 0;
            this.#store.delete(this.#keys[keyIndex]);
        } else {
            keyIndex = this.#freeSlots.length
                ? this.#freeSlots.pop() as number
                : this.#store.size;
        }

        this.#keys[keyIndex] = key;
        this.#store.set(key, {keyIndex, value});
    }

    /**
     * Check if record by given key exists in cache.
     * @param {*} key - cache record's key
     * @return {boolean} return true if record is in the cache
     */
    has (key: any) {
        return this.#store.has(key);
    }

    /**
     * Remove an item from the cache.
     * @param {*} key - cache record's key
     * @return {void}
     */
    remove (key: any) {
        if (this.#store.has(key)) {
            const keyIndex = this.#store.get(key).keyIndex;
            this.#keys[keyIndex] = null;
            this.#store.delete(key);
            this.#freeSlots.push(keyIndex);
        }
    }

    /**
     * Remove all items from the cache.
     * @return {void}
     */
    clear () {
        this.#keys.length = this.#freeSlots.length = 0;
        this.#keys.length = this.#capacity;
        this.#store.clear();
    }
}


export default RRCache;