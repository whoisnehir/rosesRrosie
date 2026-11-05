import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CircleCheck, Mail } from 'lucide-react';
import FormField from '../components/FormField';
import { socialLinks } from '../data/socialLinks';
import { MESSAGE_MAX_LENGTH, validateContactForm, validateField } from '../utils/validateContact';

const EMPTY_FORM = { name: '', email: '', phone: '', message: '' };
const FIELD_ORDER = ['name', 'email', 'phone', 'message'];

// A thin border at all times; the accent border and ring show the field in use, and stay on a field with an error.
const inputClass = (hasError) =>
    `w-full bg-surface p-4 rounded-2xl text-ink placeholder:text-muted font-sans border outline-none transition-colors focus:ring-2 ${
        hasError ? 'border-accent focus:ring-accent/40' : 'border-line/60 focus:border-accent focus:ring-accent/30'
    }`;

const ContactPage = () => {
    const [values, setValues] = useState(EMPTY_FORM);
    // Only the fields with an error have a key here
    const [errors, setErrors] = useState({});
    const [isSent, setIsSent] = useState(false);
    const fieldRefs = useRef({});

    function handleChange(e) {
        const { name, value } = e.target;
        setValues((current) => ({ ...current, [name]: value }));
        // A field that already shows an error is checked again while the visitor fixes it.
        if (errors[name]) {
            setErrors((current) => ({ ...current, [name]: validateField(name, value) }));
        }
    }

    function handleBlur(e) {
        const { name, value } = e.target;
        setErrors((current) => ({ ...current, [name]: validateField(name, value) }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        const formErrors = validateContactForm(values);
        setErrors(formErrors);

        const firstInvalidField = FIELD_ORDER.find((field) => formErrors[field]);
        if (firstInvalidField) {
            fieldRefs.current[firstInvalidField].focus();
            return;
        }
        setIsSent(true);
    }

    function startOver() {
        setValues(EMPTY_FORM);
        setErrors({});
        setIsSent(false);
    }

    // The props every field shares, e.g. fieldProps('email') for the email input.
    const fieldProps = (name) => ({
        id: `contact-${name}`,
        name,
        value: values[name],
        onChange: handleChange,
        onBlur: handleBlur,
        ref: (element) => {
            fieldRefs.current[name] = element;
        },
        'aria-invalid': errors[name] ? true : undefined,
        'aria-describedby': errors[name] ? `contact-${name}-error` : undefined,
        className: inputClass(Boolean(errors[name])),
    });

    return (
        <section className="w-full max-w-6xl mx-auto px-6 py-16">
            <header className="text-center">
                <h1 className="text-5xl text-ink font-light">Contact</h1>
                <p className="mt-4 text-secondary italic">Questions about a shade or a collection? Write to us.</p>
            </header>

            <div className="mt-12 grid gap-10 md:grid-cols-[1fr_2fr]">
                <aside className="space-y-6 font-sans text-sm text-text">
                    <h2 className="text-2xl text-ink font-serif">Get in touch</h2>
                    <p>We answer every message within two working days.</p>
                    <p className="flex items-center gap-2">
                        <Mail size={18} aria-hidden="true" className="text-accent" />
                        hello@rosesrrosie.example
                    </p>
                    <p>
                        Looking for a quick answer? See the{' '}
                        <Link to="/help" className="text-accent underline hover:text-accent-hover">
                            Help
                        </Link>{' '}
                        page.
                    </p>
                    <ul className="flex items-center gap-5 text-ink">
                        {socialLinks.map(({ name, href, Icon }) => (
                            <li key={name}>
                                <a
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`${name} (demo link)`}
                                    title={`${name} (demo link)`}
                                    className="block hover:text-accent transition-colors"
                                >
                                    <Icon size={20} aria-hidden="true" />
                                </a>
                            </li>
                        ))}
                    </ul>
                </aside>

                <div className="bg-card rounded-[2.5rem] border border-line p-8 md:p-10">
                    {isSent ? (
                        <div role="status" className="text-center py-10">
                            <CircleCheck size={40} aria-hidden="true" className="mx-auto mb-4 text-accent" />
                            <h2 className="text-2xl text-ink">Thank you, {values.name.trim()}!</h2>
                            <p className="mt-3 font-sans text-sm text-text">
                                Your message passed every check. This is a demo shop, so it was not sent anywhere.
                            </p>
                            <button
                                type="button"
                                onClick={startOver}
                                className="mt-8 px-8 py-3 rounded-full border border-line text-xs font-bold uppercase tracking-widest text-ink hover:text-accent"
                            >
                                Send another message
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} noValidate className="space-y-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                <FormField id="contact-name" label="Name" error={errors.name}>
                                    <input type="text" autoComplete="name" {...fieldProps('name')} />
                                </FormField>
                                <FormField id="contact-email" label="Email" error={errors.email}>
                                    <input
                                        type="email"
                                        autoComplete="email"
                                        placeholder="name@example.com"
                                        {...fieldProps('email')}
                                    />
                                </FormField>
                            </div>
                            <FormField id="contact-phone" label="Phone (optional)" error={errors.phone}>
                                <input
                                    type="tel"
                                    autoComplete="tel"
                                    placeholder="0712 345 678"
                                    {...fieldProps('phone')}
                                />
                            </FormField>
                            <FormField
                                id="contact-message"
                                label="Message"
                                error={errors.message}
                                hint={`${values.message.length} / ${MESSAGE_MAX_LENGTH} characters`}
                            >
                                <textarea rows={6} maxLength={MESSAGE_MAX_LENGTH} {...fieldProps('message')} />
                            </FormField>
                            <button
                                type="submit"
                                className="w-full md:w-auto px-10 py-4 rounded-full bg-primary text-on-primary font-bold uppercase tracking-widest hover:bg-primary-hover"
                            >
                                Send message
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ContactPage;