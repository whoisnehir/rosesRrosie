import { useEffect, useState } from 'react';
import ProductGrid from '../components/ProductGrid';
import { productService } from '../services/productService';
import { useSearchParams } from 'react-router-dom';
import ProductFilters from '../components/ProductFilters';
import { filterAndSortProducts } from '../utils/filterProducts';

const ShopPage = () => {
    const [products, setProducts] = useState([]);
    // 'loading' while waiting for the service, then 'ready' or 'error'.
    const [status, setStatus] = useState('loading');
    // The filters live in the URL (/shop?category=lips&sort=price-asc), so a filtered view can be shared.
    const [searchParams, setSearchParams] = useSearchParams();
    const category = searchParams.get('category') ?? '';
    const skinType = searchParams.get('skin') ?? '';
    const sort = searchParams.get('sort') ?? '';
    const shownProducts = filterAndSortProducts(products, { category, skinType, sort });

    function changeFilter(key, value) {
        const next = new URLSearchParams(searchParams);
        if (value) {
            next.set(key, value);
        } else {
            next.delete(key);
        }
        setSearchParams(next);
    }

    const clearFilters = () => setSearchParams({});

    useEffect(() => {
        // Stops a late answer from updating the page after the visitor has left it.
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

    return (
        <section className="w-full max-w-7xl mx-auto px-6 lg:px-8 py-12">
            <h1 className="text-5xl text-ink font-light text-center">Shop All</h1>

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
                <p className="mt-10 text-center text-secondary italic">There are no products yet.</p>
            )}

            {status === 'ready' && products.length > 0 && (
                <>
                    {status === 'ready' && products.length > 0 && (
                        <>
                            <ProductFilters
                                category={category}
                                skinType={skinType}
                                sort={sort}
                                onChange={changeFilter}
                                onClear={clearFilters}
                            />
                            <p className="mt-6 text-center text-sm text-secondary italic">
                                {shownProducts.length} of {products.length} products
                            </p>
                            {shownProducts.length > 0 ? (
                                <ProductGrid products={shownProducts} />
                            ) : (
                                <p className="mt-10 text-center text-secondary italic">
                                    No products match these filters.{' '}
                                    <button
                                        type="button"
                                        onClick={clearFilters}
                                        className="underline hover:text-accent"
                                    >
                                        Clear filters
                                    </button>
                                </p>
                            )}
                        </>
                    )}
                </>
            )}
        </section>
    );
};

export default ShopPage;
