import {
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE
} from './constants';

export const initialState = {
    submitting: false,
    error: null,
    inProgress: false,
    registrationData: null,
    token: null,
    mailReSent: null
};

export default function signUp(state = initialState, action) {
    switch (action.type) {
        case SIGNUP_REQUEST:
            return Object.assign({}, state, {
                submitting: true,
                error: null,
                inProgress: action.resend || false
            });

        case SIGNUP_SUCCESS:
            return Object.assign({}, state, {
                submitting: false,
                inProgress: true,
                mailReSent: action.resend,
                registrationData: action.registrationData,
                token: action.data,
                error: null
            });

        case SIGNUP_FAILURE:
            return Object.assign({}, state, {
                submitting: false,
                error: action.error,
                inProgress: false
            });

        default:
            return state;
    }
}
