import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductGallery from '../components/ProductGallery';
import NotFoundPage from './NotFoundPage';
import { productService } from '../services/productService';
import { formatPrice } from '../utils/formatPrice';
import ProductDetailsTable from '../components/ProductDetailsTable';
import AddToCart from '../components/AddToCart';

const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    // The id the current answer belongs to, and whether loading it failed.
    const [loadedId, setLoadedId] = useState(null);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        let isCurrent = true;

        productService
            .getById(id)
            .then((found) => {
                if (isCurrent) {
                    setProduct(found);
                    setHasError(false);
                    setLoadedId(id);
                }
            })
            .catch((error) => {
                console.error('Could not load the product:', error);
                if (isCurrent) {
                    setHasError(true);
                    setLoadedId(id);
                }
            });

        return () => {
            isCurrent = false;
        };
    }, [id]);

    if (loadedId !== id) {
        return (
            <p role="status" className="py-20 text-center text-secondary italic">
                Loading the product...
            </p>
        );
    }

    if (hasError) {
        return (
            <p role="alert" className="py-20 text-center text-secondary italic">
                We could not load this product. Please try again later.
            </p>
        );
    }

    if (product === null) {
        return <NotFoundPage />;
    }

    const { name, collectionName, price, description, images } = product;

    return (
        <article className="w-full max-w-7xl mx-auto px-6 lg:px-8 py-12">
            <ProductGallery images={images} productName={name} />

            <div className="mt-10 max-w-2xl mx-auto text-center">
                <p className="text-[10px] font-bold uppercase tracking-widest text-secondary">{collectionName}</p>
                <h1 className="mt-2 text-4xl lg:text-5xl text-ink font-light">{name}</h1>
                <p className="mt-4 text-xl text-ink">{formatPrice(price)}</p>
                <p className="mt-6 leading-relaxed">{description}</p>

                {/* key: a new product starts with its own first shade, quantity 1 and no message. */}
                <AddToCart key={product.id} product={product} />
            </div>
            <div className="mt-12 mx-auto max-w-2xl">
                <ProductDetailsTable product={product} />
            </div>
        </article>
    );
};

export default ProductPage;
