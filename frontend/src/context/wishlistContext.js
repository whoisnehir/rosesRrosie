import { createContext } from 'react';

// The wishlist, shared by every component inside WishlistProvider: the product cards and the Wishlist page.
export const WishlistContext = createContext(null);
