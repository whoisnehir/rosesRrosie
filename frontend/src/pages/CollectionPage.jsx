import { useParams } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import { collections } from '../data/collections';
import { useEffect, useState } from 'react';
import CollectionBanner from '../components/CollectionBanner';
import ProductGrid from '../components/ProductGrid';
import { productService } from '../services/productService';

const CollectionPage = () => {
    const { slug } = useParams();
    const collection = collections.find((item) => item.slug === slug);
    const [products, setProducts] = useState([]);
    // The collection the current answer belongs to, and whether loading it failed.
    const [loadedSlug, setLoadedSlug] = useState(null);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        // Stops a late answer from updating the page after the visitor has moved to another collection.
        let isCurrent = true;

        productService
            .getByCollection(slug)
            .then((data) => {
                if (isCurrent) {
                    setProducts(data);
                    setHasError(false);
                    setLoadedSlug(slug);
                }
            })
            .catch((error) => {
                console.error('Could not load the products:', error);
                if (isCurrent) {
                    setHasError(true);
                    setLoadedSlug(slug);
                }
            });

        return () => {
            isCurrent = false;
        };
    }, [slug]);

    // Still loading while the answer on screen belongs to another collection (or to none yet).
    const isLoading = loadedSlug !== slug;

    if (!collection) {
        return <NotFoundPage />;
    }

    return (
        <>
            <CollectionBanner
                slug={collection.slug}
                name={collection.name}
                tagline={collection.tagline}
                headingLevel="h1"
            />

            <section aria-label="Products" className="w-full max-w-7xl mx-auto px-6 lg:px-8 py-12">
                {isLoading && (
                    <p role="status" className="text-center text-secondary italic">
                        Loading products...
                    </p>
                )}

                {!isLoading && hasError && (
                    <p role="alert" className="text-center text-secondary italic">
                        We could not load the products. Please try again later.
                    </p>
                )}

                {!isLoading && !hasError && products.length === 0 && (
                    <p className="text-center text-secondary italic">This collection has no products yet.</p>
                )}

                {!isLoading && !hasError && products.length > 0 && (
                    <>
                        <p className="text-center text-sm text-secondary italic">
                            {products.length} {products.length === 1 ? 'product' : 'products'}
                        </p>
                        <ProductGrid products={products} />
                    </>
                )}
            </section>
        </>
    );
};

export default CollectionPage;
