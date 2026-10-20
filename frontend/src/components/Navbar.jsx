import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Heart, Menu, ShoppingCart, User, Warehouse, X } from 'lucide-react';
import CollectionsMenu from './CollectionsMenu';
import MobileMenu from './MobileMenu';
import ThemeToggle from './ThemeToggle';

const menuLinks = [
    { to: '/new', label: 'New' },
    { to: '/collections', label: 'Collections', hasDropdown: true },
    { to: '/best-sellers', label: 'Best Sellers' },
    { to: '/shop', label: 'Shop All' },
];

const iconLinks = [
    { to: '/warehouses', label: 'Warehouses', Icon: Warehouse },
    { to: '/wishlist', label: 'Wishlist', Icon: Heart },
    { to: '/cart', label: 'Cart', Icon: ShoppingCart },
    { to: '/profile', label: 'Profile', Icon: User },
];

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const headerRef = useRef(null);

    // While the mobile menu is open, close it on a click outside the header or on the Escape key.
    useEffect(() => {
        if (!isMenuOpen) {
            return;
        }

        function handleClickOutside(event) {
            if (!headerRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        }

        function handleEscape(event) {
            if (event.key === 'Escape') {
                setIsMenuOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isMenuOpen]);

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <header
            ref={headerRef}
            className="sticky top-0 z-50 bg-card/90 backdrop-blur-md border-b border-line shadow-sm text-ink"
        >
            <nav
                aria-label="Main"
                className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between gap-6"
            >
                <Link to="/" onClick={closeMenu} className="text-2xl font-bold tracking-tighter">
                    roses<span className="text-accent">R</span>rosie
                </Link>

                <ul className="hidden md:flex items-center gap-5 lg:gap-8 whitespace-nowrap">
                    {menuLinks.map(({ to, label, hasDropdown }) => (
                        <li key={to}>
                            {hasDropdown ? (
                                <CollectionsMenu />
                            ) : (
                                <NavLink
                                    to={to}
                                    className="relative py-1 text-xs font-bold uppercase tracking-widest transition-colors hover:text-accent after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-accent after:transition-all aria-[current=page]:text-accent aria-[current=page]:after:w-full"
                                >
                                    {label}
                                </NavLink>
                            )}
                        </li>
                    ))}
                </ul>

                <div className="hidden md:flex items-center gap-4 lg:gap-6">
                    <ThemeToggle />
                    {iconLinks.map(({ to, label, Icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            aria-label={label}
                            className="flex flex-col items-center hover:text-accent transition-all group aria-[current=page]:text-accent"
                        >
                            <span className="group-hover:scale-110 transition-transform">
                                <Icon size={20} />
                            </span>
                            <span className="hidden lg:block text-[8px] uppercase font-bold mt-1 tracking-tighter">
                                {label}
                            </span>
                        </NavLink>
                    ))}
                </div>

                <div className="flex md:hidden items-center gap-5">
                    <NavLink
                        to="/cart"
                        onClick={closeMenu}
                        aria-label="Cart"
                        className="hover:text-accent aria-[current=page]:text-accent"
                    >
                        <ShoppingCart size={22} />
                    </NavLink>
                    <button
                        type="button"
                        onClick={() => setIsMenuOpen((open) => !open)}
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile-menu"
                        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                        className="hover:text-accent"
                    >
                        {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
                    </button>
                </div>
            </nav>

            {isMenuOpen && (
                <MobileMenu id="mobile-menu" menuLinks={menuLinks} iconLinks={iconLinks} onNavigate={closeMenu} />
            )}
        </header>
    );
};

export default Navbar;
