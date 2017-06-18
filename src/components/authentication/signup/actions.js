import AuthenticationService from 'services/AuthenticationService';
import {
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE
} from './constants';

function handleSignup(registrationData, resend) {
    return (dispatch) => {
        dispatch({
            type: SIGNUP_REQUEST,
            resend
        });

        return AuthenticationService.instance.createAccount(registrationData)
            .then((response) => {
                dispatch({
                    type: SIGNUP_SUCCESS,
                    data: response.data,
                    resend,
                    registrationData
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
                    type: SIGNUP_FAILURE,
                    error: message
                });
            });
    };
}

export function signUp(data) {
    return handleSignup(data, false);
}

export function signUpAndResend(data) {
    return handleSignup(data, true);
}
