import userReducer from './user';
import songReducer from './song';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    user: userReducer,
    song: songReducer
})

export default allReducers;

