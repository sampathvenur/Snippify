
---
title: List Comprehension
author: CodeSparkStash Team
description: Create lists using a concise syntax
---

```python
# Basic list comprehension
numbers = [1, 2, 3, 4, 5]
squares = [x**2 for x in numbers]
print(squares)  # [1, 4, 9, 16, 25]

# With conditional filtering
even_squares = [x**2 for x in numbers if x % 2 == 0]
print(even_squares)  # [4, 16]

# Nested list comprehension
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flattened = [num for row in matrix for num in row]
print(flattened)  # [1, 2, 3, 4, 5, 6, 7, 8, 9]
```
