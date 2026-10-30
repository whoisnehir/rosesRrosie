import { collections } from '../data/collections';

// How each skin type from the data is shown to visitors.
const SKIN_TYPE_LABELS = {
    dry: 'Dry',
    oily: 'Oily',
    combination: 'Combination',
};

// The product facts as a semantic table: one row per fact, the fact's name in a row header.
const ProductDetailsTable = ({ product }) => {
    const { brand, collection, category, skinTypes, shades, ingredients } = product;
    const collectionName = collections.find(({ slug }) => slug === collection)?.name;

    const rows = [
        { label: 'Brand', value: brand },
        { label: 'Collection', value: collectionName },
        { label: 'Category', value: category },
        { label: 'Suitable for', value: skinTypes.map((type) => SKIN_TYPE_LABELS[type]).join(', ') },
        { label: 'Shades', value: shades.map(({ name }) => name).join(', ') },
        { label: 'Ingredients', value: ingredients },
    ];

    return (
        // On narrow screens only the table scrolls sideways, not the whole page.
        <div className="overflow-x-auto">
            <table className="w-full min-w-md text-left text-sm">
                <caption className="mb-4 text-[10px] font-bold uppercase tracking-widest text-secondary">
                    Product details
                </caption>
                <tbody>
                    {rows.map(({ label, value }) => (
                        <tr key={label} className="border-t border-line/60">
                            <th scope="row" className="w-40 py-3 px-4 align-top font-bold text-ink">
                                {label}
                            </th>
                            <td className="py-3 px-4 text-ink">{value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductDetailsTable;
