import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

// One question that opens and closes. <details> and <summary> do this natively, also from the keyboard.
const FaqItem = ({ question, answer }) => (
    <details className="group rounded-2xl border border-line bg-card px-5">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-lg text-ink hover:text-accent [&::-webkit-details-marker]:hidden">
            {question}
            <ChevronDown size={18} aria-hidden="true" className="shrink-0 transition-transform group-open:rotate-180" />
        </summary>
        <p className="pb-5 font-sans text-sm leading-relaxed text-text">
            {answer.map((part, position) =>
                typeof part === 'string' ? (
                    part
                ) : (
                    <Link key={position} to={part.to} className="text-accent underline hover:text-accent-hover">
                        {part.label}
                    </Link>
                ),
            )}
        </p>
    </details>
);

export default FaqItem;