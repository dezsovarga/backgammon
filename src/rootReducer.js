import {combineReducers} from 'redux';
import register from './components/authentication/signup/reducer';
import confirm from './components/authentication/confirm/reducer';
import {login, authData} from './components/authentication/login/reducer';
import { routerReducer } from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
    register,
    confirm,
    login,
    authData,
    routing: routerReducer,
    form: formReducer
});

export default rootReducer;