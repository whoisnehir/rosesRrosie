// The cart lives in this browser (localStorage) until the backend has carts and orders (#36).
// CartProvider only calls these two functions, so switching to the API changes this file alone.
const STORAGE_KEY = 'cart';

export const cartService = {
    // The saved cart; anything missing or broken counts as an empty cart.
    load: () => {
        try {
            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
            return Array.isArray(saved) ? saved : [];
        } catch {
            return [];
        }
    },

    save: (items) => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        } catch {
            // Storage can be blocked; the cart works until the page is closed
        }
    },
};
