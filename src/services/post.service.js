import config from '../config';
import api from '../config/api';

const API_URL = config.API_URL + "items/post";
const API_URL_LIKE = config.API_URL + "items/junction_directus_users_post";


const getAllPost = async () => {

    const response = await api.get(API_URL + '?fields=*,user_created.*' );

    return response.data;
};

const postPost = async (data) => {

    const response = await api.post(API_URL, data)
    return response;
}

const likePost = async (id, user_id) => {
    const response = await api.post(API_URL_LIKE,{
        post_id: id,
        directus_users_id: user_id,
    })
    return response;
}

const unlikePost = async (id) => {
    const response = await api.delete(API_URL_LIKE + '/' + id)
    return response;
}
const postService = {
    getAllPost,
    postPost,
    likePost,
    unlikePost,
};

export default postService;
