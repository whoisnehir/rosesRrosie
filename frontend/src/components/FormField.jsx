import { CircleAlert } from 'lucide-react';

// A labelled form field with an optional hint and an error message under it.
// The error has the id `${id}-error`, so the field can point to it with aria-describedby.
const FormField = ({ id, label, error, hint, children }) => (
    <div>
        <label htmlFor={id} className="mb-2 block text-xs font-bold uppercase tracking-widest text-secondary">
            {label}
        </label>
        {children}
        {hint && !error && <p className="mt-2 text-xs font-sans text-muted">{hint}</p>}
        {error && (
            <p id={`${id}-error`} className="mt-2 flex items-start gap-1.5 text-sm font-sans text-accent">
                <CircleAlert size={16} aria-hidden="true" className="mt-0.5 shrink-0" />
                {error}
            </p>
        )}
    </div>
);

export default FormField;