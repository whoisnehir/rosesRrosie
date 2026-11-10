// The number of pieces in the cart, as a small bubble on the corner of the cart icon; nothing when the cart is empty.
// The icon's parent needs "relative", so the bubble is placed against it.
const CartCount = ({ count }) => {
    if (count === 0) {
        return null;
    }

    return (
        <span
            aria-hidden="true"
            className="absolute -top-2 -right-2.5 min-w-4 h-4 px-1 rounded-full bg-accent text-on-accent text-[10px] leading-4 font-bold text-center"
        >
            {count}
        </span>
    );
};

export default CartCount;
