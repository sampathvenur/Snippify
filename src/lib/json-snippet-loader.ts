
import { Snippet, LanguageSection, SnippetCategory } from './types';
import * as Icons from 'lucide-react';

/**
 * Load all snippets from both JSON and MD files in the snippets directory
 * This function is used in a development environment with HMR
 * @returns An object with snippets and language sections
 */
export const loadSnippets = async (): Promise<{
  snippets: Snippet[];
  languageSections: LanguageSection[];
}> => {
  try {
    // This glob pattern will match all JSON and MD files in the snippets directory structure
    const jsonModules = import.meta.glob('/src/snippets/**/*.json', { eager: true });
    const mdModules = import.meta.glob('/src/snippets/**/*.md', { eager: true });
    const snippets: Snippet[] = [];
    const languageMap: Record<string, LanguageSection> = {};
    
    // Process JSON snippet files
    processModules(jsonModules, snippets, languageMap, 'json');
    
    // Process MD snippet files
    processModules(mdModules, snippets, languageMap, 'md');
    
    const languageSections = Object.values(languageMap);
    return { snippets, languageSections };
  } catch (error) {
    console.error('Error loading snippets:', error);
    return { snippets: [], languageSections: [] };
  }
};

/**
 * Process modules from glob import
 */
function processModules(
  modules: Record<string, any>,
  snippets: Snippet[],
  languageMap: Record<string, LanguageSection>,
  fileType: 'json' | 'md'
) {
  Object.entries(modules).forEach(([path, module]) => {
    const pathParts = path.split('/');
    const fileName = pathParts[pathParts.length - 1];
    const id = fileName.replace(`.${fileType}`, '');
    
    // Make sure we have at least 5 parts: /src/snippets/language/category/filename.ext
    if (pathParts.length < 5) return;
    
    const language = pathParts[3];
    const category = pathParts[4];
    
    let snippetData: {
      title?: string;
      author?: string;
      description?: string;
      code?: string;
    } = {};
    
    // Handle different file types
    if (fileType === 'json') {
      snippetData = module as any;
    } else if (fileType === 'md') {
      // Parse markdown content
      const content = module.default || module;
      snippetData = parseMdContent(content, language);
    }
    
    // Create snippet only if we have valid data
    if (snippetData && (snippetData.code || snippetData.title)) {
      const snippet: Snippet = {
        id,
        title: snippetData.title || 'Untitled',
        author: snippetData.author || 'Unknown',
        description: snippetData.description || '',
        code: snippetData.code || '',
        language,
        category
      };
      
      // Add to snippets array if it doesn't already exist
      if (!snippets.some(s => s.id === snippet.id && s.language === snippet.language && s.category === snippet.category)) {
        snippets.push(snippet);
      }
      
      // Create or update language section
      if (!languageMap[language]) {
        languageMap[language] = {
          language,
          icon: getLanguageIcon(language),
          categories: []
        };
      }
      
      // Find or create category
      let categoryObj = languageMap[language].categories.find(c => c.name === category);
      if (!categoryObj) {
        categoryObj = { name: category, snippets: [] };
        languageMap[language].categories.push(categoryObj);
      }
      
      // Add snippet to category if it doesn't already exist
      if (!categoryObj.snippets.includes(id)) {
        categoryObj.snippets.push(id);
      }
    }
  });
}

/**
 * Parse markdown content to extract metadata and code
 */
function parseMdContent(content: string, language: string): {
  title?: string;
  author?: string;
  description?: string;
  code?: string;
} {
  try {
    // Extract metadata and code from markdown
    const metadataMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    
    if (!metadataMatch) {
      console.error("No metadata section found in markdown file");
      return {};
    }
    
    const [, metadataStr, codeContent] = metadataMatch;
    
    // Parse metadata
    const metadata: Record<string, string> = {};
    metadataStr.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split(':');
      if (key && valueParts.length) {
        metadata[key.trim()] = valueParts.join(':').trim();
      }
    });
    
    // Extract code from markdown code block - look for ```language and the closing ```
    const codeBlockRegex = /```([\w-]*)\n([\s\S]*?)```/;
    const codeMatch = codeContent.match(codeBlockRegex);
    
    if (!codeMatch) {
      console.error("No code block found in markdown file");
      return metadata;
    }
    
    const [, codeLanguage, code] = codeMatch;
    
    return {
      ...metadata,
      code: code.trim()
    };
  } catch (error) {
    console.error('Error parsing markdown content:', error);
    return {};
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
    html: 'FileType',
    css: 'FileType2',
    bash: 'Terminal',
    json: 'Braces',
    sql: 'Database',
    yaml: 'File',
    rust: 'FileCode',
    // Add more language mappings here
  };
  
  return iconMap[language.toLowerCase()] || 'File';
}
