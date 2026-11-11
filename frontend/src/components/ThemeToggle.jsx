import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';
    const label = isDark ? 'Switch to light theme' : 'Switch to dark theme';

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label={label}
            title={label}
            className="flex flex-col items-center justify-center min-w-6 min-h-6 cursor-pointer hover:text-accent transition-all group"
        >
            <span className="group-hover:scale-110 transition-transform">
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </span>
            {/* Hidden only on tablets (768–1023px), like the other header labels; the phone menu and desktop keep it. */}
            <span className="md:max-lg:hidden text-[11px] uppercase font-bold mt-1 tracking-tighter">
                {isDark ? 'Light' : 'Dark'}
            </span>
        </button>
    );
};

export default ThemeToggle;
