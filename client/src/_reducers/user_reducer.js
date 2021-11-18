import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    RESET_PASSWORD,
    PASSWORD_EMAIL,
} from '../_actions/types';
 

export default function(state={},action){
    switch(action.type){
        case REGISTER_USER:
            return {...state, register: action.payload }
        case LOGIN_USER:
            return { ...state, loginSucces: action.payload }
        case AUTH_USER:
            return {...state, userData: action.payload }
        case LOGOUT_USER:
            return {...state }
        case RESET_PASSWORD:
            return {...state, resetPasswordSuccess: action.payload }
        case PASSWORD_EMAIL:
            return {...state, passwordEmailSuccess: action.payload }
        default:
            return state;
    }
}