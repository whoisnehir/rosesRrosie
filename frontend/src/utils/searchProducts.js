import { collections } from '../data/collections';

function normalize(text) {
    return text
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
}

function searchableText(product) {
    const collectionName = collections.find(({ slug }) => slug === product.collection)?.name ?? '';
    const shadeNames = product.shades.map(({ name }) => name);
    return normalize([product.name, product.category, collectionName, product.description, ...shadeNames].join(' '));
}

function matches(product, word) {
    return searchableText(product).includes(word) || normalize(product.brand) === word;
}

export function searchProducts(products, query) {
    const words = normalize(query).split(/\s+/).filter(Boolean);
    if (words.length === 0) {
        return [];
    }
    return products.filter((product) => words.every((word) => matches(product, word)));
}
