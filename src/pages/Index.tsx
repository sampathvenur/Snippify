
import { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import SnippetGrid from '@/components/SnippetGrid';
import SnippetModal from '@/components/SnippetModal';
import { Snippet } from '@/lib/types';
import { useSnippets, useSnippetsByCategory, useSearchSnippets } from '@/hooks/useSnippets';
import WelcomeScreen from '@/components/WelcomeScreen';

export default function Index() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<string | null>(null);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [selectedSnippet, setSelectedSnippet] = useState<Snippet | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Define the formatName function before it's used
  const formatName = (name: string) => {
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  // Get snippets data
  const { data, isLoading } = useSnippets();
  const snippetsByCategory = useSnippetsByCategory(currentLanguage, currentCategory);
  const searchResults = useSearchSnippets(searchQuery);
  
  // Determine which snippets to display
  let displayedSnippets: Snippet[] = [];
  let pageTitle = 'All Snippets';
  let showWelcomeScreen = false;
  
  if (searchQuery) {
    displayedSnippets = searchResults;
    pageTitle = `Search Results: ${searchQuery}`;
  } else if (currentLanguage && currentCategory) {
    displayedSnippets = snippetsByCategory;
    pageTitle = `${formatName(currentLanguage)} - ${formatName(currentCategory)}`;
  } else if (data?.snippets) {
    // Instead of showing all snippets, show welcome screen
    showWelcomeScreen = true;
    displayedSnippets = [];
  }

  const handleSelectCategory = (language: string, category: string) => {
    setCurrentLanguage(language);
    setCurrentCategory(category);
    setSearchQuery('');
    setIsSidebarOpen(false); // Close the sidebar after selecting a category
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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      <Header onSearch={handleSearch} onToggleSidebar={toggleSidebar} />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          languageSections={data?.languageSections || []}
          onSelectCategory={handleSelectCategory}
          currentLanguage={currentLanguage}
          currentCategory={currentCategory}
          isLoading={isLoading}
          isOpen={isSidebarOpen}
          onToggle={toggleSidebar}
        />
        
        <main className={`flex-1 overflow-y-auto ${isSidebarOpen ? 'hidden md:block' : 'block'}`}>
          {showWelcomeScreen ? (
            <WelcomeScreen />
          ) : (
            <SnippetGrid
              snippets={displayedSnippets}
              onSelectSnippet={handleSelectSnippet}
              title={pageTitle}
              isLoading={isLoading}
            />
          )}
        </main>
      </div>
      
      <SnippetModal
        snippet={selectedSnippet}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
