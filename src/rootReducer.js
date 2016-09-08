import {combineReducers} from 'redux';
import register from './components/authentication/signup/reducer';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
    register,
    form: formReducer
});

export default rootReducer;