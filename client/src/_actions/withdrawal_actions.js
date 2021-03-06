import axios from 'axios';
import {
    CREATE_WITHDRAWAL,
    GET_WITHDRAWAL
} from './types';
import { WITHDRAWAL_SERVER } from '../components/Config.js';

export function createWithdrawal(dataToSubmit){
    const request = axios.post(`${WITHDRAWAL_SERVER}/create`,dataToSubmit)
    .then(response => response.data);
    
    return {
        type: CREATE_WITHDRAWAL,
        payload: request
    }
}

export function getWithdrawal(userID){
    const data = { userID }
    const request = axios.post(`${WITHDRAWAL_SERVER}/`,data)
    .then(response => response.data);
    
    return {
        type: GET_WITHDRAWAL,
        payload: request
    }
}
