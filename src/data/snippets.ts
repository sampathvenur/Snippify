
import { Snippet, LanguageSection } from '@/lib/types';

// This file simulates what would be loaded from the JSON snippets folder
// In a real implementation with a server, this would be dynamically generated

export const snippets: Snippet[] = [
  {
    id: 'compare-arrays',
    title: 'Compare Arrays',
    author: 'sampathvenur',
    description: 'Compare two arrays for equality regardless of order',
    code: `function compareArrays(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  
  const sortedArr1 = [...arr1].sort();
  const sortedArr2 = [...arr2].sort();
  
  return sortedArr1.every((value, index) => value === sortedArr2[index]);
}

// Example usage
const array1 = [1, 2, 3, 4];
const array2 = [4, 3, 2, 1];
console.log(compareArrays(array1, array2)); // true`,
    language: 'javascript',
    category: 'array-manipulation'
  },
  {
    id: 'partition-array',
    title: 'Partition Array',
    author: 'sampathvenur',
    description: 'Split an array into two parts based on a predicate function',
    code: `function partitionArray(array, predicate) {
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
console.log(odds);  // [1, 3, 5, 7]`,
    language: 'javascript',
    category: 'array-manipulation'
  },
  {
    id: 'query-selector',
    title: 'Query Selector',
    author: 'sampathvenur',
    description: 'Select DOM elements with different methods',
    code: `// Select a single element by ID
const element = document.getElementById('myElement');

// Select a single element using a CSS selector
const element = document.querySelector('.my-class');

// Select all elements matching a CSS selector
const elements = document.querySelectorAll('.my-class');

// Convert NodeList to Array for easier manipulation
const elementsArray = Array.from(document.querySelectorAll('.my-class'));
// OR
const elementsArray = [...document.querySelectorAll('.my-class')];`,
    language: 'javascript',
    category: 'dom-manipulation'
  },
  {
    id: 'list-comprehension',
    title: 'List Comprehension',
    author: 'sampathvenur',
    description: 'Create lists using a concise syntax',
    code: `# Basic list comprehension
numbers = [1, 2, 3, 4, 5]
squares = [x**2 for x in numbers]
print(squares)  # [1, 4, 9, 16, 25]

# With conditional filtering
even_squares = [x**2 for x in numbers if x % 2 == 0]
print(even_squares)  # [4, 16]

# Nested list comprehension
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flattened = [num for row in matrix for num in row]
print(flattened)  # [1, 2, 3, 4, 5, 6, 7, 8, 9]`,
    language: 'python',
    category: 'array-manipulation'
  }
];

export const languageSections: LanguageSection[] = [
  {
    language: 'javascript',
    icon: 'FileCode',
    categories: [
      {
        name: 'array-manipulation',
        snippets: ['compare-arrays', 'partition-array']
      },
      {
        name: 'dom-manipulation',
        snippets: ['query-selector']
      }
    ]
  },
  {
    language: 'python',
    icon: 'FileCode',
    categories: [
      {
        name: 'array-manipulation',
        snippets: ['list-comprehension']
      }
    ]
  }
];

// Helper function to get a snippet by ID
export function getSnippetById(id: string): Snippet | undefined {
  return snippets.find(snippet => snippet.id === id);
}

// Helper function to get snippets by language and category
export function getSnippetsByCategory(language: string, category: string): Snippet[] {
  return snippets.filter(
    snippet => snippet.language === language && snippet.category === category
  );
}

// Helper function for search
export function searchSnippets(query: string): Snippet[] {
  const lowerQuery = query.toLowerCase();
  return snippets.filter(
    snippet => 
      snippet.title.toLowerCase().includes(lowerQuery) ||
      snippet.description.toLowerCase().includes(lowerQuery) ||
      snippet.code.toLowerCase().includes(lowerQuery)
  );
}
