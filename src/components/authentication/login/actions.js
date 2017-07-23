import { browserHistory } from 'react-router';
import AuthenticationService from 'services/AuthenticationService';
import LocalStorage from 'utils/LocalStorage';
import ApiWrapper from 'services/ApiWrapper';
import { LOCALSTORAGE_AUTH_DATA } from 'utils/constants';
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    SET_AUTHDATA
} from './constants';
// import { login } from 'authentication/actions';
// import { addTimestampToAuthData } from 'utils/AuthUtils';

// set up authentication data
export function setAuthData(data) {
    return (dispatch) => {
        // Set authorization header
        ApiWrapper.instance.setAuthorizationHeader(data);

        // Save data in LocalStorage
        LocalStorage.setEncodedItem(LOCALSTORAGE_AUTH_DATA, data);

        // Update store with AuthData
        dispatch({
            type: SET_AUTHDATA,
            data
        });
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
                if (error.response) {
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
