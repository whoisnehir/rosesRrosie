import { Link } from 'react-router-dom';
import { collections } from '../data/collections';
import CollectionBanner from '../components/CollectionBanner';

const CollectionsPage = () => (
    <section className="pb-16">
        <header className="px-6 py-16 text-center">
            <h1 className="text-5xl text-ink font-light">Collections</h1>
            <p className="mt-4 text-secondary italic">Three moments of one dream.</p>
        </header>

        <ul className="space-y-2">
            {collections.map(({ name, slug, tagline }) => (
                <li key={slug}>
                    <Link to={`/collections/${slug}`} className="group block">
                        <CollectionBanner
                            slug={slug}
                            name={name}
                            tagline={tagline}
                            action={
                                <span className="mt-8 self-start px-8 py-3 rounded-full bg-card text-ink text-xs font-bold uppercase tracking-widest group-hover:text-accent">
                                    Explore the collection
                                </span>
                            }
                        />
                    </Link>
                </li>
            ))}
        </ul>
    </section>
);

export default CollectionsPage;
