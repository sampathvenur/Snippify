
import { Snippet } from '@/lib/types';
import * as Icons from 'lucide-react';
import React from 'react';

// Type for Lucide icon components
type IconComponent = typeof Icons.File;

interface SnippetCardProps {
  snippet: Snippet;
  onClick: () => void;
}

export default function SnippetCard({ snippet, onClick }: SnippetCardProps) {
  const getLanguageIcon = (language: string): IconComponent => {
    const iconMap: Record<string, IconComponent> = {
      javascript: Icons.FileCode,
      typescript: Icons.FileJson,
      python: Icons.FileCode,
      ruby: Icons.FileText,
      java: Icons.Coffee,
      csharp: Icons.Hash,
      go: Icons.FileCode,
      html: Icons.FileType,
      css: Icons.FileType2,
      bash: Icons.Terminal,
      json: Icons.Braces,
      sql: Icons.Database,
      yaml: Icons.File,
      rust: Icons.FileCode,
      jsx: Icons.FileCode,
      tsx: Icons.FileJson,
      markdown: Icons.FileText,
      c: Icons.CircuitBoard,
      cpp: Icons.CircuitBoard,
      haskell: Icons.Code,
    };
    
    return iconMap[language.toLowerCase()] || Icons.File;
  };

  const getLanguageColor = (language: string): string => {
    const colorMap: Record<string, string> = {
      javascript: 'from-yellow-400 to-orange-500',
      typescript: 'from-blue-400 to-blue-600',
      python: 'from-blue-500 to-green-500',
      ruby: 'from-red-400 to-red-600',
      java: 'from-orange-400 to-red-500',
      csharp: 'from-purple-400 to-purple-600',
      go: 'from-blue-400 to-teal-500',
      html: 'from-orange-400 to-red-500',
      css: 'from-blue-400 to-indigo-600',
      bash: 'from-green-400 to-teal-600',
      json: 'from-amber-400 to-amber-600',
      sql: 'from-blue-400 to-indigo-500',
      yaml: 'from-green-400 to-emerald-600',
      rust: 'from-orange-500 to-red-600',
      jsx: 'from-blue-400 to-indigo-500',
      tsx: 'from-blue-400 to-violet-600',
      markdown: 'from-gray-400 to-gray-600',
      c: 'from-blue-400 to-blue-500',
      cpp: 'from-blue-500 to-purple-500',
      haskell: 'from-purple-400 to-indigo-500', // Theme for Haskell language
    };
    
    return colorMap[language.toLowerCase()] || 'from-primary to-primary/70';
  };

  const Icon = getLanguageIcon(snippet.language);
  const gradientColors = getLanguageColor(snippet.language);

  return (
    <div 
      onClick={onClick}
      className="group border rounded-lg p-4 hover:border-primary hover:shadow-md transition-all cursor-pointer duration-200 bg-card transform hover:scale-[1.02]"
    >
      <div className="flex items-center gap-2 mb-3">
        <div className={`p-2 rounded-md bg-gradient-to-br ${gradientColors} text-white`}>
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="text-lg font-medium">{snippet.title}</h3>
      </div>
      <p className="text-sm text-muted-foreground line-clamp-2">
        {snippet.description}
      </p>
      <div className="mt-3 pt-3 border-t border-border/50 flex justify-between items-center">
        <span className="text-xs capitalize text-muted-foreground">{snippet.language}</span>
        <span className="text-xs text-muted-foreground capitalize">
          {snippet.category.split('-').join(' ')}
        </span>
      </div>
    </div>
  );
}
