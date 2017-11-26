import {
    SET_AUTHDATA,
    CLEAR_AUTHDATA
} from './constants';

export const authDataInitialState = {
    token: null
};

export function authData(state = authDataInitialState, action) {
    switch (action.type) {
        case SET_AUTHDATA:
            return Object.assign({}, state, {
                token: action.token,
                username: action.username
            });

        case CLEAR_AUTHDATA:
            return null;

        default:
            return state;
    }
}