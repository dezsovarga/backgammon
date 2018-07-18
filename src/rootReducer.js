import {combineReducers} from 'redux';
import register from './components/authentication/signup/reducer';
import confirm from './components/authentication/confirm/reducer';
import {login} from './components/authentication/login/reducer';
import {authData} from './components/authentication/reducer';
import accounts from './components/home/reducer';
import { routerReducer } from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';
import chat from './components/chat/reducer';
import admin from './components/home/components/admin/reducer';

const rootReducer = combineReducers({
    register,
    confirm,
    login,
    authData,
    accounts,
    chat,
    admin,
    routing: routerReducer,
    form: formReducer
});

export default rootReducer;