import config from '../config';
import api from '../config/api';

const API_URL = config.API_URL + "users/";

// récupère l'utilisateur courant      Auth => Authentificate
const getUserAuth = async () => {
    const response = await api.get(API_URL + "me")

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
