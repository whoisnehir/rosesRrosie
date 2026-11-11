import warehouses from '../data/warehouses.json';

// The rosesRrosie locations come from the local JSON file until the Spring Boot API is ready (#36).
// The page only calls this function, so switching to the API changes this file alone.
export const warehouseService = {
    getAll: async () => warehouses,
};