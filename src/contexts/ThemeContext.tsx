import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface ThemeContextType {
  theme: 'light' | 'dark' | 'auto';
  colorScheme: string;
  fontSize: string;
  highContrast: boolean;
  reduceMotion: boolean;
  setTheme: (theme: 'light' | 'dark' | 'auto') => void;
  setColorScheme: (scheme: string) => void;
  setFontSize: (size: string) => void;
  setHighContrast: (enabled: boolean) => void;
  setReduceMotion: (enabled: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { user } = useAuth();
  const [theme, setThemeState] = useState<'light' | 'dark' | 'auto'>('light');
  const [colorScheme, setColorSchemeState] = useState('purple');
  const [fontSize, setFontSizeState] = useState('medium');
  const [highContrast, setHighContrastState] = useState(false);
  const [reduceMotion, setReduceMotionState] = useState(false);

  // Load theme settings from profile
  useEffect(() => {
    if (user) {
      loadThemeSettings();
    }
  }, [user]);

  const loadThemeSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('theme, color_scheme, font_size, high_contrast, reduce_motion')
        .eq('id', user?.id)
        .single();

      if (error) throw error;
      if (data) {
        const theme = data.theme as 'light' | 'dark' | 'auto' | null;
        if (theme) setThemeState(theme);
        if (data.color_scheme) setColorSchemeState(data.color_scheme);
        if (data.font_size) setFontSizeState(data.font_size);
        if (data.high_contrast !== undefined) setHighContrastState(data.high_contrast);
        if (data.reduce_motion !== undefined) setReduceMotionState(data.reduce_motion);
      }
    } catch (error) {
      console.error('Error loading theme settings:', error);
    }
  };

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    
    // Determine actual theme (resolve 'auto')
    let actualTheme = theme;
    if (theme === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      actualTheme = prefersDark ? 'dark' : 'light';
    }

    // Apply theme class
    root.classList.remove('light', 'dark');
    root.classList.add(actualTheme);

    // Listen for system theme changes if auto
    if (theme === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        root.classList.remove('light', 'dark');
        root.classList.add(e.matches ? 'dark' : 'light');
      };
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  // Apply color scheme
  useEffect(() => {
    const root = document.documentElement;
    
    const colorSchemes: Record<string, { primary: string; primaryForeground: string }> = {
      purple: { primary: '255 31% 64%', primaryForeground: '0 0% 100%' },
      blue: { primary: '213 94% 68%', primaryForeground: '0 0% 100%' },
      green: { primary: '142 69% 58%', primaryForeground: '0 0% 100%' },
      pink: { primary: '326 78% 68%', primaryForeground: '0 0% 100%' },
    };

    const colors = colorSchemes[colorScheme] || colorSchemes.purple;
    root.style.setProperty('--primary', colors.primary);
    root.style.setProperty('--primary-foreground', colors.primaryForeground);
  }, [colorScheme]);

  // Apply font size
  useEffect(() => {
    const root = document.documentElement;
    
    const fontSizes: Record<string, string> = {
      small: '14px',
      medium: '16px',
      large: '18px',
      'extra-large': '20px',
    };

    root.style.fontSize = fontSizes[fontSize] || fontSizes.medium;
  }, [fontSize]);

  // Apply high contrast
  useEffect(() => {
    const root = document.documentElement;
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
  }, [highContrast]);

  // Apply reduce motion
  useEffect(() => {
    const root = document.documentElement;
    if (reduceMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }
  }, [reduceMotion]);

  const setTheme = (newTheme: 'light' | 'dark' | 'auto') => {
    setThemeState(newTheme);
  };

  const setColorScheme = (scheme: string) => {
    setColorSchemeState(scheme);
  };

  const setFontSize = (size: string) => {
    setFontSizeState(size);
  };

  const setHighContrast = (enabled: boolean) => {
    setHighContrastState(enabled);
  };

  const setReduceMotion = (enabled: boolean) => {
    setReduceMotionState(enabled);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        colorScheme,
        fontSize,
        highContrast,
        reduceMotion,
        setTheme,
        setColorScheme,
        setFontSize,
        setHighContrast,
        setReduceMotion,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
