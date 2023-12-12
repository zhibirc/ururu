import os from 'node:os';
import { ICache } from '../libs/types.js';

class RRCache implements ICache {
    #hits: number;
    #misses: number;
    #capacity: number;
    #locked: boolean;
    #keys: Array<any>;
    #freeSlots: Array<number>;
    #store;

    constructor ( capacity: number ) {
        if (!Number.isInteger(capacity) || capacity <= 0) {
            throw new Error('invalid "capacity": positive integer expected');
        }

        this.#hits = 0;
        this.#misses = 0;
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
            locked: this.#locked,
            hitRatio: this.#hits / (this.#hits + this.#misses),
            memoryUsage: {
                freeTotalRatio: Math.round(os.freemem() / os.totalmem() * 100) / 100,
                ...process.memoryUsage()
            }
        };
    }

    set lock (state: boolean) {
        this.#locked = Boolean(state);
    }

    /**
     * Read value stored in cache by assosiated key.
     * @param {*} key - cache record's key
     * @return {*|void} record's value retrieved by key or undefined if record is absent
     */
    read (key: any) {
        if (this.#store.has(key)) {
            this.#hits += 1;
            return this.#store.get(key).value;
        }

        this.#misses += 1;
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
     * Remove all items from the cache and clear internal structures.
     * @return {void}
     */
    clear () {
        this.#hits = this.#misses = 0;
        this.#keys.length = this.#freeSlots.length = 0;
        this.#keys.length = this.#capacity;
        this.#store.clear();
    }
}


export default RRCache;