import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock } from 'lucide-react';

const Login = ({ setIsLoggedIn, setUserRole }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        // LOGICA DE SIMULARE (Sub capotă va fi verificarea JWT-ului din Spring Boot)
        if (email.toLowerCase().includes('admin')) {
            setIsLoggedIn(true);
            setUserRole('ADMIN');
            navigate('/admin'); // Adminul merge la Dashboard
        } else {
            setIsLoggedIn(true);
            setUserRole('USER');
            navigate('/profile'); // Userul merge la Profil
        }
    };

    return (
        <div className="min-h-screen bg-[#FFF5F6] flex items-center justify-center p-6 font-serif">
            <div className="max-w-md w-full bg-white rounded-[2.5rem] border-[3px] border-[#E8B4B8] p-12 shadow-2xl">
                <LogIn className="mx-auto text-[#E8B4B8] mb-6" size={40} />
                <h2 className="text-3xl text-center text-[#5C4033] mb-8 font-medium italic">Welcome Back</h2>
                <form onSubmit={handleLogin} className="space-y-6">
                    <input
                        type="email"
                        placeholder="Email (use 'admin' for Admin Role)"
                        className="w-full bg-[#FDF0F2] p-4 rounded-2xl outline-none border border-transparent focus:border-[#E8B4B8] transition-all"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input type="password" placeholder="Password" className="w-full bg-[#FDF0F2] p-4 rounded-2xl outline-none border border-transparent focus:border-[#E8B4B8] transition-all" required />
                    <button type="submit" className="w-full bg-[#5C4033] text-white py-4 rounded-full font-bold uppercase tracking-widest shadow-lg hover:bg-[#4a3329]">
                        Enter Sanctuary
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;