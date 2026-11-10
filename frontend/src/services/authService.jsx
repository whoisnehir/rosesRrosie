import axios from 'axios';

const API_URL = 'http://localhost:8081/api/auth';
const SESSION_KEY = 'session';

export const authService = {
    signUp: async (email, password) => {
        const response = await axios.post(`${API_URL}/signup`, {
            email: email,
            password: password,
        });
        return response.data; // Returns the string "User registered successfully!"
    },

    // TODO(v1.1): simulated sign-in, to be replaced by JWT verification from the Spring Boot API.
    // An email that contains "admin" signs in as an admin; any other email as a customer.
    // The session { email, role } stays in this browser, so it survives a reload.
    signIn: (email) => {
        const session = { email, role: email.toLowerCase().includes('admin') ? 'ADMIN' : 'USER' };
        try {
            localStorage.setItem(SESSION_KEY, JSON.stringify(session));
        } catch {
            // Storage can be blocked; the visitor stays signed in until the page is closed
        }
        return session;
    },

    // The saved session, or null when nobody is signed in (or the saved text is broken).
    getSession: () => {
        try {
            const saved = JSON.parse(localStorage.getItem(SESSION_KEY));
            return saved?.role ? saved : null;
        } catch {
            return null;
        }
    },

    signOut: () => {
        try {
            localStorage.removeItem(SESSION_KEY);
        } catch {
            // Nothing saved, nothing to remove
        }
    },
};
