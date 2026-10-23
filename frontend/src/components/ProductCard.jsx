import { Link } from 'react-router-dom';
import { collections } from '../data/collections';
import { formatPrice } from '../utils/formatPrice';

// One product in a grid: image, collection, name, price and shade dots. The whole card opens the product page.
const ProductCard = ({ product }) => {
    const { id, name, collection, price, shades, images } = product;
    const image = images[0];
    const collectionName = collections.find(({ slug }) => slug === collection)?.name;

    return (
        <Link to={`/product/${id}`} className="group block">
            {image && (
                <img
                    src={`${import.meta.env.BASE_URL}${image.src}`}
                    alt={image.alt}
                    width="1200"
                    height="670"
                    loading="lazy"
                    className="w-full h-auto rounded-xl transition-opacity group-hover:opacity-90"
                />
            )}
            <p className="mt-4 text-[10px] font-bold uppercase tracking-widest text-secondary">{collectionName}</p>
            <h2 className="mt-1 text-xl text-ink transition-colors group-hover:text-accent">{name}</h2>
            <div className="mt-2 flex items-center justify-between">
                <span className="text-sm text-ink">{formatPrice(price)}</span>
                <span className="flex gap-1.5" aria-hidden="true">
                    {shades.map(({ name: shadeName, hex }) => (
                        <span
                            key={shadeName}
                            title={shadeName}
                            className="size-3.5 rounded-full border border-line"
                            style={{ backgroundColor: hex }}
                        />
                    ))}
                </span>
                <span className="sr-only">
                    {shades.length} {shades.length === 1 ? 'shade' : 'shades'}
                </span>
            </div>
        </Link>
    );
};

export default ProductCard;
