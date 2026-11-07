import collections from '../data/collections.json';

// Collections come from the local JSON file until the Spring Boot API is ready (#9).
// Each collection has an image (required) and a video (optional): the Home slider shows the video when there is one.
export const collectionService = {
    getAll: async () => collections,
    // One collection by the slug in its URL, or null if there is none with that slug.
    getBySlug: async (slug) => collections.find((collection) => collection.slug === slug) ?? null,
};
