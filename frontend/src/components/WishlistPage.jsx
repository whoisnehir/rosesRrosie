import React from 'react';
import { Heart } from 'lucide-react';

const WishlistPage = () => (
    <div className="min-h-screen bg-[#FFF5F6] p-20 font-serif">
        <div className="max-w-2xl mx-auto text-center">
            <Heart size={48} className="mx-auto text-[#E8B4B8] fill-[#E8B4B8] mb-6 animate-pulse" />
            <h1 className="text-4xl text-[#5C4033] italic mb-8">Your Precious Wishlist</h1>
            <p className="text-[#A67C52]">Only authenticated dreamers can save their favorite flowers here.</p>
        </div>
    </div>
);

export default WishlistPage;