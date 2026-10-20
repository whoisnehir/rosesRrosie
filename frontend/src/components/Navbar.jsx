import { Link, NavLink } from 'react-router-dom';
import { Heart, ShoppingCart, User, Warehouse } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const menuLinks = [
    { to: '/new', label: 'New' },
    { to: '/collections', label: 'Collections' },
    { to: '/best-sellers', label: 'Best Sellers' },
    { to: '/shop', label: 'Shop All' },
];

const iconLinks = [
    { to: '/warehouses', label: 'Warehouses', Icon: Warehouse },
    { to: '/wishlist', label: 'Wishlist', Icon: Heart },
    { to: '/profile', label: 'Profile', Icon: User },
    { to: '/cart', label: 'Cart', Icon: ShoppingCart },
];

const Navbar = () => (
    <header className="sticky top-0 z-50 bg-card/90 backdrop-blur-md border-b border-line shadow-sm text-ink">
        <nav aria-label="Main" className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between gap-6">
            <Link to="/" className="text-2xl font-bold tracking-tighter">
                roses<span className="text-accent">R</span>rosie
            </Link>

            <ul className="flex items-center gap-8">
                {menuLinks.map(({ to, label }) => (
                    <li key={to}>
                        <NavLink
                            to={to}
                            className="text-xs font-bold uppercase tracking-widest hover:text-accent transition-colors"
                        >
                            {label}
                        </NavLink>
                    </li>
                ))}
            </ul>

            <div className="flex items-center gap-6">
                <ThemeToggle />
                {iconLinks.map(({ to, label, Icon }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className="flex flex-col items-center hover:text-accent transition-all group"
                    >
                        <span className="group-hover:scale-110 transition-transform">
                            <Icon size={20} />
                        </span>
                        <span className="text-[8px] uppercase font-bold mt-1 tracking-tighter">{label}</span>
                    </NavLink>
                ))}
            </div>
        </nav>
    </header>
);

export default Navbar;
