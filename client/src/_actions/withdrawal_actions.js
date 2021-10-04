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

export function getWithdrawal(dataToSubmit){
    const request = axios.get(`${WITHDRAWAL_SERVER}/`,dataToSubmit)
    .then(response => response.data);
    
    return {
        type: GET_WITHDRAWAL,
        payload: request
    }
}
