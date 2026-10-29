import products from '../data/products.json';
import { searchProducts } from '../utils/searchProducts';

// Products come from the local JSON file until the Spring Boot API is ready (#36).
// Pages only call these functions, so switching to the API changes this file alone.
export const productService = {
    getAll: async () => products,

    // The id from the URL is text ("1"), the id in the data is a number (1).
    getById: async (id) => products.find((product) => product.id === Number(id)) ?? null,
    search: async (query) => searchProducts(products, query),
};
