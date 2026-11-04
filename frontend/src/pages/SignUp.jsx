import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { Sparkles } from 'lucide-react';

const labelClass = 'mb-2 block text-xs font-bold uppercase tracking-widest text-secondary';
// A thin border at all times; the field in use gets the accent border and a soft ring, visible in both themes.
const inputClass =
    'w-full bg-surface p-4 rounded-2xl text-ink placeholder:text-muted border border-line/60 outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/30';

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
                    <div>
                        <label htmlFor="signup-email" className={labelClass}>
                            Email
                        </label>
                        <input
                            id="signup-email"
                            type="email"
                            autoComplete="email"
                            placeholder="you@example.com"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className={inputClass}
                        />
                    </div>
                    <div>
                        <label htmlFor="signup-password" className={labelClass}>
                            Password
                        </label>
                        <input
                            id="signup-password"
                            type="password"
                            autoComplete="new-password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className={inputClass}
                        />
                    </div>
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
