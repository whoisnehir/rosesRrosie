import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeroSlider from '../components/HeroSlider';
import ProductGrid from '../components/ProductGrid';
import { collections } from '../data/collections';
import { productService } from '../services/productService';
import { CATEGORY_OPTIONS } from '../utils/filterProducts';

// The products shown under "Featured products": one from each collection.
const FEATURED_PRODUCT_IDS = [1, 6, 9];

const HomePage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        let isCurrent = true;
        productService
            .getAll()
            .then((data) => {
                if (isCurrent) {
                    setProducts(data);
                }
            })
            .catch((error) => console.error('Could not load the products:', error));
        return () => {
            isCurrent = false;
        };
    }, []);

    const featuredProducts = products.filter(({ id }) => FEATURED_PRODUCT_IDS.includes(id));

    return (
        <>
            <h1 className="sr-only">rosesRrosie makeup collections</h1>
            <HeroSlider slides={collections} />

            <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 py-16">
                <nav aria-label="Shop by category">
                    <ul className="flex flex-wrap justify-center gap-3">
                        {CATEGORY_OPTIONS.map(({ value, label }) => (
                            <li key={value}>
                                <Link
                                    to={`/shop?category=${value}`}
                                    className="block px-6 py-2 rounded-full border border-line text-xs font-bold uppercase tracking-widest text-ink hover:text-accent"
                                >
                                    Shop {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {featuredProducts.length > 0 && (
                    <section className="mt-20">
                        <h2 className="text-3xl text-ink font-light text-center">Featured products</h2>
                        <ProductGrid products={featuredProducts} />
                    </section>
                )}

                <section className="mt-20">
                    <h2 className="text-3xl text-ink font-light text-center">Our collections</h2>
                    <ul className="mt-10 grid gap-8 md:grid-cols-3">
                        {collections.map(({ name, slug }) => (
                            <li key={slug}>
                                <Link to={`/collections/${slug}`} className="group block text-center">
                                    {/* The poster of the collection's video (its last frame) stands for the collection. */}
                                    <img
                                        src={`${import.meta.env.BASE_URL}videos/${slug}.webp`}
                                        alt=""
                                        width="1920"
                                        height="1080"
                                        loading="lazy"
                                        className="w-full h-auto rounded-2xl transition-opacity group-hover:opacity-90"
                                    />
                                    <span className="mt-4 block text-xl text-ink transition-colors group-hover:text-accent">
                                        {name}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </>
    );
};

export default HomePage;