import config from '../config';
import api from '../config/api';

const API_URL = config.API_URL + "users/";


const getUserAuth = async () => {
    const response = await api.get(API_URL + "me")

    return response.data;
};

const usersService = {
    getUserAuth,
};

export default usersService;
