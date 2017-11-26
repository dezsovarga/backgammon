import { browserHistory } from 'react-router';
import {
    SET_AUTHDATA,
    CLEAR_AUTHDATA
} from './constants';
import LocalStorage from 'utils/LocalStorage';
import ApiWrapper from 'services/ApiWrapper';
import { LOCALSTORAGE_AUTH_DATA } from 'utils/constants';

// set up authentication data
export function setAuthData(data) {
    return (dispatch) => {
        // Set authorization header
        ApiWrapper.instance.setAuthorizationHeader(data);

        // Save data in LocalStorage
        LocalStorage.setEncodedItem(LOCALSTORAGE_AUTH_DATA, data);
        let authData = JSON.parse(atob(data));
        let token = authData.token;
        let username = authData.username;

        // Update store with AuthData
        dispatch({
            type: SET_AUTHDATA,
            token,
            username
        });
    };
}

// clear authentication data
export function clearAuthData() {
    return (dispatch) => {
        // Remove authorization header
        ApiWrapper.instance.removeAuthorizationHeader();

        // Save data in LocalStorage
        LocalStorage.removeItem(LOCALSTORAGE_AUTH_DATA);

        // Update store with AuthData
        dispatch({
            type: CLEAR_AUTHDATA
        });

        // Mandatory redirect
        browserHistory.push('/login');
    };
}