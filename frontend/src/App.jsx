import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './pages/HomePage';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import WarehousePage from './pages/WarehousePage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState('USER');

    return (
        <Router basename={import.meta.env.BASE_URL}>
            <Routes>
                <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} userRole={userRole} />} />

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

                <Route
                    path="/admin"
                    element={isLoggedIn && userRole === 'ADMIN' ? <AdminDashboard /> : <Navigate to="/" />}
                />
            </Routes>
        </Router>
    );
}
export default App;
