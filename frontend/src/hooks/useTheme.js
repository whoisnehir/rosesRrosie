import { useEffect, useState } from 'react';

const STORAGE_KEY = 'theme';

// The inline script in index.html has already applied the saved or system theme,
// so React starts from whatever is on <html> right now.
function getInitialTheme() {
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

export function useTheme() {
    const [theme, setTheme] = useState(getInitialTheme);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    function toggleTheme() {
        const nextTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(nextTheme);
        try {
            localStorage.setItem(STORAGE_KEY, nextTheme);
        } catch {
            // Storage can be blocked
        }
    }

    return { theme, toggleTheme };
}
