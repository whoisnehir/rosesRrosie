import { CATEGORY_OPTIONS, SKIN_TYPE_OPTIONS, SORT_OPTIONS } from '../utils/filterProducts';

const labelClass = 'flex flex-col gap-1 text-[10px] font-bold uppercase tracking-widest text-secondary';
const selectClass = 'bg-card border border-line rounded-full px-4 py-2 text-sm text-ink normal-case tracking-normal';

// The Shop filters: three drop-down lists and "Clear filters". It only shows the current values and reports
// changes; the page decides what they do.
const ProductFilters = ({ category, skinType, sort, onChange, onClear }) => (
    <div className="mt-8 grid grid-cols-2 gap-3 md:flex md:items-end md:justify-center">
        <label className={labelClass}>
            Category
            <select
                value={category}
                onChange={(event) => onChange('category', event.target.value)}
                className={selectClass}
            >
                <option value="">All</option>
                {CATEGORY_OPTIONS.map(({ value, label }) => (
                    <option key={value} value={value}>
                        {label}
                    </option>
                ))}
            </select>
        </label>

        <label className={labelClass}>
            Skin type
            <select value={skinType} onChange={(event) => onChange('skin', event.target.value)} className={selectClass}>
                <option value="">All</option>
                {SKIN_TYPE_OPTIONS.map(({ value, label }) => (
                    <option key={value} value={value}>
                        {label}
                    </option>
                ))}
            </select>
        </label>

        <label className={labelClass}>
            Sort by
            <select value={sort} onChange={(event) => onChange('sort', event.target.value)} className={selectClass}>
                {SORT_OPTIONS.map(({ value, label }) => (
                    <option key={value} value={value}>
                        {label}
                    </option>
                ))}
            </select>
        </label>

        <button
            type="button"
            onClick={onClear}
            className="self-end py-2 text-sm text-secondary underline hover:text-accent"
        >
            Clear filters
        </button>
    </div>
);

export default ProductFilters;
