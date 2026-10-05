import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Importăm toate paginile create anterior
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
    const [userRole, setUserRole] = useState('USER'); // Opțiuni: 'USER', 'ADMIN'

    return (
        <Router>
            <Routes>
                {/* --- RUTE PUBLICE --- */}
                <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} userRole={userRole} />} />

                {/* Trimitem SETTERII către Login pentru a putea schimba starea și de acolo */}
                <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />} />

                <Route path="/signup" element={<SignUp />} />
                <Route path="/warehouses" element={<WarehousePage />} />
                <Route path="/cart" element={<CartPage />} />

                {/* --- RUTE PROTEJATE (Doar pentru rolul de USER) --- */}
                {/* Folosim componenta <Navigate /> pentru a redirecționa automat spre Login dacă cineva vrea să "trișeze" URL-ul */}
                <Route
                    path="/profile"
                    element={isLoggedIn && userRole === 'USER' ? <Profile /> : <Navigate to="/login" />}
                />

                <Route
                    path="/wishlist"
                    element={isLoggedIn && userRole === 'USER' ? <WishlistPage /> : <Navigate to="/login" />}
                />

                {/* --- RUTA DE ADMIN (Doar pentru rolul de ADMIN) --- */}
                <Route
                    path="/admin"
                    element={isLoggedIn && userRole === 'ADMIN' ? <AdminDashboard /> : <Navigate to="/" />}
                />
            </Routes>

            {/* ========================================================== */}
            {/* 🟢 DEV HELPER CONSOLE (Apare doar pentru testare)        */}
            {/* ========================================================== */}
            <div className="fixed bottom-6 right-6 bg-[#5C4033] text-white p-6 rounded-[2rem] shadow-2xl z-[9999] border-4 border-[#E8B4B8] font-mono text-[11px]">

                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-white/20">
                    <div className={`w-3 h-3 rounded-full ${isLoggedIn ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                    <p className="font-bold tracking-widest text-[#E8B4B8]">DEV SECURITY CONSOLE</p>
                </div>

                <div className="flex flex-col gap-4">

                    {/* Toggling Logged In State */}
                    <label className="flex items-center gap-3 cursor-pointer group hover:text-[#E8B4B8]">
                        <input
                            type="checkbox"
                            checked={isLoggedIn}
                            onChange={() => setIsLoggedIn(!isLoggedIn)}
                            className="w-4 h-4 rounded border-gray-300 text-[#E8B4B8] focus:ring-[#E8B4B8] accent-[#E8B4B8]"
                        />
                        <span>Is Logged In ({isLoggedIn ? 'YES' : 'NO'})</span>
                    </label>

                    {/* Selecting User Role */}
                    <div className="space-y-2">
                        <p className="font-bold border-b border-white/10 pb-1">Current Role: <span className="text-[#E8B4B8] font-bold text-xs">{userRole}</span></p>
                        <div className="flex gap-2">
                            <RoleButton active={userRole === 'USER'} label="USER" onClick={() => setUserRole('USER')} />
                            <RoleButton active={userRole === 'ADMIN'} label="ADMIN" onClick={() => setUserRole('ADMIN')} />
                        </div>
                    </div>

                    <div className="mt-2 text-white/50 text-[9px] italic border-t border-white/10 pt-2">
                        Use this panel to simulate different auth states <br />
                        without using the Login page.
                    </div>
                </div>
            </div>
        </Router>
    );
}

// Mică componentă internă pentru butoanele de rol
const RoleButton = ({ active, label, onClick }) => (
    <button
        onClick={onClick}
        className={`px-3 py-1 rounded-full text-[9px] font-bold tracking-widest transition-colors ${active ? 'bg-[#E8B4B8] text-white' : 'bg-[#4a3329] text-white/70 hover:bg-[#5C4033] hover:text-white'}`}>
        {label}
    </button>
);

export default App;