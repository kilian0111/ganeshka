import config from '../config';
import api from '../config/api';

const API_URL = config.API_URL + "users/";


const getUserAuth = async () => {
    const response = await api.get(API_URL + "me")

    return response.data;
};

const updateUser = async (data) => {
    const response = await api.patch(API_URL + "me", data)
    return response.data;
}

const deleteUser = async (id) => {
    const response = await api.delete(API_URL + id)
    return response.data;
}

const usersService = {
    getUserAuth,
    updateUser,
    deleteUser
};

export default usersService;
