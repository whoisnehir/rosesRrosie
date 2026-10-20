import { useParams } from 'react-router-dom';
import PlaceholderPage from '../components/PlaceholderPage';

const ProductPage = () => {
    const { id } = useParams();

    return <PlaceholderPage title={`Product #${id}`}>The product details are coming soon.</PlaceholderPage>;
};

export default ProductPage;
