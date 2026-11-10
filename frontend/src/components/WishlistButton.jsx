import { Heart } from 'lucide-react';
import { useWishlist } from '../hooks/useWishlist';

// The wishlist heart: an outline when the product is not saved, filled when it is.
// aria-pressed tells screen readers whether the button is on or off.
// "card" sits in the corner of a product card's image; "page" stands next to Add to cart on the product page.
const VARIANT_CLASSES = {
    card: 'absolute top-3 right-3 p-2 bg-card/90 shadow-sm hover:scale-110',
    page: 'p-4 border border-line hover:border-accent',
};

const WishlistButton = ({ productId, productName, variant = 'card' }) => {
    const { has, toggle } = useWishlist();
    const isSaved = has(productId);

    return (
        <button
            type="button"
            onClick={() => toggle(productId)}
            aria-pressed={isSaved}
            aria-label={`Save ${productName} to your wishlist`}
            className={`rounded-full text-accent transition-transform ${VARIANT_CLASSES[variant]}`}
        >
            <Heart size={18} aria-hidden="true" className={isSaved ? 'fill-accent' : ''} />
        </button>
    );
};

export default WishlistButton;
