import { combineReducers } from 'redux';
import authReducer from './authReducer';
import blogReducer from './blogReducer';

export default combineReducers({
    log: authReducer,
    tech: blogReducer
});
