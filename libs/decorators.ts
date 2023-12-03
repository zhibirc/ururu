/**
 * Cache method decorators.
 * Designed to be used to extend cache capabilities.
 */

/**
 * Detect one-hit-wonder objects.
 */
const detectOneHitWonder = (() => {
    const hitCount = new Map();

    return (threshold: number = 1) => {
        return function (originalMethod: any, _context: ClassMethodDecoratorContext) {
            function replacementMethod(this: any, key: any, value?: any) {
                let n = hitCount.get(key) ?? 0;
    
                hitCount.set(key, ++n);
    
                switch (originalMethod.name) {
                    case 'read':
                        return originalMethod.call(this, key);
                    case 'add':
                        if (n > threshold) {
                            return originalMethod.call(this, key, value);
                        }
                }
            }
    
            return replacementMethod;
        };
    }
})();

function log() {
    return function (originalMethod: any, _context: ClassMethodDecoratorContext) {
        function replacementMethod(this: any, key: any, value: any) {
            // @todo: implement
        }

        return replacementMethod;
    };
}


export {
    detectOneHitWonder
};