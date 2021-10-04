import {
    GET_WITHDRAWAL,
    CREATE_WITHDRAWAL
} from '../_actions/types';
 

export default function(state={},action){
    switch(action.type){
        case GET_WITHDRAWAL:
            return {...state, withdrawal: action.payload }
        case CREATE_WITHDRAWAL:
            return { ...state, createWithdrawal: action.payload }
        default:
            return state;
    }
}