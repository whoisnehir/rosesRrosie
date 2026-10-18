import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';

const Login = ({ setIsLoggedIn, setUserRole }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        // TODO(v1.1): simulated login, to be replaced by JWT verification from the Spring Boot API
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
        <div className="min-h-screen bg-page flex items-center justify-center p-6 font-serif">
            <div className="max-w-md w-full bg-card rounded-[2.5rem] border-[3px] border-line p-12 shadow-2xl">
                <LogIn className="mx-auto text-accent mb-6" size={40} />
                <h2 className="text-3xl text-center text-ink mb-8 font-medium italic">Welcome Back</h2>
                <form onSubmit={handleLogin} className="space-y-6">
                    <input
                        type="email"
                        placeholder="Email (use 'admin' for Admin Role)"
                        className="w-full bg-surface p-4 rounded-2xl outline-none border border-transparent focus:border-line transition-all"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full bg-surface p-4 rounded-2xl outline-none border border-transparent focus:border-line transition-all"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-primary text-on-primary py-4 rounded-full font-bold uppercase tracking-widest shadow-lg hover:bg-primary-hover"
                    >
                        Enter Sanctuary
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
