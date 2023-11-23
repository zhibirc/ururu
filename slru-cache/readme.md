# Segmented LRU (SLRU) cache

SLRU divides the cache into two segments: a probationary segment and a protected segment. New entries enter the probationary segment, and if they are accessed again, they move to the protected segment. This approach allows SLRU to maintain the benefits of LRU while also considering frequency of access.