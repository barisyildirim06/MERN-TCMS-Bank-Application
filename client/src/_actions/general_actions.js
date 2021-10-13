import axios from 'axios';
import {
    CREATE_GENERAL,
    GET_GENERAL
} from './types';
import { GENERAL_SERVER } from '../components/Config.js';

export function createGeneral(dataToSubmit){
    const request = axios.post(`${GENERAL_SERVER}/create`,dataToSubmit)
    .then(response => response.data);
    
    return {
        type: CREATE_GENERAL,
        payload: request
    }
}

export function getGeneral(userID){
    const data = { userID }
    const request = axios.post(`${GENERAL_SERVER}/`,data)
    .then(response => response.data);
    
    return {
        type: GET_GENERAL,
        payload: request
    }
}
