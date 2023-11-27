# Random Replacement (RR) Cache

## Definition

## Implementation details

| Operation  | Time complexity | Space complexity | Description                               |
|------------|-----------------|------------------|-------------------------------------------|
| `stats`    | $O(1)$          | $O(1)$           | Get cache statistics.                     |
| `capacity` | $$              | $$               | Set new capacity value.                   |
| `read`     | $O(1)$          | $O(1)$           | Read value by its key.                    |
| `add`      | $O(1)$          | $O(1)$           | Add value by corresponding key.           |
| `has`      | $O(1)$          | $O(1)$           | Check if there is a value by given key.   |
| `remove`   | $O(1)$          | $O(1)$           | Remove value by associated key.           |
| `clear`    | $O(1)$          | $O(1)$           | Remove cached data and release resources. |

## General theory

Random replacement policy selects a cached item randomly for eviction when the cache is full. It doesn’t consider access patterns or usage history.

This caching algorithm may be used when no specific access patterns are known or when simplicity is preferred.