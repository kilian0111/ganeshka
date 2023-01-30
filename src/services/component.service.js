import config from '../config';
import api from '../config/api';

const API_URL = config.API_URL + "";

const getAllComponents = async () => {
    const response = await api.get(API_URL + "items/components");
    return response.data;
}

const addComponent = async (data) => {
    const response = await api.post(API_URL + "items/componentuser", data);
    return response.data;
}

const getAllComponentsUser = async (userId) => {
    const response = await api.get(API_URL + "items/componentuser?filter[directus_users_id][_eq]=" + userId);
    return response.data.data;
}


const updateComponent = async (userId,data) => {
    let allComponent = await getAllComponentsUser(userId);
    if(allComponent != null && allComponent.length > 0) {
        let listId = [];
        allComponent.forEach(element => {
            listId.push(element.id);
        });
        await api.delete(API_URL + "items/componentuser", {
            data: listId
        });
    }
    await addComponent(data);
}

const componentService = {
    getAllComponents,updateComponent
};

export default componentService;
