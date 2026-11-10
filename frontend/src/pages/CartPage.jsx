import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { productService } from '../services/productService';
import { formatPrice } from '../utils/formatPrice';
import QuantityStepper from '../components/QuantityStepper';

const CartPage = () => {
    const { items, setQuantity, remove } = useCart();
    const [products, setProducts] = useState([]);
    // 'loading' while waiting for the service, then 'ready' or 'error'.
    const [status, setStatus] = useState('loading');

    // The cart keeps only ids, shades and quantities; names, images and prices come from the products,
    // the way a real shop always shows the current price.
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

    // Each cart line with its product; a line whose product no longer exists is left out.
    const lines = items
        .map((item) => ({ ...item, product: products.find(({ id }) => id === item.productId) }))
        .filter(({ product }) => product);
    const subtotal = lines.reduce((total, { product, quantity }) => total + product.price * quantity, 0);

    return (
        <section className="w-full max-w-4xl mx-auto px-6 lg:px-8 py-12">
            <h1 className="text-5xl text-ink font-light text-center">Cart</h1>

            {status === 'loading' && (
                <p role="status" className="mt-10 text-center text-secondary italic">
                    Loading your cart...
                </p>
            )}

            {status === 'error' && (
                <p role="alert" className="mt-10 text-center text-secondary italic">
                    We could not load your cart. Please try again later.
                </p>
            )}

            {status === 'ready' && lines.length === 0 && (
                <div className="mt-10 text-center">
                    <p className="text-secondary italic">Your cart is empty. The roses are waiting for you.</p>
                    <Link
                        to="/shop"
                        className="mt-6 inline-block px-10 py-4 rounded-full bg-primary text-on-primary text-xs font-bold uppercase tracking-widest hover:bg-primary-hover"
                    >
                        Shop All
                    </Link>
                </div>
            )}

            {status === 'ready' && lines.length > 0 && (
                <>
                    <ul className="mt-10 divide-y divide-line/60 border-y border-line/60">
                        {lines.map(({ productId, shade, quantity, product }) => (
                            <li key={`${productId}-${shade}`} className="py-6 flex gap-4 sm:gap-6">
                                <Link to={`/product/${productId}`} className="shrink-0">
                                    <img
                                        src={`${import.meta.env.BASE_URL}${product.images[0].src}`}
                                        alt=""
                                        width="1200"
                                        height="670"
                                        className="w-24 sm:w-36 h-auto rounded-lg"
                                    />
                                </Link>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <h2 className="text-lg text-ink">
                                                <Link to={`/product/${productId}`} className="hover:text-accent">
                                                    {product.name}
                                                </Link>
                                            </h2>
                                            <p className="mt-1 text-sm text-secondary">Shade: {shade}</p>
                                            <p className="mt-1 text-sm text-ink">{formatPrice(product.price)}</p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => remove(productId, shade)}
                                            aria-label={`Remove ${product.name}, ${shade}`}
                                            className="p-2 -m-2 text-secondary hover:text-accent"
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>

                                    <div className="mt-4 flex items-center justify-between gap-4">
                                        <QuantityStepper
                                            quantity={quantity}
                                            onChange={(next) => setQuantity(productId, shade, next)}
                                            itemName={`${product.name}, ${shade}`}
                                        />
                                        <p className="text-sm font-bold text-ink">
                                            {formatPrice(product.price * quantity)}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-8 flex flex-col items-end gap-2">
                        <p className="text-lg text-ink">
                            Subtotal <span className="ml-4 font-bold">{formatPrice(subtotal)}</span>
                        </p>
                        <p className="text-sm text-secondary italic">
                            This is a demo shop: no orders are placed and nothing is paid.
                        </p>
                    </div>
                </>
            )}
        </section>
    );
};

export default CartPage;
