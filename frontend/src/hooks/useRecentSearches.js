import { useState } from 'react';

const STORAGE_KEY = 'recentSearches';
const MAX_SEARCHES = 5;

// Reads the saved list; anything missing or broken counts as an empty list.
function readSavedSearches() {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
        return Array.isArray(saved) ? saved : [];
    } catch {
        return [];
    }
}

// The visitor's last searches, newest first, kept in the browser between visits.
export function useRecentSearches() {
    const [searches, setSearches] = useState(readSavedSearches);

    function save(nextSearches) {
        setSearches(nextSearches);
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSearches));
        } catch {
            // Storage can be blocked; the list works until the page is closed
        }
    }

    function addSearch(term) {
        const others = searches.filter((search) => search.toLowerCase() !== term.toLowerCase());
        save([term, ...others].slice(0, MAX_SEARCHES));
    }

    function removeSearch(term) {
        save(searches.filter((search) => search !== term));
    }

    function clearSearches() {
        save([]);
    }

    return { searches, addSearch, removeSearch, clearSearches };
}
