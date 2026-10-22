import { useSearchParams } from 'react-router-dom';
import PlaceholderPage from '../components/PlaceholderPage';

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const term = searchParams.get('q');

    if (!term) {
        return (
            <PlaceholderPage title="Search">Use the search icon in the header to look for products.</PlaceholderPage>
        );
    }

    return (
        <PlaceholderPage title={`Results for “${term}”`}>
            Search results will appear here once the products are added.
        </PlaceholderPage>
    );
};

export default SearchPage;
