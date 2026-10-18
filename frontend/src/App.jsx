import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './components/HomePage';
import Profile from './components/Profile';
import SignUp from './components/SignUp';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import WarehousePage from './components/WarehousePage';
import CartPage from './components/CartPage';
import WishlistPage from './components/WishlistPage';

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
