import {
    GET_GENERAL,
    CREATE_GENERAL
} from '../_actions/types';
 

export default function(state={},action){
    switch(action.type){
        case GET_GENERAL:
            return {...state, general: action.payload }
        case CREATE_GENERAL:
            return { ...state, createGeneral: action.payload }
        default:
            return state;
    }
}