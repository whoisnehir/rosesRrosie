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
    // 'loading' while waiting for the service, then 'ready' or 'error'.
    const [status, setStatus] = useState('loading');

    useEffect(() => {
        // Stops a late answer from updating the page after the visitor has moved to another collection.
        let isCurrent = true;
        setStatus('loading');

        productService
            .getByCollection(slug)
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
    }, [slug]);

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
                {status === 'loading' && (
                    <p role="status" className="text-center text-secondary italic">
                        Loading products...
                    </p>
                )}

                {status === 'error' && (
                    <p role="alert" className="text-center text-secondary italic">
                        We could not load the products. Please try again later.
                    </p>
                )}

                {status === 'ready' && products.length === 0 && (
                    <p className="text-center text-secondary italic">This collection has no products yet.</p>
                )}

                {status === 'ready' && products.length > 0 && (
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
