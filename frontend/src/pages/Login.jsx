import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';

const labelClass = 'mb-2 block text-xs font-bold uppercase tracking-widest text-secondary';
// A thin border at all times; the field in use gets the accent border and a soft ring, visible in both themes.
const inputClass =
    'w-full bg-surface p-4 rounded-2xl text-ink placeholder:text-muted border border-line/60 outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/30';

const Login = ({ setIsLoggedIn, setUserRole }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        // TODO(v1.1): simulated login, to be replaced by JWT verification from the Spring Boot API
        if (email.toLowerCase().includes('admin')) {
            setIsLoggedIn(true);
            setUserRole('ADMIN');
            navigate('/admin'); // The admin goes to the dashboard
        } else {
            setIsLoggedIn(true);
            setUserRole('USER');
            navigate('/profile'); // A customer goes to their profile
        }
    };

    return (
        <div className="flex-1 flex items-center justify-center p-6 font-serif">
            <div className="max-w-md w-full bg-card rounded-[2.5rem] border-[3px] border-line p-12 shadow-2xl">
                <LogIn className="mx-auto text-accent mb-6" size={40} />
                <h1 className="text-3xl text-center text-ink mb-8 font-medium italic">Welcome Back</h1>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label htmlFor="login-email" className={labelClass}>
                            Email
                        </label>
                        <input
                            id="login-email"
                            type="email"
                            autoComplete="email"
                            placeholder="you@example.com"
                            className={inputClass}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="login-password" className={labelClass}>
                            Password
                        </label>
                        <input
                            id="login-password"
                            type="password"
                            autoComplete="current-password"
                            className={inputClass}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-primary text-on-primary py-4 rounded-full font-bold uppercase tracking-widest shadow-lg hover:bg-primary-hover"
                    >
                        Enter Sanctuary
                    </button>
                </form>
                <p className="mt-8 text-center text-sm font-sans text-secondary">
                    New here?{' '}
                    <Link to="/signup" className="text-accent underline hover:text-accent-hover">
                        Create an account
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
