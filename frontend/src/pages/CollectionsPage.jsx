import { Link } from 'react-router-dom';
import { useCollections } from '../hooks/useCollections';
import CollectionBanner from '../components/CollectionBanner';

const CollectionsPage = () => {
    const { collections, status } = useCollections();

    return (
        <section className="pb-16">
            <header className="px-6 py-16 text-center">
                <h1 className="text-5xl text-ink font-light">Collections</h1>
            </header>

            {status === 'loading' && (
                <p role="status" className="text-center text-secondary italic">
                    Loading collections...
                </p>
            )}

            {status === 'error' && (
                <p role="alert" className="text-center text-secondary italic">
                    We could not load the collections. Please try again later.
                </p>
            )}

            {status === 'ready' && collections.length === 0 && (
                <p className="text-center text-secondary italic">There are no collections yet.</p>
            )}

            {status === 'ready' && collections.length > 0 && (
                <ul className="space-y-2">
                    {collections.map(({ name, slug, tagline, image }) => (
                        <li key={slug}>
                            <Link to={`/collections/${slug}`} className="group block">
                                <CollectionBanner
                                    image={image}
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
            )}
        </section>
    );
};

export default CollectionsPage;
