import config from '../config';
import api from '../config/api';

const API_URL = config.API_URL;

const register = (lastName, firstName, pseudo, email, password) => {
  return api.post(API_URL + "users", {
    // Nom_colonne : $variable,
    last_name : lastName,
    first_name : firstName,
    email : email,
    password : password,
    role : "36a16160-8828-438a-892c-3fe2ec572ab9"
  });
};

const login = (email, password) => {
  return api
    .post(API_URL + "auth/login", {
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

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
