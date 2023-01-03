import config from '../config';
import api from '../config/api';

const API_URL = config.API_URL + "auth/";

// Enregistre l'utilisateur
const register = (lastName, firstName, pseudo, birthDate, email, password) => {
  return api.post(API_URL + "users", {
    // Nom_colonne : $variable,
    last_name : lastName,
    first_name : firstName,
    pseudo : pseudo,
    birthDate : birthDate,
    email : email,
    password : password,
    role : "36a16160-8828-438a-892c-3fe2ec572ab9"
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
