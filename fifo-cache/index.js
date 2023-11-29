;
const Node = (data, next) => ({ data, next });
class FifoCache {
    #capacity;
    #store;
    #map;
    constructor(options) {
        const { capacity } = options;
        if (!Number.isInteger(capacity) || capacity <= 0)
            throw new Error('invalid "capacity": positive integer expected');
        this.#capacity = capacity;
        // Store is a Singly linked list to support fast add (to tail) and delete (from head) records.
        this.#store = { head: null, tail: null };
        // Struct for fast access to cache records, use as <key:reference> lookup table.
        this.#map = new Map();
    }
    get size() {
        return this.#map.size;
    }
    set capacity(value) {
        if (!Number.isInteger(value) || value <= 0)
            throw new Error('invalid "capacity": positive integer expected');
        if (value < this.#capacity) {
            // @todo: implement
        }
        this.#capacity = value;
    }
    read(key) {
        if (this.#map.has(key)) {
            return this.#map.get(key)?.data.value;
        }
        return null;
    }
    store(key, value) {
        // check if cache capacity limit is reached
        if (this.#map.size === this.#capacity) {
            // evict head since we are out of capacity
            const node = this.#store.head;
            this.#store.head = node.next;
            this.#map.delete(node.data.key);
            node.next = null;
        }
        const node = Node({ key, value });
        if (this.#map.size === 0) {
            this.#store.head = node;
        }
        else if (this.#map.size === 1) {
            this.#store.tail = node;
            this.#store.head.next = this.#store.tail;
        }
        else {
            this.#store.tail.next = node;
            this.#store.tail = node;
        }
        this.#map.set(key, node);
    }
    has(key) {
        return this.#map.has(key);
    }
    clear() {
        this.#store.head = null;
        this.#store.tail = null;
        this.#map.clear();
    }
}
export default FifoCache;
