import { ICache } from '../libs/types.js';

type TNode = {
    data: {
        key: any,
        value: any
    };
    next: TNode | null;
    prev: TNode | null;
};

const Node = (
    data: {key: any, value: any},
    next = null,
    prev = null
) => ({data, next, prev});

class FifoCache implements ICache {
    #hits: number;
    #misses: number;
    #capacity: number;
    #locked: boolean;
    #head: any;
    #tail: any;
    #map;

    constructor ( capacity: number ) {
        if (!Number.isInteger(capacity) || capacity <= 0) {
            throw new Error('invalid "capacity": positive integer expected');
        }

        this.#hits = 0;
        this.#misses = 0;
        this.#capacity = capacity;
        this.#locked = false;

        // store is a Singly Linked List to support fast add (to tail) and delete (from head) records
        this.#head = null;
        this.#tail = null;
        // struct for fast access to cache records, use as <key:reference> lookup table
        this.#map = new Map();
    }

    get stats() {
        return {
            size: this.#map.size,
            capacity: this.#capacity,
            locked: this.#locked,
            hitRatio: this.#hits / (this.#hits + this.#misses)
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
        if (this.#map.has(key)) {
            this.#hits += 1;
            return this.#map.get(key).data.value;
        }

        this.#misses += 1;
    }

    add (key: any, value: any) {
        // check if cache capacity limit is reached
        if (this.#map.size === this.#capacity) {
            // evict head since we are out of capacity
            const head = this.#head;
            this.#head = head.next;
            head.next = null;
            this.#head.prev = null;
            this.#map.delete(head.data.key);
        }
        
        const node: TNode = Node({key, value});

        if (this.#map.size === 0) {
            this.#head = node;
        } else if (this.#map.size === 1) {
            this.#tail = node;
            this.#head.next = this.#tail;
            this.#tail.prev = this.#head;
        } else {
            this.#tail.next = node;
            node.prev = this.#tail;
            this.#tail = node;
        }

        this.#map.set(key, node);
    }

    /**
     * Check if record by given key exists in cache.
     * @param {*} key - cache record's key
     * @return {boolean} return true if record is in the cache
     */
    has (key: any) {
        return this.#map.has(key);
    }

    /**
     * Remove an item from the cache.
     * @param {*} key - cache record's key
     * @return {void}
     */
    remove (key: any) {
        if (this.#map.has(key)) {
            const node = this.#map.get(key);

            node.prev.next = node.next;
            node.next.prev = node.prev;
            node.next = null;
            node.prev = null;
            this.#map.delete(key);
        }
    }

    /**
     * Remove all items from the cache and clear internal structures.
     * @return {void}
     */
    clear () {
        this.#hits = this.#misses = 0;
        this.#head = this.#tail = null;
        this.#map.clear();
    }
}


export default FifoCache;