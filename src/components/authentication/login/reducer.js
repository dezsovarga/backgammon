import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    SET_AUTHDATA,
    CLEAR_AUTHDATA
} from './constants';

export const initialState = {
    submitting: false,
    error: null,
    authData: null
};

export const authDataInitialState = {
    token: null
};

export function authData(state = authDataInitialState, action) {
    switch (action.type) {
        case SET_AUTHDATA:
            return Object.assign({}, state, {
                token: action.data
        });

        case CLEAR_AUTHDATA:
            return null;

        default:
            return state;
    }
}

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
