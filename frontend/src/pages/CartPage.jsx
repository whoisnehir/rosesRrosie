import { ShoppingBag } from 'lucide-react';

const CartPage = () => (
    <div className="min-h-screen bg-page flex items-center justify-center font-serif">
        <div className="text-center bg-card p-20 rounded-[3rem] border-4 border-line shadow-2xl">
            <ShoppingBag size={64} className="mx-auto text-accent mb-6 opacity-40" />
            <h1 className="text-3xl text-ink mb-4 tracking-tighter">Your Shopping Bag is empty</h1>
            <p className="text-secondary italic">The roses are waiting for you.</p>
        </div>
    </div>
);

export default CartPage;
