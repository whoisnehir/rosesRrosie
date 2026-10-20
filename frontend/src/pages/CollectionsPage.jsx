import { Link } from 'react-router-dom';
import PlaceholderPage from '../components/PlaceholderPage';
import { collections } from '../data/collections';

const CollectionsPage = () => (
    <PlaceholderPage title="Collections">
        Our collections:{' '}
        {collections.map((collection, index) => (
            <span key={collection.slug}>
                {index > 0 && ', '}
                <Link to={`/collections/${collection.slug}`} className="underline hover:text-accent">
                    {collection.name}
                </Link>
            </span>
        ))}
        .
    </PlaceholderPage>
);

export default CollectionsPage;
