import React from 'react';
import { ShoppingBag } from 'lucide-react';

const CartPage = () => (
    <div className="min-h-screen bg-[#FFF5F6] flex items-center justify-center font-serif">
        <div className="text-center bg-white p-20 rounded-[3rem] border-[4px] border-[#E8B4B8] shadow-2xl">
            <ShoppingBag size={64} className="mx-auto text-[#E8B4B8] mb-6 opacity-40" />
            <h1 className="text-3xl text-[#5C4033] mb-4 tracking-tighter">Your Shopping Bag is empty</h1>
            <p className="text-[#A67C52] italic">The roses are waiting for you.</p>
        </div>
    </div>
);

export default CartPage;