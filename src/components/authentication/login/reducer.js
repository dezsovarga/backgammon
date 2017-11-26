import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE
} from './constants';

export const initialState = {
    submitting: false,
    error: null,
    authData: null
};

export function login(state = initialState, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return Object.assign({}, state, {
                submitting: true,
                error: null
            });

        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                submitting: false,
                error: null,
                authData: action.authData
            });

        case LOGIN_FAILURE:
            return Object.assign({}, state, {
                submitting: false,
                error: action.error
            });

        default:
            return state;
    }
}
