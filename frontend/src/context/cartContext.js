import { createContext } from 'react';

// The cart, shared by every component inside CartProvider: the navbar badge, the product page and the cart page.
export const CartContext = createContext(null);
