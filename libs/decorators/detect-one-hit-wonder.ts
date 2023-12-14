/**
 * Detect one-hit-wonder objects.
 */

import BloomFilter from '../filters/bloom';
import CuckooFilter from '../filters/cuckoo';

const TYPE_FILTER_MAP = Symbol('TYPE_FILTER_MAP');
const TYPE_FILTER_BLOOM = Symbol('TYPE_FILTER_BLOOM');
const TYPE_FILTER_CUCKOO = Symbol('TYPE_FILTER_CUCKOO');

const detectOneHitWonder = (() => {
    let filter;

    return (filterType: symbol = TYPE_FILTER_MAP) => {
        return function (originalMethod: any, _context: ClassMethodDecoratorContext) {
            function replacementMethod(this: any, key: any, value?: any) {
                if (!filter) {
                    const { capacity } = this.stats;

                    switch (filterType) {
                        case TYPE_FILTER_MAP:
                            filter = new Map();
                            break;
                        case TYPE_FILTER_BLOOM:
                            filter = new BloomFilter(capacity);
                            break;
                        case TYPE_FILTER_CUCKOO:
                            filter = new CuckooFilter(capacity);
                            break;
                    }
                }
    
                switch (originalMethod.name) {
                    case 'read':
                        filter.set(key, 1);
                        return originalMethod.call(this, key);
                    case 'add':
                        if (filter.get(key)) {
                            return originalMethod.call(this, key, value);
                        } else {
                            filter.set(key, 1);
                        }
                }
            }
    
            return replacementMethod;
        };
    }
})();


export {
    TYPE_FILTER_MAP,
    TYPE_FILTER_BLOOM,
    TYPE_FILTER_CUCKOO
};
export default detectOneHitWonder;