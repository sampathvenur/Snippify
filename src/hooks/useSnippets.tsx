
import { useQuery } from '@tanstack/react-query';
import { Snippet, LanguageSection } from '@/lib/types';
import { loadSnippets } from '@/lib/json-snippet-loader';

export function useSnippets() {
  return useQuery({
    queryKey: ['snippets'],
    queryFn: loadSnippets,
    refetchInterval: 1000, // Poll for changes every second
  });
}

export function useSnippetsByCategory(language: string | null, category: string | null) {
  const { data } = useSnippets();
  
  if (!data || !language || !category) {
    return [];
  }
  
  return data.snippets.filter(
    snippet => snippet.language === language && snippet.category === category
  );
}

export function useSearchSnippets(query: string) {
  const { data } = useSnippets();
  
  if (!data || !query) {
    return [];
  }
  
  const lowerQuery = query.toLowerCase();
  return data.snippets.filter(
    snippet => 
      snippet.title.toLowerCase().includes(lowerQuery) ||
      snippet.description.toLowerCase().includes(lowerQuery) ||
      snippet.code.toLowerCase().includes(lowerQuery)
  );
}
