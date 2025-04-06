
import { Snippet } from '@/lib/types';
import SnippetCard from './SnippetCard';
import { Loader2 } from 'lucide-react';

interface SnippetGridProps {
  snippets: Snippet[];
  onSelectSnippet: (snippet: Snippet) => void;
  title: string;
  isLoading?: boolean;
}

export default function SnippetGrid({ snippets, onSelectSnippet, title, isLoading }: SnippetGridProps) {
  if (isLoading) {
    return (
      <div className="p-8 text-center h-full flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading snippets...</p>
        </div>
      </div>
    );
  }

  if (snippets.length === 0) {
    return (
      <div className="p-8 text-center animate-fade-in">
        <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">{title}</h2>
        <p className="text-muted-foreground">No snippets found.</p>
      </div>
    );
  }

  return (
    <div className="p-6 animate-fade-in">
      <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {snippets.map((snippet, index) => (
          <div 
            key={`${snippet.id}-${index}`}
            className="transform transition-opacity duration-300"
            style={{ 
              opacity: 1,
              animation: `fade-in 0.3s ease-out forwards`,
              animationDelay: `${index * 0.05}s` 
            }}
          >
            <SnippetCard
              snippet={snippet}
              onClick={() => onSelectSnippet(snippet)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
