
import { useState, useEffect } from 'react';
import { Moon, Sun, Search, Github, ChevronRight } from 'lucide-react'; // Added ChevronRight to the imports
import { Input } from "@/components/ui/input";
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onSearch: (query: string) => void;
  onToggleSidebar: () => void;
}

export default function Header({ onSearch, onToggleSidebar }: HeaderProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>(
    localStorage.getItem('theme') as 'light' | 'dark' || 'dark'
  );
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Set dark theme as default on first load
  useEffect(() => {
    if (!localStorage.getItem('theme')) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <button
          onClick={onToggleSidebar}
          className="flex h-9 w-9 items-center justify-center rounded-md border hover:bg-accent transition-colors duration-200 md:hidden"
        >
          <ChevronRight className="h-5 w-5" />
          <span className="sr-only">Toggle Sidebar</span>
        </button>
        <div className="flex items-center ml-4 space-x-2" onClick={() => navigate('/')}>
          <div className="flex items-center">
            <img src="/favicon.ico" alt="Snippify Logo" className="h-16 w-20 mr-2" />
            <span className="font-bold text-2xl cursor-pointer bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Snippify</span>
          </div>
        </div>
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full md:w-2/3 lg:w-1/2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search snippets..."
                className="pl-8 transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                onChange={handleSearchChange}
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/sampathvenur/Snippify.git"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-md border hover:bg-accent transition-colors duration-200"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
            
            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-md border hover:bg-accent transition-colors duration-200"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle theme</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
