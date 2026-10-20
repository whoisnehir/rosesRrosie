import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { collections } from '../data/collections';

const CollectionsMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const { pathname } = useLocation();
    const isActive = pathname.startsWith('/collections');

    // While the list is open, close it on a click outside it or on the Escape key.
    useEffect(() => {
        if (!isOpen) {
            return;
        }

        function handleClickOutside(event) {
            if (!menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        function handleEscape(event) {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen]);

    const closeMenu = () => setIsOpen(false);

    return (
        <div ref={menuRef} className="relative">
            <button
                type="button"
                onClick={() => setIsOpen((open) => !open)}
                aria-expanded={isOpen}
                aria-controls="collections-menu"
                className={`relative py-1 flex items-center gap-1 text-xs font-bold uppercase tracking-widest transition-colors hover:text-accent after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-accent after:transition-all ${isActive ? 'text-accent after:w-full' : 'after:w-0'}`}
            >
                Collections
                <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <ul
                    id="collections-menu"
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-4 w-64 bg-card border border-line rounded-2xl shadow-xl py-3"
                >
                    {collections.map(({ name, slug }) => (
                        <li key={slug}>
                            <Link
                                to={`/collections/${slug}`}
                                onClick={closeMenu}
                                className="block px-6 py-2 text-sm italic text-ink hover:bg-surface hover:text-accent transition-colors"
                            >
                                {name}
                            </Link>
                        </li>
                    ))}
                    <li className="mt-2 pt-2 border-t border-line/40">
                        <Link
                            to="/collections"
                            onClick={closeMenu}
                            className="block px-6 py-2 text-[10px] font-bold uppercase tracking-widest text-secondary hover:text-accent transition-colors"
                        >
                            View all collections
                        </Link>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default CollectionsMenu;
