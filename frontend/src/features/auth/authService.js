import axios from 'axios';

const API_URL = '/api/users/';

// Register a new user
const register = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);

    if (response.data) {
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    // Handle errors (optional, you can add specific error handling)
    console.error('Registration error:', error);
    throw error;
  }
};

//Login New user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};
//Logoutthe User
const logout = () => localStorage.removeItem('user')


// Define authService with the `register` method
const authService = { register, logout, login};

export default authService;



