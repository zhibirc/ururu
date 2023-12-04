# ururu

[![Maintenance](https://img.shields.io/maintenance/yes/2023.svg?style=flat)]()
![GitHub repo size](https://img.shields.io/github/repo-size/zhibirc/ururu?style=flat&color=008080)
![Static Badge](https://img.shields.io/badge/cache_algorithms-7-f0e68c)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-blue.svg?style=flat)]()

<p align="center">
    <img width="200" src="ururu.jpeg">
</p>

---

## Motivation

Yet another cache implementations. But why? Yeah, there are a few reasons for that.

**Major reasons:**

1. Research.
2. Education.
3. Fun.

**Minor reasons:**

1. To produce ready-to-use library well enough to just copy-paste into real project.

There are also several let's say acceptance criteria and non-functional requirements which I follow here:

1. Simplicity in implementation means better _maintainability_.

If in general it's usually true, this is very subjective if applied to implementations in this repository. Despite the fact that I try to maintain the lowest complexity level as it's possible and reasonable (without damage to performance in the first place), some specific decisions could probably be simplified.

2. Simplicity in interface means better _learnability_ (see "ISO/IEC 9126 Software engineering — Product quality").

3. Zero dependencies to achieve better _predictability_, _safety_, reduces overall application _size_ and CI/CD duration.

## General Theory

When the cache becomes full, a cache block or record/entry must be evicted to make room for a new block. The replacement policy determines which block to evict.

Various cache implementations can have slightly different public APIs, however most of them are very consistent in their core capabilities. In the list below there are typical extra features (or just their naming) which can be found in known realisations:

| Member | Type | Description                                                                         |
|--------|------|-------------------------------------------------------------------------------------|
|`setpop`|method|Sets a value for the given key, but besides that returns evicted object or old value.|
|`peek`  |method|Retrieves the value associated with the given key, doesn't update access information.|