import products from '../data/products.json';
import { searchProducts } from '../utils/searchProducts';
import collections from '../data/collections.json';

// Products come from the local JSON file until the Spring Boot API is ready (#36).
// Pages only call these functions, so switching to the API changes this file alone.

// Each product gets the name of its collection, the way the API will send it,
// so a product card can show the name without loading the collections.
const catalog = products.map((product) => ({
    ...product,
    collectionName: collections.find(({ slug }) => slug === product.collection)?.name ?? '',
}));

export const productService = {
    getAll: async () => catalog,

    // The id from the URL is text ("1"), the id in the data is a number (1).
    getById: async (id) => catalog.find((product) => product.id === Number(id)) ?? null,
    search: async (query) => searchProducts(catalog, query),
    // The products of one collection, found by the slug in its URL.
    getByCollection: async (slug) => catalog.filter((product) => product.collection === slug),
};
