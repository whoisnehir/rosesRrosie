import { useNavigate, useSearchParams } from 'react-router-dom';
import { Clock, Search, X } from 'lucide-react';
import { useRecentSearches } from '../hooks/useRecentSearches';

// The search form and the visitor's recent searches.
// "inline" sits inside the desktop navbar with the list as a dropdown; "panel" fills the phone screen.
const SearchBar = ({ id, variant, onDone }) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { searches, addSearch, removeSearch, clearSearches } = useRecentSearches();
    const isInline = variant === 'inline';

    function runSearch(term) {
        addSearch(term);
        navigate(`/search?q=${encodeURIComponent(term)}`);
        onDone();
    }

    function handleSubmit(event) {
        event.preventDefault();
        const term = new FormData(event.currentTarget).get('q').trim();
        if (term) {
            runSearch(term);
        }
    }

    return (
        <div id={id} className={isInline ? 'relative flex-1' : 'px-6 py-4'}>
            <form role="search" onSubmit={handleSubmit} className="flex items-center gap-3">
                <input
                    type="search"
                    name="q"
                    defaultValue={searchParams.get('q') ?? ''}
                    placeholder="Search products and collections"
                    aria-label="Search products and collections"
                    autoFocus
                    onFocus={(event) => event.target.select()}
                    className="flex-1 min-w-0 bg-surface rounded-full px-5 py-3 text-sm text-ink placeholder:text-muted outline-none border border-transparent focus:border-line [&::-webkit-search-cancel-button]:appearance-none"
                />
                <button
                    type="submit"
                    aria-label="Search"
                    className="p-3 rounded-full bg-primary text-on-primary hover:bg-primary-hover transition-colors"
                >
                    <Search size={18} />
                </button>
            </form>

            {searches.length > 0 && (
                <section
                    aria-label="Recent searches"
                    className={
                        isInline
                            ? 'absolute left-0 right-0 top-full mt-3 bg-card border border-line rounded-2xl shadow-xl py-3'
                            : 'mt-6'
                    }
                >
                    <div className="flex items-center justify-between px-5 pb-2">
                        <h2 className="text-[10px] font-bold uppercase tracking-widest text-secondary">
                            Recent searches
                        </h2>
                        <button
                            type="button"
                            onClick={clearSearches}
                            className="text-[10px] font-bold uppercase tracking-widest text-muted hover:text-accent"
                        >
                            Clear
                        </button>
                    </div>
                    <ul>
                        {searches.map((term) => (
                            <li key={term} className="flex items-center hover:bg-surface transition-colors">
                                <button
                                    type="button"
                                    onClick={() => runSearch(term)}
                                    className="flex-1 min-w-0 flex items-center gap-3 px-5 py-2 text-left text-sm text-ink"
                                >
                                    <Clock size={14} className="shrink-0 text-muted" />
                                    <span className="truncate">{term}</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => removeSearch(term)}
                                    aria-label={`Remove “${term}” from recent searches`}
                                    className="px-5 py-2 text-muted hover:text-accent"
                                >
                                    <X size={14} />
                                </button>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </div>
    );
};

export default SearchBar;
