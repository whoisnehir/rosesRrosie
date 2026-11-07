import { useParams } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import { useEffect, useState } from 'react';
import CollectionBanner from '../components/CollectionBanner';
import ProductGrid from '../components/ProductGrid';
import { productService } from '../services/productService';
import { collectionService } from '../services/collectionService';

const CollectionPage = () => {
    const { slug } = useParams();
    const [collection, setCollection] = useState(null);
    const [products, setProducts] = useState([]);
    // The collection the current answer belongs to, and whether loading it failed.
    const [loadedSlug, setLoadedSlug] = useState(null);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        // Stops a late answer from updating the page after the visitor has moved to another collection.
        let isCurrent = true;

        // Both requests start at the same time; Promise.all waits for both and gives their answers in order.
        Promise.all([collectionService.getBySlug(slug), productService.getByCollection(slug)])
            .then(([foundCollection, collectionProducts]) => {
                if (isCurrent) {
                    setCollection(foundCollection);
                    setProducts(collectionProducts);
                    setHasError(false);
                    setLoadedSlug(slug);
                }
            })
            .catch((error) => {
                console.error('Could not load the collection:', error);
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
    if (loadedSlug !== slug) {
        return (
            <p role="status" className="py-20 text-center text-secondary italic">
                Loading the collection...
            </p>
        );
    }

    if (hasError) {
        return (
            <p role="alert" className="py-20 text-center text-secondary italic">
                We could not load this collection. Please try again later.
            </p>
        );
    }

    if (collection === null) {
        return <NotFoundPage />;
    }

    return (
        <>
            <CollectionBanner
                image={collection.image}
                name={collection.name}
                tagline={collection.tagline}
                headingLevel="h1"
            />

            <section aria-label="Products" className="w-full max-w-7xl mx-auto px-6 lg:px-8 py-12">
                {products.length === 0 ? (
                    <p className="text-center text-secondary italic">This collection has no products yet.</p>
                ) : (
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
