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
        requette = "?filter[status]=active";
    }else{
        requette = `?filter={"first_name":{"_contains":"${searchName}"}}`;
    };
    const response = await api.get(API_URL + requette);
    console.log(API_URL + requette)
    return response.data;
}

// fonctionne : filter[status]=active         recherche que les utilisateur active
// [first_name][like]=${searchName}
const usersService = {
    getUserAuth,
    getUsers, 
};

export default usersService;
