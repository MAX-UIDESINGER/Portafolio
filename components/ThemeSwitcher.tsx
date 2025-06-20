"use client";
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useState, useRef, useEffect } from 'react';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar dropdown cuando se hace click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const themes = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor },
  ];

  const currentTheme = themes.find(t => t.value === theme);
  const CurrentIcon = currentTheme?.icon || Monitor;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
        aria-label="Toggle theme"
      >
        <CurrentIcon className="w-4 h-4 text-foreground" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-card border border-border rounded-lg shadow-lg z-50 overflow-hidden">
          {themes.map((themeOption) => {
            const Icon = themeOption.icon;
            return (
              <button
                key={themeOption.value}
                onClick={() => {
                  setTheme(themeOption.value as any);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center px-3 py-2 text-sm hover:bg-secondary transition-colors ${
                  theme === themeOption.value 
                    ? 'bg-secondary text-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {themeOption.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;