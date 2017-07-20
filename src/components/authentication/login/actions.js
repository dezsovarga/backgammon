import AuthenticationService from 'services/AuthenticationService';
import LocalStorage from 'utils/LocalStorage';
import ApiWrapper from 'services/ApiWrapper';
import { LOCALSTORAGE_AUTH_DATA } from 'utils/constants';
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE
} from './constants';
// import { login } from 'authentication/actions';
// import { addTimestampToAuthData } from 'utils/AuthUtils';

export function authenticate(loginData) {
    return (dispatch) => {
        dispatch({
            type: LOGIN_REQUEST
        });

        return AuthenticationService.instance.login(loginData)
            .then((response) => {
                const authData = response.data;
                // Set authorization header
                ApiWrapper.instance.setAuthorizationHeader(authData);

                // Save data in LocalStorage
                LocalStorage.setEncodedItem(LOCALSTORAGE_AUTH_DATA, authData);

                dispatch({
                    type: LOGIN_SUCCESS
                });
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
