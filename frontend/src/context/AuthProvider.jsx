import { startTransition, useState } from 'react';
import { AuthContext } from './authContext';
import { authService } from '../services/authService';

// Holds the session for the whole site: null when nobody is signed in, otherwise { email, role }.
const AuthProvider = ({ children }) => {
    // authService.getSession without (): React calls it once, on the first render, to read the saved session.
    const [session, setSession] = useState(authService.getSession);

    const auth = {
        session,
        signIn: (email) => {
            const newSession = authService.signIn(email);
            setSession(newSession);
            return newSession;
        },
        // Inside a transition, like React Router's own navigation, so a navigate() called next to signOut()
        // is shown in the same render: otherwise the protected page would first see "signed out"
        // and send the visitor to Sign in.
        signOut: () => {
            authService.signOut();
            startTransition(() => setSession(null));
        },
    };

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
