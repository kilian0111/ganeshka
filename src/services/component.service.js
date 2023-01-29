import config from '../config';
import api from '../config/api';

const API_URL = config.API_URL + "";

const getAllComponents = async () => {
    const response = await api.get(API_URL + "items/components");
    return response.data;
}

const addComponent = async (data) => {
    console.log(data);
        const response = await api.patch(API_URL + "users/me?fields=component.*", data);
        return response.data;
}

const componentService = {
    addComponent, getAllComponents
};

export default componentService;
