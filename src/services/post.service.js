import config from '../config';
import api from '../config/api';

const API_URL = config.API_URL + "items/post?fields=*,user_created.*";


const getAllPost = async (token) => {
    const config = {
        Authorization: `Bearer ${token}`
    };
    const response = await api.get(API_URL ,{
        headers: config,
    })

    return response.data;
};

const postService = {
    getAllPost,
};

export default postService;
