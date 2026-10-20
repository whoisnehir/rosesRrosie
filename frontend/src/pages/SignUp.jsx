import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { Sparkles } from 'lucide-react';

const SignUp = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await authService.signUp(email, password);
            alert('Success! Welcome to the garden.');
            navigate('/');
        } catch (err) {
            console.error('Registration failed:', err);
            alert('Registration failed.');
        }
    };

    return (
        <div className="flex-1 flex items-center justify-center p-6 font-serif">
            <div className="max-w-md w-full bg-card rounded-[2.5rem] shadow-2xl border-[3px] border-line p-10 text-center">
                <Sparkles className="mx-auto text-accent mb-4" size={32} />
                <h2 className="text-3xl text-ink mb-8 font-medium">Join Roses & Rosie</h2>
                <form onSubmit={handleRegister} className="space-y-6 text-left">
                    <input
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full bg-surface rounded-2xl p-4 outline-none border border-transparent focus:border-line transition-all"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full bg-surface rounded-2xl p-4 outline-none border border-transparent focus:border-line transition-all"
                    />
                    <button
                        type="submit"
                        className="w-full bg-primary text-on-primary py-4 rounded-full font-bold uppercase tracking-widest hover:bg-primary-hover transition-all"
                    >
                        Create Account
                    </button>
                </form>
                <button
                    onClick={() => navigate('/')}
                    className="mt-8 text-[10px] uppercase text-secondary tracking-widest border-b border-secondary/30"
                >
                    Back Home
                </button>
            </div>
        </div>
    );
};

export default SignUp;
