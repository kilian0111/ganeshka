import config from '../config';
import api from '../config/api';

const API_URL = config.API_URL + "files";


const uploadFile = async (file) => {
    let config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    const response = await api.post(API_URL, file,  config)

    return response.data;
};

const uploadFileService = {
    uploadFile,
};

export default uploadFileService;
