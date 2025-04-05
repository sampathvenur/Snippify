
---
title: Compare Arrays
author: CodeSparkStash Team
description: Compare two arrays for equality regardless of order
---

```javascript
function compareArrays(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  
  const sortedArr1 = [...arr1].sort();
  const sortedArr2 = [...arr2].sort();
  
  return sortedArr1.every((value, index) => value === sortedArr2[index]);
}

// Example usage
const array1 = [1, 2, 3, 4];
const array2 = [4, 3, 2, 1];
console.log(compareArrays(array1, array2)); // true
```
