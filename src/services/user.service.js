import config from '../config';
import api from '../config/api';

const API_URL = config.API_URL + "users/"; 

// récupère l'utilisateur courant      Auth => Authentificate
const getUserAuth = async (token) => {

    const config = {
        Authorization: `Bearer ${token}`
    };
    const response = await api.get(API_URL + "me",{
        headers: config,
    })
    return response.data;
};

// récupère les utilisateurs actif
const getUsers = async (currentId) => {
    const response = await api.get(API_URL +`?filter[status]=active`)

    return response.data;
}

const usersService = {
    getUserAuth,
    getUsers,
};

export default usersService;
