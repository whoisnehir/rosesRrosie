import { createContext } from 'react';

// Who is signed in, shared by every component inside AuthProvider: the routes, the header and the account pages.
export const AuthContext = createContext(null);
