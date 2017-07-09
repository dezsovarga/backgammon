import {combineReducers} from 'redux';
import register from './components/authentication/signup/reducer';
import confirm from './components/authentication/confirm/reducer';
import login from './components/authentication/login/reducer';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
    register,
    confirm,
    login,
    form: formReducer
});

export default rootReducer;