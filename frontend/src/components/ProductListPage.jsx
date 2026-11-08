import { useEffect, useState } from 'react';
import ProductGrid from './ProductGrid';

// A page with a title, a short line under it and a grid of products: used by New and Best Sellers.
// loadProducts is the service function that gives the products, for example productService.getNew.
const ProductListPage = ({ title, intro, loadProducts, emptyMessage }) => {
    const [products, setProducts] = useState([]);
    // 'loading' while waiting for the service, then 'ready' or 'error'.
    const [status, setStatus] = useState('loading');

    useEffect(() => {
        // Stops a late answer from updating the page after the visitor has left it.
        let isCurrent = true;

        loadProducts()
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
    }, [loadProducts]);

    return (
        <section className="w-full max-w-7xl mx-auto px-6 lg:px-8 py-12">
            <h1 className="text-5xl text-ink font-light text-center">{title}</h1>
            <p className="mt-4 text-center text-secondary italic">{intro}</p>

            {status === 'loading' && (
                <p role="status" className="mt-10 text-center text-secondary italic">
                    Loading products...
                </p>
            )}

            {status === 'error' && (
                <p role="alert" className="mt-10 text-center text-secondary italic">
                    We could not load the products. Please try again later.
                </p>
            )}

            {status === 'ready' && products.length === 0 && (
                <p className="mt-10 text-center text-secondary italic">{emptyMessage}</p>
            )}

            {status === 'ready' && products.length > 0 && <ProductGrid products={products} />}
        </section>
    );
};

export default ProductListPage;
