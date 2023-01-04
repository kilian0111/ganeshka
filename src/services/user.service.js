import config from '../config';
import api from '../config/api';

const API_URL = config.API_URL + "users";

// récupère l'utilisateur courant      Auth => Authentificate
const getUserAuth = async () => {
    const response = await api.get(API_URL + "/me")

    return response.data;
};

// récupère les utilisateurs actif
const getUsers = async (currentId, searchName) => {
    let requette;
    if(searchName == ''){
        requette = `?filter={"_and":[{"status":{"_eq":"active"}},{"id":{"_neq":"${currentId}"}}]}`;
    }else{
        requette = `?filter={"_or":[{"_and":[{"first_name":{"_contains":"${searchName}"}},{"status":{"_eq":"active"}},{"id":{"_neq":"${currentId}"}}]},{"_and":[{"last_name":{"_contains":"${searchName}"}},{"status":{"_eq":"active"}},{"id":{"_neq":"${currentId}"}}]}]}`;
    };
    const response = await api.get(API_URL + requette);
    //  console.log(API_URL + requette)
    return response.data;
}

const usersService = {
    getUserAuth,
    getUsers, 
};

export default usersService;
