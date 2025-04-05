
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import SnippetGrid from '@/components/SnippetGrid';
import SnippetModal from '@/components/SnippetModal';
import { Snippet } from '@/lib/types';
import { 
  snippets, 
  languageSections, 
  getSnippetsByCategory,
  searchSnippets
} from '@/data/snippets';
import Footer from '@/components/Footer';

export default function Index() {
  const [currentLanguage, setCurrentLanguage] = useState<string | null>(null);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [displayedSnippets, setDisplayedSnippets] = useState<Snippet[]>([]);
  const [selectedSnippet, setSelectedSnippet] = useState<Snippet | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [pageTitle, setPageTitle] = useState('All Snippets');

  useEffect(() => {
    if (searchQuery) {
      setDisplayedSnippets(searchSnippets(searchQuery));
      setPageTitle(`Search Results: ${searchQuery}`);
      return;
    }
    
    if (currentLanguage && currentCategory) {
      const filteredSnippets = getSnippetsByCategory(currentLanguage, currentCategory);
      setDisplayedSnippets(filteredSnippets);
      setPageTitle(`${formatName(currentLanguage)} - ${formatName(currentCategory)}`);
    } else {
      setDisplayedSnippets(snippets);
      setPageTitle('All Snippets');
    }
  }, [currentLanguage, currentCategory, searchQuery]);

  const handleSelectCategory = (language: string, category: string) => {
    setCurrentLanguage(language);
    setCurrentCategory(category);
    setSearchQuery('');
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      setCurrentLanguage(null);
      setCurrentCategory(null);
    }
  };

  const handleSelectSnippet = (snippet: Snippet) => {
    setSelectedSnippet(snippet);
    setIsModalOpen(true);
  };

  const formatName = (name: string) => {
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      <Header onSearch={handleSearch} />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          languageSections={languageSections}
          onSelectCategory={handleSelectCategory}
          currentLanguage={currentLanguage}
          currentCategory={currentCategory}
        />
        
        <main className="flex-1 overflow-y-auto">
          <SnippetGrid
            snippets={displayedSnippets}
            onSelectSnippet={handleSelectSnippet}
            title={pageTitle}
          />
        </main>
      </div>
      
      <SnippetModal
        snippet={selectedSnippet}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      
      <Footer />
    </div>
  );
}
