import {
    GET_AVAILABLE_BALANCE,
} from '../_actions/types';
 

export default function(state={},action){
    switch(action.type){
        case GET_AVAILABLE_BALANCE:
            return {...state, availableBalance: action.payload }
        default:
            return state;
    }
}