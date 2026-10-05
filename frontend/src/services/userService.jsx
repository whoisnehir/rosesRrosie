import axios from 'axios';

const API_URL = 'http://localhost:8081/api/users';

export const userService = {
    updateProfile: async (userDto) => {
        try {
            // Folosim PATCH așa cum ai definit în Controller
            const response = await axios.patch(`${API_URL}/profile`, userDto);
            return response.data;
        } catch (error) {
            console.error("Error updating profile:", error);
            throw error;
        }
    }
};