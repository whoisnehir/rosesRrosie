// Pure functions for the cart: each one takes the current list of items and returns a new list,
// without changing the old one. An item is { productId, shade, quantity }: one line of the cart.

export const MAX_QUANTITY = 10;

// The same product in another shade is another line, so a line is found by both.
const isSameLine = (item, productId, shade) => item.productId === productId && item.shade === shade;

// Keeps a quantity between 1 and MAX_QUANTITY.
const limit = (quantity) => Math.min(Math.max(quantity, 1), MAX_QUANTITY);

// Adds pieces: a new line, or more on the line that already has this product and shade.
export function addItem(items, productId, shade, quantity = 1) {
    const existing = items.find((item) => isSameLine(item, productId, shade));
    if (!existing) {
        return [...items, { productId, shade, quantity: limit(quantity) }];
    }
    return items.map((item) => (item === existing ? { ...item, quantity: limit(item.quantity + quantity) } : item));
}

// Sets the quantity of one line, kept between 1 and MAX_QUANTITY.
export function setItemQuantity(items, productId, shade, quantity) {
    return items.map((item) => (isSameLine(item, productId, shade) ? { ...item, quantity: limit(quantity) } : item));
}

// Removes one line.
export function removeItem(items, productId, shade) {
    return items.filter((item) => !isSameLine(item, productId, shade));
}

// How many pieces are in the cart, for the number on the cart icon.
export const countItems = (items) => items.reduce((total, item) => total + item.quantity, 0);
