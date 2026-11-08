import ProductListPage from '../components/ProductListPage';
import { productService } from '../services/productService';

const BestSellersPage = () => (
    <ProductListPage
        title="Best Sellers"
        intro="The shades our dreamers love most."
        loadProducts={productService.getBestSellers}
        emptyMessage="There are no best sellers yet."
    />
);

export default BestSellersPage;
