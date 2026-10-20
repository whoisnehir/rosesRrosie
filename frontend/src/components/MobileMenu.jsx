import { NavLink } from 'react-router-dom';
import { collections } from '../data/collections';
import ThemeToggle from './ThemeToggle';

const linkClass = 'py-3 text-sm font-bold uppercase tracking-widest hover:text-accent aria-[current=page]:text-accent';

// The navigation shown under the header on narrow screens; onNavigate closes it after a link is chosen.
const MobileMenu = ({ id, menuLinks, iconLinks, onNavigate }) => (
    <div id={id} className="md:hidden border-t border-line/40 px-6 pb-6">
        <ul className="divide-y divide-line/30">
            {menuLinks.map(({ to, label, hasDropdown }) => (
                <li key={to}>
                    <NavLink to={to} end={hasDropdown} onClick={onNavigate} className={`block ${linkClass}`}>
                        {label}
                    </NavLink>
                    {hasDropdown && (
                        <ul className="pb-3 pl-4">
                            {collections.map(({ name, slug }) => (
                                <li key={slug}>
                                    <NavLink
                                        to={`/collections/${slug}`}
                                        onClick={onNavigate}
                                        className="block py-2 text-sm italic hover:text-accent aria-[current=page]:text-accent"
                                    >
                                        {name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
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

export default MobileMenu;
