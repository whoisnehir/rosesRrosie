import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import { useWishlist } from '../hooks/useWishlist';
import { productService } from '../services/productService';

const WishlistPage = () => {
    const { ids } = useWishlist();
    const [products, setProducts] = useState([]);
    // 'loading' while waiting for the service, then 'ready' or 'error'.
    const [status, setStatus] = useState('loading');

    useEffect(() => {
        let isCurrent = true;

        productService
            .getAll()
            .then((data) => {
                if (isCurrent) {
                    setProducts(data);
                    setStatus('ready');
                }
            })
            .catch((error) => {
                console.error('Could not load the products:', error);
                if (isCurrent) {
                    setStatus('error');
                }
            });

        return () => {
            isCurrent = false;
        };
    }, []);

    // The saved products, in the order they were saved; an id whose product no longer exists is left out.
    const savedProducts = ids.map((id) => products.find((product) => product.id === id)).filter(Boolean);

    return (
        <section className="w-full max-w-7xl mx-auto px-6 lg:px-8 py-12">
            <h1 className="text-5xl text-ink font-light text-center">Wishlist</h1>

            {status === 'loading' && (
                <p role="status" className="mt-10 text-center text-secondary italic">
                    Loading your wishlist...
                </p>
            )}

            {status === 'error' && (
                <p role="alert" className="mt-10 text-center text-secondary italic">
                    We could not load your wishlist. Please try again later.
                </p>
            )}

            {status === 'ready' && savedProducts.length === 0 && (
                <div className="mt-10 text-center">
                    <p className="text-secondary italic">
                        Your wishlist is empty. Tap the heart on any product to keep it here.
                    </p>
                    <Link
                        to="/shop"
                        className="mt-6 inline-block px-10 py-4 rounded-full bg-primary text-on-primary text-xs font-bold uppercase tracking-widest hover:bg-primary-hover"
                    >
                        Shop All
                    </Link>
                </div>
            )}

            {status === 'ready' && savedProducts.length > 0 && <ProductGrid products={savedProducts} />}
        </section>
    );
};

export default WishlistPage;
