# Random Replacement (RR) Cache

## Definition

## Replacement policy

This cache algorithm selects "victim" for eviction randomly when cache capacity is reached. Unlike algorithms such as LRU/LFU, access information isn't a criteria for choosing candidate for eviction. However, access history as well as cache hits/misses can be tracked for other optimization or monitoring purposes.

## Implementation details

| Operation  | Time complexity | Space complexity | Description                               |
|------------|-----------------|------------------|-------------------------------------------|
| `stats`    | $O(1)$          | $O(1)$           | Get cache statistics.                     |
| `lock`     | $O(1)$          | $O(1)$           | Set lock state.                           |
| `read`     | $O(1)$          | $O(1)$           | Read value by its key.                    |
| `add`      | $O(1)$          | $O(1)$           | Add value by corresponding key.           |
| `has`      | $O(1)$          | $O(1)$           | Check if there is a value by given key.   |
| `remove`   | $O(1)$          | $O(1)$           | Remove value by associated key.           |
| `clear`    | $O(1)$          | $O(1)$           | Remove cached data and release resources. |

## General theory

Random replacement policy selects a cached item randomly for eviction when the cache is full. It doesn’t consider access patterns or usage history.

This caching algorithm may be used when no specific access patterns are known or when simplicity is preferred.

ARM processors use this type of cache due to its simplicity. For example, the Cortex-R4, Cortex-R5, and Cortex-R7 processors only support the pseudo-random replacement policy.

## More information

[ARM Cortex-R Series Programmer's Guide](https://developer.arm.com/documentation/den0042/a/Caches/Cache-policies/Replacement-policy)