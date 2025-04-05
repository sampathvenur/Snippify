
import { promises as fs } from 'fs';
import path from 'path';
import { Snippet, LanguageSection, SnippetCategory } from './types';

// This function would be used on the server side to load snippets
export async function loadSnippets(snippetsDir: string): Promise<{
  snippets: Snippet[];
  languageSections: LanguageSection[];
}> {
  const snippets: Snippet[] = [];
  const languageSections: LanguageSection[] = [];
  
  try {
    // Get all languages (directories in the snippets folder)
    const languages = await fs.readdir(snippetsDir);
    
    for (const language of languages) {
      const languagePath = path.join(snippetsDir, language);
      const languageStat = await fs.stat(languagePath);
      
      if (!languageStat.isDirectory()) continue;
      
      // Find a suitable icon for the language
      const iconName = getLanguageIcon(language);
      
      // Create a language section
      const languageSection: LanguageSection = {
        language,
        icon: iconName,
        categories: []
      };
      
      // Get all categories for this language
      const categories = await fs.readdir(languagePath);
      
      for (const category of categories) {
        const categoryPath = path.join(languagePath, category);
        const categoryStat = await fs.stat(categoryPath);
        
        if (!categoryStat.isDirectory()) continue;
        
        // Create a category
        const snippetCategory: SnippetCategory = {
          name: category,
          snippets: []
        };
        
        // Get all snippets in this category
        const snippetFiles = await fs.readdir(categoryPath);
        
        for (const snippetFile of snippetFiles) {
          if (!snippetFile.endsWith('.md')) continue;
          
          const snippetPath = path.join(categoryPath, snippetFile);
          const snippet = await parseSnippetFile(snippetPath);
          
          if (snippet) {
            snippets.push(snippet);
            snippetCategory.snippets.push(snippet.id);
          }
        }
        
        languageSection.categories.push(snippetCategory);
      }
      
      languageSections.push(languageSection);
    }
    
    return { snippets, languageSections };
  } catch (error) {
    console.error('Error loading snippets:', error);
    return { snippets: [], languageSections: [] };
  }
}

function getLanguageIcon(language: string): string {
  const iconMap: Record<string, string> = {
    javascript: 'FileCode',
    typescript: 'FileJson',
    python: 'FileCode',
    ruby: 'FileText',
    java: 'Coffee',
    csharp: 'Hash',
    go: 'FileCode',
    // Add more language mappings here
  };
  
  return iconMap[language] || 'File';
}

export async function parseSnippetFile(filePath: string): Promise<Snippet | null> {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    
    // Extract metadata and code
    const metadataMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    
    if (!metadataMatch) return null;
    
    const [, metadataStr, codeContent] = metadataMatch;
    
    // Parse metadata
    const metadata: Record<string, string> = {};
    metadataStr.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split(':');
      if (key && valueParts.length) {
        metadata[key.trim()] = valueParts.join(':').trim();
      }
    });
    
    // Extract code from markdown code block
    const codeMatch = codeContent.match(/```(\w+)\n([\s\S]*?)```/);
    
    if (!codeMatch) return null;
    
    const [, language, code] = codeMatch;
    
    // Get category and id from file path
    const pathParts = filePath.split('/');
    const fileName = pathParts[pathParts.length - 1].replace('.md', '');
    const category = pathParts[pathParts.length - 2];
    const snippetLanguage = pathParts[pathParts.length - 3];
    
    return {
      id: fileName,
      title: metadata.title || fileName,
      author: metadata.author || 'Unknown',
      description: metadata.description || '',
      code: code.trim(),
      language: snippetLanguage,
      category
    };
  } catch (error) {
    console.error('Error parsing snippet file:', error);
    return null;
  }
}
