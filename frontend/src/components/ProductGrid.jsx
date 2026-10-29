import ProductCard from './ProductCard';

// The responsive grid of product cards used by Shop All, the search results and, later, the collection pages.
const ProductGrid = ({ products }) => (
    <ul className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
            <li key={product.id}>
                <ProductCard product={product} />
            </li>
        ))}
    </ul>
);

export default ProductGrid;
