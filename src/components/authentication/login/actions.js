import { browserHistory } from 'react-router';
import AuthenticationService from 'services/AuthenticationService';
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE
} from './constants';
import { clearAuthData, setAuthData } from '../actions';
// import { login } from 'authentication/actions';
// import { addTimestampToAuthData } from 'utils/AuthUtils';

// logout user with auth data
export function logout() {
    return (dispatch) => {
        dispatch(clearAuthData());
    };
}

export function authenticate(loginData) {
    return (dispatch) => {
        dispatch({
            type: LOGIN_REQUEST
        });

        return AuthenticationService.instance.login(loginData)
            .then((response) => {
                const authData = response.data;
                dispatch(setAuthData(authData));

                dispatch({
                    type: LOGIN_SUCCESS,
                    authData
                });

                // Redirect
                const route = '/';
                browserHistory.push(route);
            })
            .catch((error) => {
                let message;
                if (error.response.data.reason) {
                    message = error.response.data.reason;
                } else {
                    message = error.message;
                }

                dispatch({
                    type: LOGIN_FAILURE,
                    error: message
                });
            });
    };
}
