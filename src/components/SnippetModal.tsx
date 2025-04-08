
import { useState, useEffect } from 'react';
import { Check, Copy, X } from 'lucide-react';
import { Snippet } from '@/lib/types';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import Prism from 'prismjs';
import 'prismjs/components/prism-scss';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-regex';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-haskell';

interface SnippetModalProps {
  snippet: Snippet | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function SnippetModal({ snippet, isOpen, onClose }: SnippetModalProps) {
  const [copied, setCopied] = useState(false);

  // Apply syntax highlighting when the component mounts or snippet changes
  useEffect(() => {
    if (snippet && isOpen) {
      // Add a small delay to ensure the DOM is ready for Prism
      setTimeout(() => {
        Prism.highlightAll();
      }, 100);
    }
  }, [snippet, isOpen]);

  if (!snippet) return null;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    toast.success('Code copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  // Map the language from our app to Prism's language classes
  const getPrismLanguageClass = (language: string): string => {
    const languageMap: Record<string, string> = {
      javascript: 'language-javascript',
      typescript: 'language-typescript',
      python: 'language-python',
      ruby: 'language-ruby',
      java: 'language-java',
      csharp: 'language-csharp',
      go: 'language-go',
      html: 'language-markup',
      css: 'language-css',
      bash: 'language-bash',
      json: 'language-json',
      sql: 'language-sql',
      yaml: 'language-yaml',
      rust: 'language-rust',
      jsx: 'language-jsx',
      tsx: 'language-tsx',
      markdown: 'language-markdown',
      c: 'language-c',
      cpp: 'language-cpp',
      haskell: 'language-haskell',
      regex: 'language-regex',
      scss: 'language-scss', // Add this mapping for SCSS
    };
    
    return languageMap[language.toLowerCase()] || 'language-markup';
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <AlertDialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto animate-[scale-in_0.2s_ease-out] bg-card">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center justify-between">
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">{snippet.title}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={copyToClipboard}
                className="inline-flex items-center justify-center h-8 px-3 text-sm font-medium transition-colors rounded-md hover:bg-accent"
              >
                {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
              <AlertDialogCancel className="h-8 px-2 p-0 m-0">
                <X className="h-4 w-4" />
              </AlertDialogCancel>
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <span className="text-sm text-muted-foreground mb-2">
              By <span className="font-medium">{snippet.author}</span>
            </span>
            <span className="block mb-4">{snippet.description}</span> {/* Changed from <p> to <span> */}
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <div className="relative rounded-md overflow-hidden">
          <pre className="bg-code p-4 rounded-md overflow-x-auto border border-border transition-colors duration-300 shadow-md">
            <code className={`${getPrismLanguageClass(snippet.language)} text-sm font-mono`}>
              {snippet.code}
            </code>
          </pre>
        </div>
        
        <AlertDialogFooter className="mt-4">
          <div className="text-xs text-muted-foreground">
            Language: <span className="font-medium capitalize">{snippet.language}</span> | 
            Category: <span className="font-medium capitalize">
              {snippet.category.split('-').join(' ')}
            </span>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
