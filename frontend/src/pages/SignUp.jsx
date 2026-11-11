import { useState } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../services/authService';
import { Sparkles, CircleCheck, CircleAlert } from 'lucide-react';

const labelClass = 'mb-2 block text-xs font-bold uppercase tracking-widest text-secondary';
// A thin border at all times; the field in use gets the accent border and a soft ring, visible in both themes.
const inputClass =
    'w-full bg-surface p-4 rounded-2xl text-ink placeholder:text-muted border border-line/60 outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/30';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // 'idle' before sending, 'sending' while waiting for the server, then 'success' or 'error'.
    const [status, setStatus] = useState('idle');

    const handleRegister = async (e) => {
        e.preventDefault();
        setStatus('sending');
        try {
            await authService.signUp(email, password);
            setStatus('success');
        } catch (err) {
            console.error('Registration failed:', err);
            setStatus('error');
        }
    };

    return (
        <div className="flex-1 flex items-center justify-center p-6 font-serif">
            <div className="max-w-md w-full bg-card rounded-[2.5rem] shadow-2xl border-[3px] border-line p-10 text-center">
                <Sparkles className="mx-auto text-accent mb-4" size={32} />
                <h1 className="text-3xl text-ink mb-8 font-medium">Join rosesRrosie</h1>
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
                        disabled={status === 'sending'}
                        className="w-full bg-primary text-on-primary py-4 rounded-full font-bold uppercase tracking-widest hover:bg-primary-hover transition-all"
                    >
                        {status === 'sending' ? 'Creating account...' : 'Create Account'}
                    </button>

                    {status === 'success' && (
                        <p role="status" className="flex items-start gap-2 text-sm font-sans text-ink">
                            <CircleCheck size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-accent" />
                            <span>
                                Your account is ready.{' '}
                                <Link to="/login" className="text-accent underline hover:text-accent-hover">
                                    Sign in
                                </Link>{' '}
                                to continue.
                            </span>
                        </p>
                    )}
                    {status === 'error' && (
                        <p role="alert" className="flex items-start gap-2 text-sm font-sans text-ink">
                            <CircleAlert size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-accent" />
                            We could not create your account right now. Please try again later.
                        </p>
                    )}
                </form>
                <p className="mt-8 text-sm font-sans text-secondary">
                    Already have an account?{' '}
                    <Link to="/login" className="text-accent underline hover:text-accent-hover">
                        Sign in
                    </Link>
                </p>
                <Link
                    to="/"
                    className="mt-8 inline-block text-xs uppercase text-secondary tracking-widest border-b border-secondary/30 hover:text-accent"
                >
                    Back Home
                </Link>
            </div>
        </div>
    );
};

export default SignUp;
