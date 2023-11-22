import { IRRCache, TConfigOptions } from './types.js';

class RRCache implements IRRCache {
    #capacity: number;
    #keys: Array<any>;
    #freeSlots: Array<number>;
    #store;

    constructor ( options: TConfigOptions ) {
        const { capacity } = options;

        if (!Number.isInteger(capacity) || capacity <= 0) throw new Error('invalid "capacity": positive integer expected');

        this.#capacity = capacity;
        this.#keys = new Array(capacity);
        this.#freeSlots = [];
        this.#store = new Map();
    }

    get size() {
        return this.#store.size;
    }

    set capacity (value: number) {
        if (!Number.isInteger(value) || value <= 0) throw new Error('invalid "capacity": positive integer expected');

        if (value < this.#capacity) {
            // @todo: implement
        }

        this.#capacity = value;
    }

    read (key: any) {
        if (this.#store.has(key)) {
            return this.#store.get(key).value;
        }

        return null;
    }

    store (key: any, value: any) {
        let keyIndex: number;

        // check if cache capacity limit is reached
        if (this.#store.size === this.#capacity) {
            // evict randomly selected entry since we are out of capacity
            keyIndex = Math.random() * this.#capacity | 0;
            this.#store.delete(this.#keys[keyIndex]);
        } else {
            keyIndex = this.#freeSlots.length
                ? this.#freeSlots.pop()
                : this.#store.size;
        }

        this.#keys[keyIndex] = key;
        this.#store.set(key, {keyIndex, value});
    }

    has (key: any) {
        return this.#store.has(key);
    }

    remove (key: any) {
        if (this.#store.has(key)) {
            const keyIndex = this.#store.get(key).keyIndex;
            this.#keys[keyIndex] = null;
            this.#store.delete(key);
            this.#freeSlots.push(keyIndex);
        }
    }

    clear () {
        this.#keys.length = this.#freeSlots.length = 0;
        this.#keys.length = this.#capacity;
        this.#store.clear();
    }
}


export default RRCache;