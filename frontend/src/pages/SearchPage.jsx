import { useEffect, useState } from 'react';
import PlaceholderPage from '../components/PlaceholderPage';
import { Link, useSearchParams } from 'react-router-dom';
import { productService } from '../services/productService';
import ProductGrid from '../components/ProductGrid';

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const term = searchParams.get('q')?.trim() ?? '';
    const [results, setResults] = useState([]);

    const [loadedTerm, setLoadedTerm] = useState(null);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        if (!term) {
            return;
        }
        let isCurrent = true;

        productService
            .search(term)
            .then((products) => {
                if (isCurrent) {
                    setResults(products);
                    setHasError(false);
                    setLoadedTerm(term);
                }
            })
            .catch((error) => {
                console.error('Could not search the products:', error);
                if (isCurrent) {
                    setHasError(true);
                    setLoadedTerm(term);
                }
            });

        return () => {
            isCurrent = false;
        };
    }, [term]);

    if (!term) {
        return (
            <PlaceholderPage title="Search">Use the search icon in the header to look for products.</PlaceholderPage>
        );
    }

    const isLoading = loadedTerm !== term;

    return (
        <section className="w-full max-w-7xl mx-auto px-6 lg:px-8 py-12">
            <h1 className="text-5xl text-ink font-light text-center">Results for “{term}”</h1>

            {isLoading && (
                <p role="status" className="mt-10 text-center text-secondary italic">
                    Searching...
                </p>
            )}

            {!isLoading && hasError && (
                <p role="alert" className="mt-10 text-center text-secondary italic">
                    We could not search the products. Please try again later.
                </p>
            )}

            {!isLoading && !hasError && results.length === 0 && (
                <div className="mt-10 text-center text-secondary italic">
                    <p>No products match “{term}”.</p>
                    <p className="mt-2">
                        Try another word, or{' '}
                        <Link to="/shop" className="underline hover:text-accent">
                            browse all products
                        </Link>
                        .
                    </p>
                </div>
            )}

            {!isLoading && !hasError && results.length > 0 && (
                <>
                    <p className="mt-3 text-center text-sm text-secondary italic">
                        {results.length} {results.length === 1 ? 'product' : 'products'}
                    </p>
                    <ProductGrid products={results} />
                </>
            )}
        </section>
    );
};

export default SearchPage;
