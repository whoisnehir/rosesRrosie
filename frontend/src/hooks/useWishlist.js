import { useContext } from 'react';
import { WishlistContext } from '../context/wishlistContext';

// The shared wishlist: { ids, has, toggle }. Works only inside WishlistProvider.
export const useWishlist = () => useContext(WishlistContext);
