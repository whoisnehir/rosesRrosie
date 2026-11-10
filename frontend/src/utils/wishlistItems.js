// A pure function for the wishlist: the list of saved product ids, without changing the old list.

// Saves the product if it is not in the list, removes it if it is: what one click on the heart does.
export function toggleId(ids, productId) {
    return ids.includes(productId) ? ids.filter((id) => id !== productId) : [...ids, productId];
}
