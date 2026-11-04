import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const WishlistPage = () => (
    <div className="flex-1 p-20 font-serif">
        <div className="max-w-2xl mx-auto text-center">
            <Heart size={48} className="mx-auto text-accent fill-accent mb-6 animate-pulse" />
            <h1 className="text-4xl text-ink italic mb-8">Your Precious Wishlist</h1>
            {/* Saving products comes with the working wishlist; until then the page says so. */}
            <p className="text-secondary">
                Saving your favourite products is coming soon. Until then, explore{' '}
                <Link to="/shop" className="text-accent underline hover:text-accent-hover">
                    Shop All
                </Link>
                .
            </p>
        </div>
    </div>
);

export default WishlistPage;
