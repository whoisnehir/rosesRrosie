import { Link } from 'react-router-dom';
import { infoLinks, menuLinks } from '../data/navigation';
import { socialLinks } from '../data/socialLinks';

const BRAND_TAGLINE = 'Makeup collections and collaborations by rosesRrosie.';

const footerColumns = [
    { title: 'Shop', links: menuLinks },
    { title: 'Help', links: infoLinks },
];

const Footer = ({ onOpenCookieSettings }) => (
    <footer className="border-t border-line/40 bg-card/50 text-ink">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 grid grid-cols-2 gap-10 md:grid-cols-[2fr_1fr_1fr]">
            <div className="col-span-2 md:col-span-1">
                <Link to="/" className="text-2xl font-bold tracking-tighter">
                    roses<span className="text-accent">R</span>rosie
                </Link>
                <p className="mt-3 text-sm italic text-secondary">{BRAND_TAGLINE}</p>
                <ul className="mt-6 flex items-center gap-5">
                    {socialLinks.map(({ name, href, Icon }) => (
                        <li key={name}>
                            <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${name} (demo link)`}
                                title={`${name} (demo link)`}
                                className="block hover:text-accent transition-colors"
                            >
                                <Icon size={20} aria-hidden="true" />
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            {footerColumns.map(({ title, links }) => (
                <nav key={title} aria-label={title}>
                    <h2 className="mb-4 text-xs font-bold uppercase tracking-widest">{title}</h2>
                    <ul className="space-y-2">
                        {links.map(({ to, label }) => (
                            <li key={to}>
                                <Link to={to} className="text-sm text-secondary hover:text-accent transition-colors">
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            ))}
        </div>

        {/* The right side stays free, so the floating buttons never cover this last line (or Cookie settings). */}
        <div className="max-w-7xl mx-auto pl-6 lg:pl-8 pr-20 py-5 flex flex-col items-start gap-2 text-xs text-muted md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} rosesRrosie · Demo project. No real products are sold.</p>
            {onOpenCookieSettings && (
                <button type="button" onClick={onOpenCookieSettings} className="underline hover:text-accent">
                    Cookie settings
                </button>
            )}
        </div>
    </footer>
);

export default Footer;
