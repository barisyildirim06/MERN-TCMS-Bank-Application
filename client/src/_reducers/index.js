import { combineReducers } from 'redux';
import user from './user_reducer';
import availableBalance from './available_balance_reducer';
import general from './general_reducer';
import withdrawal from './withdrawal_reducer';
const rootReducer = combineReducers({
    user,
    general,
    withdrawal,
    availableBalance,
});

export default rootReducer;