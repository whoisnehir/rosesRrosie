// The wishlist lives in this browser (localStorage) until the backend keeps it in the user account.
// WishlistProvider only calls these two functions, so switching to the API changes this file alone.
const STORAGE_KEY = 'wishlist';

export const wishlistService = {
    // The saved product ids; anything missing or broken counts as an empty wishlist.
    load: () => {
        try {
            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
            return Array.isArray(saved) ? saved : [];
        } catch {
            return [];
        }
    },

    save: (ids) => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
        } catch {
            // Storage can be blocked; the wishlist works until the page is closed
        }
    },
};
