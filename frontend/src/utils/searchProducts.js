import { collections } from '../data/collections';

// Lowercase and without diacritics, so "Blush", "blush" and "blúsh" are the same word.
function normalize(text) {
    return text
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
}

// Everything a visitor might type to find a product, in one normalized text.
// The brand is left out: "rosesRrosie" contains "rose", so every product would match a search for "rose".
function searchableText(product) {
    const collectionName = collections.find(({ slug }) => slug === product.collection)?.name ?? '';
    const shadeNames = product.shades.map(({ name }) => name);
    return normalize([product.name, product.category, collectionName, product.description, ...shadeNames].join(' '));
}

// A word matches a product if it appears anywhere in its text, or if it is exactly the brand name.
function matches(product, word) {
    return searchableText(product).includes(word) || normalize(product.brand) === word;
}

// Products that match every word of the query, in their original order.
export function searchProducts(products, query) {
    const words = normalize(query).split(/\s+/).filter(Boolean);
    if (words.length === 0) {
        return [];
    }
    return products.filter((product) => words.every((word) => matches(product, word)));
}
