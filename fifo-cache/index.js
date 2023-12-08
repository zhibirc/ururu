const Node = (data, next = null, prev = null) => ({ data, next, prev });
class FifoCache {
    #hits;
    #misses;
    #capacity;
    #locked;
    #head;
    #tail;
    #map;
    constructor(capacity) {
        if (!Number.isInteger(capacity) || capacity <= 0) {
            throw new Error('invalid "capacity": positive integer expected');
        }
        this.#hits = 0;
        this.#misses = 0;
        this.#capacity = capacity;
        this.#locked = false;
        // store is a Doubly Linked List to support fast add (to tail) and delete (from head) records,
        // as well as effective deletion
        this.#head = null;
        this.#tail = null;
        // struct for fast access to cache records, use as <key:node> lookup table
        // to compensate O(N) bottleneck to search node in such list
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
    set lock(state) {
        this.#locked = Boolean(state);
    }
    /**
     * Read value stored in cache by assosiated key.
     * @param {*} key - cache record's key
     * @return {*|void} record's value retrieved by key or undefined if record is absent
     */
    read(key) {
        if (this.#map.has(key)) {
            this.#hits += 1;
            return this.#map.get(key).data.value;
        }
        this.#misses += 1;
    }
    add(key, value) {
        // check if cache capacity limit is reached
        if (this.#map.size === this.#capacity) {
            // evict head since we are out of capacity
            const head = this.#head;
            this.#head = head.next;
            head.next = null;
            this.#head.prev = null;
            this.#map.delete(head.data.key);
        }
        const node = Node({ key, value });
        if (this.#map.size === 0) {
            this.#head = node;
        }
        else if (this.#map.size === 1) {
            this.#tail = node;
            this.#head.next = this.#tail;
            this.#tail.prev = this.#head;
        }
        else {
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
    has(key) {
        return this.#map.has(key);
    }
    /**
     * Remove an item from the cache.
     * @param {*} key - cache record's key
     * @return {void}
     */
    remove(key) {
        if (this.#map.has(key)) {
            const node = this.#map.get(key);
            if (node === this.#head) {
                this.#head = node.next;
                this.#head.prev = null;
            }
            else if (node === this.#tail) {
                this.#tail = node.prev;
                this.#tail.next = null;
            }
            else {
                node.prev.next = node.next;
                node.next.prev = node.prev;
            }
            this.#map.delete(key);
        }
    }
    /**
     * Remove all items from the cache and clear internal structures.
     * @return {void}
     */
    clear() {
        this.#hits = this.#misses = 0;
        this.#head = this.#tail = null;
        this.#map.clear();
    }
}
export default FifoCache;
