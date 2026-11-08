import ProductListPage from '../components/ProductListPage';
import { productService } from '../services/productService';

const NewPage = () => (
    <ProductListPage
        title="New Arrivals"
        intro="The newest shades to bloom at rosesRrosie."
        loadProducts={productService.getNew}
        emptyMessage="There are no new products right now."
    />
);

export default NewPage;
