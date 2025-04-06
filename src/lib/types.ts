export interface Snippet {
  id: string;
  title: string;
  author: string;
  description: string;
  code: string;
  language: string;
  category: string;
}

export interface SnippetCategory {
  name: string;
  snippets: string[];
}

export interface LanguageSection {
  language: string;
  icon: string;
  categories: SnippetCategory[];
}

// Add this interface for development mode file watching
export interface ImportGlobModule {
  [key: string]: unknown;
}
