import { useState } from 'react';
import { CartContext } from './cartContext';
import { cartService } from '../services/cartService';
import { addItem, countItems, removeItem, setItemQuantity } from '../utils/cartItems';

// Holds the cart for the whole site; every change is shown at once and saved through cartService.
const CartProvider = ({ children }) => {
    // cartService.load without (): React calls it once, on the first render, to read the saved cart.
    const [items, setItems] = useState(cartService.load);

    function save(nextItems) {
        setItems(nextItems);
        cartService.save(nextItems);
    }

    const cart = {
        items,
        count: countItems(items),
        add: (productId, shade, quantity) => save(addItem(items, productId, shade, quantity)),
        setQuantity: (productId, shade, quantity) => save(setItemQuantity(items, productId, shade, quantity)),
        remove: (productId, shade) => save(removeItem(items, productId, shade)),
    };

    return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
};

export default CartProvider;
