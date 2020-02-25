import userReducer from './user';
import loggedReducer from './logged';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    user: userReducer,
    logged: loggedReducer
})

export default allReducers;

