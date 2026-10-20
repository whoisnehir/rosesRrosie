import { useParams } from 'react-router-dom';
import PlaceholderPage from '../components/PlaceholderPage';
import NotFoundPage from './NotFoundPage';
import { collections } from '../data/collections';

const CollectionPage = () => {
    const { slug } = useParams();
    const collection = collections.find((item) => item.slug === slug);

    if (!collection) {
        return <NotFoundPage />;
    }

    return <PlaceholderPage title={collection.name}>The products of this collection are coming soon.</PlaceholderPage>;
};

export default CollectionPage;
