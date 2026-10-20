import { Heart } from 'lucide-react';

const WishlistPage = () => (
    <div className="flex-1 p-20 font-serif">
        <div className="max-w-2xl mx-auto text-center">
            <Heart size={48} className="mx-auto text-accent fill-accent mb-6 animate-pulse" />
            <h1 className="text-4xl text-ink italic mb-8">Your Precious Wishlist</h1>
            <p className="text-secondary">Only authenticated dreamers can save their favorite flowers here.</p>
        </div>
    </div>
);

export default WishlistPage;
