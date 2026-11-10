import { useState } from 'react';
import { WishlistContext } from './wishlistContext';
import { wishlistService } from '../services/wishlistService';
import { toggleId } from '../utils/wishlistItems';

// Holds the saved product ids for the whole site; every change is shown at once and saved through wishlistService.
const WishlistProvider = ({ children }) => {
    const [ids, setIds] = useState(wishlistService.load);

    const wishlist = {
        ids,
        has: (productId) => ids.includes(productId),
        toggle: (productId) => {
            const nextIds = toggleId(ids, productId);
            setIds(nextIds);
            wishlistService.save(nextIds);
        },
    };

    return <WishlistContext.Provider value={wishlist}>{children}</WishlistContext.Provider>;
};

export default WishlistProvider;
