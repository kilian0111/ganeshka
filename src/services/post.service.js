import config from '../config';
import api from '../config/api';

const API_URL = config.API_URL + "items/post";


const getAllPost = async () => {

    const response = await api.get(API_URL + '?fields=*,user_created.*' );

    return response.data;
};

const postPost = async (data) => {

    const response = await api.post(API_URL, data)
    return response;
}
const postService = {
    getAllPost,
    postPost,
};

export default postService;
