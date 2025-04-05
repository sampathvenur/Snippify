
import { Snippet } from '@/lib/types';
import SnippetCard from './SnippetCard';

interface SnippetGridProps {
  snippets: Snippet[];
  onSelectSnippet: (snippet: Snippet) => void;
  title: string;
}

export default function SnippetGrid({ snippets, onSelectSnippet, title }: SnippetGridProps) {
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
            key={snippet.id} 
            className="opacity-0 animate-fade-in"
            style={{ animationDelay: `${index * 0.05}s` }}
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
