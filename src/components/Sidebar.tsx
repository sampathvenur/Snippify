
import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { LanguageSection } from '@/lib/types';
import * as Icons from 'lucide-react';

// Type for Lucide icon components
type IconComponent = typeof Icons.File;

interface SidebarProps {
  languageSections: LanguageSection[];
  onSelectCategory: (language: string, category: string) => void;
  currentLanguage: string | null;
  currentCategory: string | null;
}

export default function Sidebar({ 
  languageSections, 
  onSelectCategory,
  currentLanguage,
  currentCategory 
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

  const getIcon = (iconName: string): IconComponent => {
    // Default to File icon if the specified icon doesn't exist
    return (Icons as any)[iconName] || Icons.File;
  };

  const toggleLanguage = (language: string) => {
    setExpandedLanguages(prev => ({
      ...prev,
      [language]: !prev[language]
    }));
  };

  return (
    <div className="pb-12 w-64 border-r h-[calc(100vh-3.5rem)] overflow-auto">
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
                    {React.createElement(getIcon(section.icon), { className: "h-4 w-4" })}
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
