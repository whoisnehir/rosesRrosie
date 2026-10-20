// Shared look for pages that are not built yet.
const PlaceholderPage = ({ title, children }) => (
    <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl text-ink font-light mb-6">{title}</h1>
        <p className="text-secondary italic">{children ?? 'This page is coming soon.'}</p>
    </section>
);

export default PlaceholderPage;
