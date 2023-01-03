import config from '../config';
import api from '../config/api';

const API_URL = config.API_URL + "items/privateMessage?fields=*,user_created.*";


const getAllPrivateMessage = async () => {
    const response = await api.get(API_URL)
 
    return response.data;

};

const privateMessageService = {
    getAllPrivateMessage,
};

export default privateMessageService;