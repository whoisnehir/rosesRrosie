import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import QuantityStepper from './QuantityStepper';
import WishlistButton from './WishlistButton';

// The shade and quantity choice and the "Add to cart" button of a product page. The first shade starts selected.
const AddToCart = ({ product }) => {
    const { id, name, shades } = product;
    const [shade, setShade] = useState(shades[0]?.name ?? '');
    const [quantity, setQuantity] = useState(1);
    // What was last added, so the message says what went into the cart; null before the first click.
    const [added, setAdded] = useState(null);
    const { add } = useCart();

    function handleSubmit(event) {
        event.preventDefault();
        add(id, shade, quantity);
        setAdded({ shade, quantity });
    }

    return (
        <form onSubmit={handleSubmit} className="mt-8">
            <fieldset>
                <legend className="mx-auto text-xs font-bold uppercase tracking-widest text-secondary">Shade</legend>
                <div className="mt-3 flex flex-wrap justify-center gap-2">
                    {shades.map(({ name, hex }) => (
                        // The radio itself is hidden; the label around it is the pill the visitor sees and clicks.
                        <label
                            key={name}
                            className="flex items-center gap-2 min-h-11 px-4 py-2 rounded-full border border-line text-sm text-ink cursor-pointer hover:border-accent has-checked:border-accent has-checked:ring-1 has-checked:ring-accent has-focus-visible:outline-2 has-focus-visible:outline-accent"
                        >
                            <input
                                type="radio"
                                name="shade"
                                value={name}
                                checked={shade === name}
                                onChange={() => setShade(name)}
                                className="sr-only"
                            />
                            <span
                                aria-hidden="true"
                                className="size-5 rounded-full border border-line"
                                style={{ backgroundColor: hex }}
                            />
                            {name}
                        </label>
                    ))}
                </div>
            </fieldset>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                <QuantityStepper quantity={quantity} onChange={setQuantity} itemName={shade} />
                <button
                    type="submit"
                    className="px-10 py-4 rounded-full bg-primary text-on-primary text-xs font-bold uppercase tracking-widest hover:bg-primary-hover"
                >
                    Add to cart
                </button>
                <WishlistButton productId={id} productName={name} variant="page" />
            </div>

            {/* Always on the page, so screen readers announce the text when it appears. */}
            <p role="status" className="mt-4 min-h-6 text-sm text-ink">
                {added && (
                    <>
                        Added {added.quantity} × {added.shade} to your cart.{' '}
                        <Link to="/cart" className="underline hover:text-accent">
                            View cart
                        </Link>
                    </>
                )}
            </p>
        </form>
    );
};

export default AddToCart;
