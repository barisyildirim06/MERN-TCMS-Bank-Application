import axios from 'axios';
import {
    GET_AVAILABLE_BALANCE,
} from './types';
import { AVAILABLE_BALANCE_SERVER } from '../components/Config.js';

export function getAvailableBalance(){
    const request = axios.get(`${AVAILABLE_BALANCE_SERVER}/`)
    .then(response => response.data);
    
    return {
        type: GET_AVAILABLE_BALANCE,
        payload: request
    }
}
