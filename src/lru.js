// helpers
import { validateSize } from './helpers/validateSize.js';
import { getTimestamp } from './helpers/getTimestamp.js';

class LRU {
    #store
    #accessMap
    #sizeLimit

    constructor ( size ) {
        validateSize(size);

        // struct for cache itself
        this.#store = new Map();
        // struct for tracking of access to cache items
        this.#accessMap = new Map();
        this.#sizeLimit = size;
    }

    getValue ( key ) {
        if ( this.#store.has(key) ) {
            // update access time
            this.#accessMap.set(key, getTimestamp());

            return this.#store.get(key);
        }
    }

    setValue ( key, value ) {
        if ( this.#store.has(key) ) {
            return;
        }

        const timestamp = getTimestamp();

        // check if cache size limit is reached
        if ( this.#store.size === this.#sizeLimit ) {
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

    setSize ( size ) {
        validateSize(size);

        this.#sizeLimit = size;
    }

    clear () {
        this.#store.clear();
        this.#accessMap.clear();
    }
}

export default LRU;
