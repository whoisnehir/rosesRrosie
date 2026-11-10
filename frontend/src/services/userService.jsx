import axios from 'axios';
import { authService } from './authService';

const API_URL = 'http://localhost:8081/api/users';

function nameFromEmail(email) {
    return email
        .split('@')[0]
        .split(/[._-]+/)
        .filter(Boolean)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

export const userService = {
    // TODO(#31): simulated until the backend has GET /api/users/profile.
    // Builds the profile from the session, so the page shows who is signed in.
    getUserProfile: async (id) => {
        const session = authService.getSession();
        if (session === null) {
            throw new Error('Nobody is signed in');
        }
        return {
            id,
            name: nameFromEmail(session.email),
            email: session.email,
            phone: '',
            defaultAddress: '',
            defaultPaymentMethod: '',
        };
    },

    updateProfile: async (userDto) => {
        try {
            // PATCH matches UserProfileController.updateProfile in the backend
            const response = await axios.patch(`${API_URL}/profile`, userDto);
            return response.data;
        } catch (error) {
            console.error('Error updating profile:', error);
            throw error;
        }
    },
};
