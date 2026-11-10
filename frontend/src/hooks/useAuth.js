import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

// The shared session: { session, signIn, signOut }. Works only inside AuthProvider.
export const useAuth = () => useContext(AuthContext);
