import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { Mail, Lock, Sparkles, ArrowRight } from 'lucide-react';

const SignUp = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await authService.signUp(email, password);
            alert("Success! Welcome to the garden.");
            navigate('/'); 
        } catch (err) { alert("Registration failed."); }
    };

    return (
        <div className="min-h-screen bg-[#FFF5F6] flex items-center justify-center p-6 font-serif">
            <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl border-[3px] border-[#E8B4B8] p-10 text-center">
                <Sparkles className="mx-auto text-[#E8B4B8] mb-4" size={32} />
                <h2 className="text-3xl text-[#5C4033] mb-8 font-medium">Join Roses & Rosie</h2>
                <form onSubmit={handleRegister} className="space-y-6 text-left">
                    <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required
                           className="w-full bg-[#FDF0F2] rounded-2xl p-4 outline-none border border-transparent focus:border-[#E8B4B8] transition-all" />
                    <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required
                           className="w-full bg-[#FDF0F2] rounded-2xl p-4 outline-none border border-transparent focus:border-[#E8B4B8] transition-all" />
                    <button type="submit" className="w-full bg-[#5C4033] text-white py-4 rounded-full font-bold uppercase tracking-widest hover:bg-[#4a3329] transition-all">
                        Create Account
                    </button>
                </form>
                <button onClick={() => navigate('/')} className="mt-8 text-[10px] uppercase text-[#A67C52] tracking-widest border-b border-[#A67C52]/30">Back Home</button>
            </div>
        </div>
    );
};

export default SignUp;