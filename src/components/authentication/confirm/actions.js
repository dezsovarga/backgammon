import AuthenticationService from 'services/AuthenticationService';
import {
    CONFIRMATION_REQUEST,
    CONFIRMATION_SUCCESS,
    CONFIRMATION_FAILURE
} from './constants';
import {setAuthData} from '../actions';

export function confirmEmail(confirmToken) {
    return (dispatch) => {
        dispatch({
            type: CONFIRMATION_REQUEST
        });

        let authData;
        try {
            authData = JSON.parse(atob(confirmToken));
        } catch (ex) {
            dispatch({
                type: CONFIRMATION_FAILURE,
                error: 'Invalid verification link'
            });
            return null;
        }

        return AuthenticationService.instance.confirmEmail(authData.token)
            .then((response) => {
                dispatch({
                    type: CONFIRMATION_SUCCESS,
                    data: response.data,
                    confirmToken
                });
                dispatch(setAuthData(confirmToken));
            })
            .catch((error) => {
                let message;
                if (error.response.data.reason) {
                    message = error.response.data.reason;
                } else {
                    message = error.message;
                }

                dispatch({
                    type: CONFIRMATION_FAILURE,
                    error: message,
                    statusCode: error.response.status
                });
            });
    };
}
