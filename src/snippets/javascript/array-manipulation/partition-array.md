
---
title: Partition Array
author: CodeSparkStash Team
description: Split an array into two parts based on a predicate function
---

```javascript
function partitionArray(array, predicate) {
  return array.reduce(
    ([pass, fail], elem) => {
      return predicate(elem) 
        ? [[...pass, elem], fail] 
        : [pass, [...fail, elem]];
    },
    [[], []]
  );
}

// Example usage
const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
const [evens, odds] = partitionArray(numbers, n => n % 2 === 0);
console.log(evens); // [2, 4, 6, 8]
console.log(odds);  // [1, 3, 5, 7]
```
