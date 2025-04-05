import { loadSnippets } from '../lib/snippet-loader';
import * as fs from 'fs';
import * as path from 'path';

async function buildSnippets() {
  const snippetsDir = path.resolve(__dirname, '../../src/snippets');
  const outputDir = path.resolve(__dirname, '../data');
  
  console.log('Loading snippets from:', snippetsDir);
  
  const { snippets, languageSections } = await loadSnippets(snippetsDir);
  
  // Create the data directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Write the snippets to a file that can be imported
  const snippetsOutput = `
// THIS FILE IS AUTO-GENERATED - DO NOT EDIT
import { Snippet, LanguageSection } from '@/lib/types';

export const snippets: Snippet[] = ${JSON.stringify(snippets, null, 2)};

export const languageSections: LanguageSection[] = ${JSON.stringify(languageSections, null, 2)};

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
`;
  
  fs.writeFileSync(path.join(outputDir, 'snippets.ts'), snippetsOutput);
  console.log('Snippets built successfully!');
}

buildSnippets().catch(console.error);