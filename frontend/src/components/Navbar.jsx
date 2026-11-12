import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Heart, Menu, Search, ShoppingCart, User, Warehouse, X, UserCheck } from 'lucide-react';
import CollectionsMenu from './CollectionsMenu';
import MobileMenu from './MobileMenu';
import SearchBar from './SearchBar';
import ThemeToggle from './ThemeToggle';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { menuLinks } from '../data/navigation';
import CartCount from './CartCount';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';

const iconLinks = [
    { to: '/warehouses', label: 'Warehouses', Icon: Warehouse },
    { to: '/wishlist', label: 'Wishlist', Icon: Heart },
    { to: '/cart', label: 'Cart', Icon: ShoppingCart },
];

// On phones, the cart (and the account link) sit in the header itself, so the menu panel lists only the other pages.
const mobileMenuIconLinks = iconLinks.filter(({ to }) => to !== '/cart');

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const isDesktop = useMediaQuery('(min-width: 768px)');
    // On phones the menu and the search fill the screen under the header; on desktop the menu does not exist.
    const isPhonePanelOpen = !isDesktop && (isMenuOpen || isSearchOpen);
    const { count } = useCart();
    const { session } = useAuth();
    // Signed in: the account icon leads to the profile (or the admin panel) and says so; otherwise to Sign in.
    // label is the full name for screen readers; shortLabel is the word shown under the icon on desktop.
    const account =
        session === null
            ? { to: '/login', label: 'Sign in', shortLabel: 'Sign in', Icon: User }
            : session.role === 'ADMIN'
              ? { to: '/admin', label: 'Admin panel, signed in', shortLabel: 'Admin', Icon: UserCheck }
              : { to: '/profile', label: 'Profile, signed in', shortLabel: 'Profile', Icon: UserCheck };
    // The cart's name for screen readers says how many pieces it holds, because the bubble is only seen.
    const cartLabel = count === 0 ? 'Cart' : `Cart, ${count} ${count === 1 ? 'item' : 'items'}`;

    // While a panel is open, Escape closes it; while a phone panel is open, the page behind it cannot scroll.
    useEffect(() => {
        if (!isMenuOpen && !isSearchOpen) {
            return;
        }

        function handleEscape(event) {
            if (event.key === 'Escape') {
                setIsMenuOpen(false);
                setIsSearchOpen(false);
            }
        }

        document.body.style.overflow = isPhonePanelOpen ? 'hidden' : '';
        document.addEventListener('keydown', handleEscape);

        return () => {
            document.body.style.overflow = '';
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isMenuOpen, isSearchOpen, isPhonePanelOpen]);

    const closeMenu = () => setIsMenuOpen(false);
    const closeSearch = () => setIsSearchOpen(false);

    // Only one panel is open at a time: opening one closes the other.
    function toggleMenu() {
        setIsSearchOpen(false);
        setIsMenuOpen((open) => !open);
    }

    function toggleSearch() {
        setIsMenuOpen(false);
        setIsSearchOpen((open) => !open);
    }

    return (
        <header
            className={`sticky top-0 z-50 backdrop-blur-md border-b border-line shadow-sm text-ink ${isPhonePanelOpen ? 'h-dvh flex flex-col bg-card' : 'bg-card/90'}`}
        >
            <nav
                aria-label="Main"
                className="w-full max-w-7xl mx-auto px-6 lg:px-8 py-2.5 md:py-4 grid grid-cols-[1fr_auto_1fr] items-center gap-1 md:flex md:justify-between md:gap-4 lg:gap-6"
            >
                <div className="flex md:hidden items-center -ml-2.5">
                    <button
                        type="button"
                        onClick={toggleMenu}
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile-menu"
                        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                        className="inline-flex items-center justify-center size-11 hover:text-accent"
                    >
                        {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
                    </button>
                    <SearchToggle isOpen={isSearchOpen} onToggle={toggleSearch} controls="mobile-search" />
                </div>

                <Link to="/" onClick={closeMenu} className="text-2xl font-bold tracking-tighter">
                    roses<span className="text-accent">R</span>rosie
                </Link>

                {isDesktop && isSearchOpen ? (
                    <div className="flex flex-1 items-center gap-6">
                        <SearchBar id="desktop-search" variant="inline" onDone={closeSearch} />
                        <SearchToggle isOpen onToggle={toggleSearch} controls="desktop-search" showLabel />
                    </div>
                ) : (
                    <>
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

                        <div className="hidden md:flex items-center gap-3 lg:gap-6">
                            <SearchToggle isOpen={false} onToggle={toggleSearch} controls="desktop-search" showLabel />
                            <ThemeToggle />
                            {[...iconLinks, account].map(({ to, label, shortLabel = label, Icon }) => (
                                <NavLink
                                    key={to}
                                    to={to}
                                    aria-label={to === '/cart' ? cartLabel : label}
                                    className="flex flex-col items-center justify-center min-w-6 min-h-6 hover:text-accent transition-all group aria-[current=page]:text-accent"
                                >
                                    <span className="relative group-hover:scale-110 transition-transform">
                                        <Icon size={20} />
                                        {to === '/cart' && <CartCount count={count} />}
                                    </span>
                                    <span className="hidden lg:block text-[11px] uppercase font-bold mt-1 tracking-tighter">
                                        {shortLabel}
                                    </span>
                                </NavLink>
                            ))}
                        </div>
                    </>
                )}

                <div className="flex md:hidden items-center justify-end -mr-2.5">
                    <NavLink
                        to={account.to}
                        onClick={closeMenu}
                        aria-label={account.label}
                        className="inline-flex items-center justify-center size-11 hover:text-accent aria-[current=page]:text-accent"
                    >
                        <account.Icon size={22} />
                    </NavLink>
                    <NavLink
                        to="/cart"
                        onClick={closeMenu}
                        aria-label={cartLabel}
                        className="inline-flex items-center justify-center size-11 hover:text-accent aria-[current=page]:text-accent"
                    >
                        {/* The bubble is placed against this span, so it stays on the icon's corner. */}
                        <span className="relative">
                            <ShoppingCart size={22} />
                            <CartCount count={count} />
                        </span>
                    </NavLink>
                </div>
            </nav>

            {!isDesktop && isSearchOpen && (
                <div className="flex-1 overflow-y-auto border-t border-line/40">
                    <SearchBar id="mobile-search" variant="panel" onDone={closeSearch} />
                </div>
            )}

            {!isDesktop && isMenuOpen && (
                <MobileMenu
                    id="mobile-menu"
                    menuLinks={menuLinks}
                    iconLinks={mobileMenuIconLinks}
                    onNavigate={closeMenu}
                />
            )}
        </header>
    );
};

// The search icon, which turns into X while the search is open.
// On desktop it has a label under it, like the other icons; on phones it is the icon alone.
const SearchToggle = ({ isOpen, onToggle, controls, showLabel = false }) => (
    <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={controls}
        aria-label={isOpen ? 'Close search' : 'Open search'}
        className={`flex flex-col items-center justify-center hover:text-accent transition-all group ${showLabel ? 'min-w-6 min-h-6' : 'size-11'}`}
    >
        <span className="group-hover:scale-110 transition-transform">
            {isOpen ? <X size={showLabel ? 20 : 22} /> : <Search size={showLabel ? 20 : 22} />}
        </span>
        {showLabel && (
            <span className="hidden lg:block text-[11px] uppercase font-bold mt-1 tracking-tighter">
                {isOpen ? 'Close' : 'Search'}
            </span>
        )}
    </button>
);

export default Navbar;
