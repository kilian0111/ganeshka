import axios from "axios";

const API_URL = "http://squirel.kilian-marmilliot.com:8055/auth/";

const register = (lastName, firstName, pseudo, DateNaissance, email, password) => {
  return axios.post(API_URL + "users", {
    // Nom_colonne : $variable,
    last_name : lastName,
    first_name : firstName,
    pseudo : pseudo, 
    DateNaissance : DateNaissance, 
    email : email, 
    password : password,
    role : "36a16160-8828-438a-892c-3fe2ec572ab9" 
  });
};

const login = (email, password) => {
  return axios
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

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;