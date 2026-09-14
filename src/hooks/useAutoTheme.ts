import { useEffect } from 'react';
import { useMantineColorScheme } from '@mantine/core';

const THEME_STORAGE_KEY = 'mantine-color-scheme';
const SESSION_STORAGE_KEY = 'theme-initialized';

export function useAutoTheme() {
  const { setColorScheme } = useMantineColorScheme();

  useEffect(() => {
    // Check if theme was already initialized in this session
    const isInitialized = sessionStorage.getItem(SESSION_STORAGE_KEY);
    
    if (isInitialized) {
      return; // Don't override user's choice during the session
    }

    // Check if user has manually set a theme preference
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    
    if (savedTheme && savedTheme !== 'auto') {
      // User has manually chosen a theme, don't override
      sessionStorage.setItem(SESSION_STORAGE_KEY, 'true');
      return;
    }

    // Set theme based on time of day
    const currentHour = new Date().getHours();
    const isDayTime = currentHour >= 8 && currentHour < 20;
    const themeToSet = isDayTime ? 'light' : 'dark';
    
    setColorScheme(themeToSet);
    sessionStorage.setItem(SESSION_STORAGE_KEY, 'true');
  }, [setColorScheme]);
}
