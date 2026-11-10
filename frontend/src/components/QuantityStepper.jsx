import { Minus, Plus } from 'lucide-react';
import { MAX_QUANTITY } from '../utils/cartItems';

const stepButtonClass = 'p-2 hover:text-accent disabled:opacity-30 disabled:hover:text-current';

// The "− 1 +" control for a quantity between 1 and MAX_QUANTITY. It only shows the value and reports the new one;
// the parent decides what to do with it. itemName goes into the button names, e.g. "One more Peony".
const QuantityStepper = ({ quantity, onChange, itemName }) => (
    <div className="inline-flex items-center rounded-full border border-line text-ink">
        <button
            type="button"
            onClick={() => onChange(quantity - 1)}
            disabled={quantity === 1}
            aria-label={`One less ${itemName}`}
            className={stepButtonClass}
        >
            <Minus size={14} />
        </button>
        <span className="w-6 text-center text-sm">
            <span className="sr-only">Quantity: </span>
            {quantity}
        </span>
        <button
            type="button"
            onClick={() => onChange(quantity + 1)}
            disabled={quantity === MAX_QUANTITY}
            aria-label={`One more ${itemName}`}
            className={stepButtonClass}
        >
            <Plus size={14} />
        </button>
    </div>
);

export default QuantityStepper;
