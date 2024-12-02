import axios from 'axios';

// API configuration
const api = axios.create({
  baseURL: 'http://localhost:5000/api/v1/user', // Backend URL
});

// Login function
export const login = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
    return response.data; // Return the response to use JWT token or success message
  } catch (error) {
    throw new Error('Login failed');
  }
};

// Signup function using axios
export const signup = async (username, email, password) => {
  try {
    const response = await api.post('/signup', { username, email, password });
    console.log('Signup response data:', response.data); // Log the response data
    return { success: true }; // Return success if the request is successful
  } catch (error) {
    console.error('Signup error:', error); // Log the error
    throw new Error('Signup failed');
  }
};

export default api;