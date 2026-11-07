import { capitalize } from './capitalize';

// The choices offered by the filters. "value" is what goes into the URL, "label" is what visitors see.
// The categories and skin types are read from the products themselves, so a new category appears on its own.

// Each value once (a Set keeps no duplicates), in lower case, in the order it first appears in the products.
function toOptions(values) {
    const unique = [...new Set(values.map((value) => value.toLowerCase()))];
    return unique.map((value) => ({ value, label: capitalize(value) }));
}

// e.g. [{ value: 'lips', label: 'Lips' }, { value: 'cheeks', label: 'Cheeks' }, ...]
export const getCategoryOptions = (products) => toOptions(products.map(({ category }) => category));

// flatMap: every product has a list of skin types, and all the lists become one list.
export const getSkinTypeOptions = (products) => toOptions(products.flatMap(({ skinTypes }) => skinTypes));

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
            (!skinType || product.skinTypes.some((type) => type.toLowerCase() === skinType)),
    );

    const compare = COMPARE[sort];
    return compare ? [...filtered].sort(compare) : filtered;
}
