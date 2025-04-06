
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Loader2, X } from 'lucide-react'; // Added X to the imports
import { LanguageSection } from '@/lib/types';
import * as Icons from 'lucide-react';

// Import SVG icons
import javascriptIcon from '../snippets/javascript/icon.svg';
// Import other language icons similarly...

// Type for Lucide icon components
type IconComponent = typeof Icons.File;

interface SidebarProps {
  isOpen?: boolean;
  onToggle?: () => void;  // Made optional
  languageSections: LanguageSection[];
  onSelectCategory: (language: string, category: string) => void;
  currentLanguage: string | null;
  currentCategory: string | null;
  isLoading?: boolean;
}

export default function Sidebar({ 
  languageSections, 
  onSelectCategory,
  currentLanguage,
  currentCategory,
  isLoading = false,
  isOpen,
  onToggle
}: SidebarProps) {
  const [expandedLanguages, setExpandedLanguages] = useState<Record<string, boolean>>(
    languageSections.reduce((acc, section) => {
      acc[section.language] = true;
      return acc;
    }, {} as Record<string, boolean>)
  );

  const formatName = (name: string) => {
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const iconMap: Record<string, string> = {
    javascript: javascriptIcon,
    // Add other languages and their icons here...
  };

  const getIcon = (language: string): JSX.Element => {
    const iconSrc = iconMap[language.toLowerCase()];
    if (iconSrc) {
      return <img src={iconSrc} alt={`${language} icon`} className="h-4 w-4" />;
    }
    return <Icons.File className="h-4 w-4" />;
  };

  const toggleLanguage = (language: string) => {
    setExpandedLanguages(prev => ({
      ...prev,
      [language]: !prev[language]
    }));
  };

  if (isLoading) {
    return (
      <div className="pb-12 w-64 border-r h-[calc(100vh-3.5rem)] overflow-auto flex items-center justify-center">
        <div className="flex flex-col items-center space-y-2">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`pb-12 w-64 border-r h-[calc(100vh-3.5rem)] overflow-auto fixed md:relative z-40 bg-background transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
      <div className="flex justify-end md:hidden p-2">
        <button 
          onClick={onToggle}
          className="p-2 rounded-md hover:bg-accent"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Languages
          </h2>
          <div className="space-y-1">
            {languageSections.map((section) => (
              <div key={section.language} className="space-y-1">
                <button
                  className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground rounded-md"
                  onClick={() => toggleLanguage(section.language)}
                >
                  <div className="flex items-center gap-2">
                    {getIcon(section.language)}
                    <span>{formatName(section.language)}</span>
                  </div>
                  {expandedLanguages[section.language] ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
                
                {expandedLanguages[section.language] && (
                  <div className="ml-4 pl-4 border-l space-y-1">
                    {section.categories.map((category) => (
                      <button
                        key={`${section.language}-${category.name}`}
                        className={`w-full flex items-center px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md ${
                          currentLanguage === section.language && 
                          currentCategory === category.name ? 
                          'bg-accent text-accent-foreground' : ''
                        }`}
                        onClick={() => onSelectCategory(section.language, category.name)}
                      >
                        {formatName(category.name)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
