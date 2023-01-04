import config from '../config';
import api from '../config/api';

const API_URL = config.API_URL + "items/privateCall";

const getConversation = async (currentId) => {

    console.log(currentId);
    const requette = API_URL + `?fields=*,user_PrivateCall.*&?filter={"directus_users_id"{"_eq":"${currentId}"}}`;

    const response = await api.get(requette);
    console.log(requette);
    console.log(response);  
    return response.data;

}
//?fields=*,user_PrivateCall.*  
//?filtre={"nom_PrivateCall":{"_contains":"te"}}
//?filter={"user_PrivateCall.directus_users_id":{"_eq":"${currentId}"}}

const callService = {
    getConversation, 
};


export default callService;
