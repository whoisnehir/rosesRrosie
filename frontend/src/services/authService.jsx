import axios from 'axios';

const API_URL = 'http://localhost:8081/api/auth';

export const authService = {
    signUp: async (email, password) => {
        const response = await axios.post(`${API_URL}/signup`, {
            email: email,
            password: password
        });
        return response.data; // Va returna String-ul "User registered successfully!"
    }
};