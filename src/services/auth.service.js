import config from '../config';
import api from '../config/api';

const API_URL = config.API_URL + "auth/";

// Enregistre l'utilisateur
const register = (username, email, password) => {
  return api.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

// Connecte l'utilisateur
const login = (email, password) => {
  return api
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

// Deconnecte l'utilisateur
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
