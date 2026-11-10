import { useContext } from 'react';
import { CartContext } from '../context/cartContext';

// The shared cart: { items, count, add, setQuantity, remove }. Works only inside CartProvider.
export const useCart = () => useContext(CartContext);
