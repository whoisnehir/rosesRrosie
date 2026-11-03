import { Link, useLocation } from 'react-router-dom';
import { HelpCircle } from 'lucide-react';

// The floating help button in the bottom-right corner. It leads to the Help page, so it hides on that page.
const HelpButton = () => {
    const { pathname } = useLocation();

    if (pathname === '/help') {
        return null;
    }

    return (
        <Link
            to="/help"
            aria-label="Help"
            title="Help"
            className="h-11 w-11 grid place-items-center rounded-full bg-accent text-on-accent shadow-lg transition-colors hover:bg-accent-hover"
        >
            <HelpCircle size={22} aria-hidden="true" />
        </Link>
    );
};

export default HelpButton;