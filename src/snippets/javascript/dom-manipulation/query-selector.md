
---
title: Query Selector
author: CodeSparkStash Team
description: Select DOM elements with different methods
---

```javascript
// Select a single element by ID
const element = document.getElementById('myElement');

// Select a single element using a CSS selector
const element = document.querySelector('.my-class');

// Select all elements matching a CSS selector
const elements = document.querySelectorAll('.my-class');

// Convert NodeList to Array for easier manipulation
const elementsArray = Array.from(document.querySelectorAll('.my-class'));
// OR
const elementsArray = [...document.querySelectorAll('.my-class')];
```
