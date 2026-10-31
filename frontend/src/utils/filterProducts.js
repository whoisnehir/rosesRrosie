// The choices offered by the Shop filters. "value" is what goes into the URL, "label" is what visitors see.
export const CATEGORY_OPTIONS = [
    { value: 'lips', label: 'Lips' },
    { value: 'eyes', label: 'Eyes' },
    { value: 'face', label: 'Face' },
    { value: 'cheeks', label: 'Cheeks' },
];

export const SKIN_TYPE_OPTIONS = [
    { value: 'dry', label: 'Dry' },
    { value: 'oily', label: 'Oily' },
    { value: 'combination', label: 'Combination' },
];

export const SORT_OPTIONS = [
    { value: '', label: 'Featured' },
    { value: 'price-asc', label: 'Price: low to high' },
    { value: 'price-desc', label: 'Price: high to low' },
    { value: 'name-asc', label: 'Name: A to Z' },
];

// How two products are compared for each sort order; a negative result puts the first one before the second.
const COMPARE = {
    'price-asc': (a, b) => a.price - b.price,
    'price-desc': (a, b) => b.price - a.price,
    'name-asc': (a, b) => a.name.localeCompare(b.name),
};

// The products that match the chosen category and skin type, in the chosen order.
// An empty filter keeps every product; an empty sort keeps the original ("featured") order.
export function filterAndSortProducts(products, { category, skinType, sort }) {
    const filtered = products.filter(
        (product) =>
            (!category || product.category.toLowerCase() === category) &&
            (!skinType || product.skinTypes.includes(skinType)),
    );

    const compare = COMPARE[sort];
    return compare ? [...filtered].sort(compare) : filtered;
}
