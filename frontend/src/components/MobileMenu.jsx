import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { collections } from '../data/collections';
import ThemeToggle from './ThemeToggle';

const linkClass = 'py-3 text-sm font-bold uppercase tracking-widest hover:text-accent aria-[current=page]:text-accent';
const subLinkClass = 'block py-2 text-sm italic hover:text-accent aria-[current=page]:text-accent';

// The full-height navigation shown under the header on narrow screens; onNavigate closes it after a link is chosen.
const MobileMenu = ({ id, menuLinks, iconLinks, onNavigate }) => {
    const { pathname } = useLocation();
    const isInCollections = pathname.startsWith('/collections');
    // The Collections list starts open when the visitor is already on a collection page.
    const [isCollectionsOpen, setIsCollectionsOpen] = useState(isInCollections);

    return (
        <div id={id} className="md:hidden flex-1 overflow-y-auto border-t border-line/40 px-6 pb-8">
            <ul className="divide-y divide-line/30">
                {menuLinks.map(({ to, label, hasDropdown }) => (
                    <li key={to}>
                        {hasDropdown ? (
                            <>
                                <button
                                    type="button"
                                    onClick={() => setIsCollectionsOpen((open) => !open)}
                                    aria-expanded={isCollectionsOpen}
                                    aria-controls="mobile-collections"
                                    className={`w-full flex items-center justify-between ${linkClass} ${isInCollections ? 'text-accent' : ''}`}
                                >
                                    {label}
                                    <ChevronDown
                                        size={18}
                                        className={`transition-transform ${isCollectionsOpen ? 'rotate-180' : ''}`}
                                    />
                                </button>
                                {isCollectionsOpen && (
                                    <ul id="mobile-collections" className="pb-3 pl-4">
                                        {collections.map(({ name, slug }) => (
                                            <li key={slug}>
                                                <NavLink
                                                    to={`/collections/${slug}`}
                                                    onClick={onNavigate}
                                                    className={subLinkClass}
                                                >
                                                    {name}
                                                </NavLink>
                                            </li>
                                        ))}
                                        <li>
                                            <NavLink to={to} end onClick={onNavigate} className={subLinkClass}>
                                                View all collections
                                            </NavLink>
                                        </li>
                                    </ul>
                                )}
                            </>
                        ) : (
                            <NavLink to={to} onClick={onNavigate} className={`block ${linkClass}`}>
                                {label}
                            </NavLink>
                        )}
                    </li>
                ))}
                {iconLinks.map(({ to, label, Icon }) => (
                    <li key={to}>
                        <NavLink to={to} onClick={onNavigate} className={`flex items-center gap-3 ${linkClass}`}>
                            <Icon size={18} /> {label}
                        </NavLink>
                    </li>
                ))}
            </ul>
            <div className="pt-4 flex justify-end">
                <ThemeToggle />
            </div>
        </div>
    );
};

export default MobileMenu;
