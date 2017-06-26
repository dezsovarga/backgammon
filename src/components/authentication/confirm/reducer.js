import {
    CONFIRMATION_REQUEST,
    CONFIRMATION_SUCCESS,
    CONFIRMATION_FAILURE
} from './constants';

export const initialState = {
    submitting: false,
    error: null,
    inProgress: false,
    confirmToken: null,
    authData: null,
    statusCode: null
};

export default function confirmation(state = initialState, action) {
    switch (action.type) {
        case CONFIRMATION_REQUEST:
            return Object.assign({}, state, {
                submitting: true,
                error: null,
                inProgress: false
            });

        case CONFIRMATION_SUCCESS:
            return Object.assign({}, state, {
                submitting: false,
                inProgress: true,
                confirmToken: action.confirmToken,
                authData: action.data,
                error: null
            });

        case CONFIRMATION_FAILURE:
            return Object.assign({}, state, {
                submitting: false,
                error: action.error,
                inProgress: false,
                statusCode: action.statusCode
            });

        default:
            return state;
    }
}
