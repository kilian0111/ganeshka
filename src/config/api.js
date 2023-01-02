import axios from 'axios';
import config from '../config';
import {useDispatch} from "react-redux";
import { reloadToken } from '../slices/auth';


const instance = axios.create({
    withCredentials: true,
    baseURL: `${config.API_URL}`,
});


export default instance;
