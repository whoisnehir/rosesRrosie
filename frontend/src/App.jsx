import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import RootLayout from './layouts/RootLayout';
import HomePage from './pages/HomePage';
import NewPage from './pages/NewPage';
import CollectionsPage from './pages/CollectionsPage';
import CollectionPage from './pages/CollectionPage';
import BestSellersPage from './pages/BestSellersPage';
import ShopPage from './pages/ShopPage';
import ProductPage from './pages/ProductPage';
import SearchPage from './pages/SearchPage';
import AboutPage from './pages/AboutPage';
import HelpPage from './pages/HelpPage';
import ContactPage from './pages/ContactPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import WarehousePage from './pages/WarehousePage';
import CartPage from './pages/CartPage';
import Profile from './pages/Profile';
import WishlistPage from './pages/WishlistPage';
import AdminDashboard from './pages/AdminDashboard';
import NotFoundPage from './pages/NotFoundPage';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState('USER');

    return (
        <Router basename={import.meta.env.BASE_URL}>
            <Routes>
                {/* Public pages share the header and footer from RootLayout */}
                <Route element={<RootLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/new" element={<NewPage />} />
                    <Route path="/collections" element={<CollectionsPage />} />
                    <Route path="/collections/:slug" element={<CollectionPage />} />
                    <Route path="/best-sellers" element={<BestSellersPage />} />
                    <Route path="/shop" element={<ShopPage />} />
                    <Route path="/product/:id" element={<ProductPage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/help" element={<HelpPage />} />
                    <Route path="/contact" element={<ContactPage />} />

                    <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/warehouses" element={<WarehousePage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route
                        path="/profile"
                        element={isLoggedIn && userRole === 'USER' ? <Profile /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/wishlist"
                        element={isLoggedIn && userRole === 'USER' ? <WishlistPage /> : <Navigate to="/login" />}
                    />

                    <Route path="*" element={<NotFoundPage />} />
                </Route>

                {/* The admin panel has its own full-screen layout */}
                <Route
                    path="/admin"
                    element={isLoggedIn && userRole === 'ADMIN' ? <AdminDashboard /> : <Navigate to="/" />}
                />
            </Routes>
        </Router>
    );
}

export default App;
