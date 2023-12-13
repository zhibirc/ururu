class BloomFilter {
    #store;

    constructor(capacity: number) {
        if (!Number.isInteger(capacity) || capacity <= 0) {
            throw new Error('invalid "capacity": positive integer expected');
        }

        this.#store = new Uint8Array(capacity);
    }

    set(key: string) {}

    get(key: string) {}
}


export default BloomFilter;