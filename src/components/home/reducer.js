import {
    FETCH_ACCOUNTS_FAILURE,
    FETCH_ACCOUNTS_REQUEST,
    FETCH_ACCOUNTS_SUCCESS
} from './constants';

export const initialState = {
    error: null,
    submitting: false,
    data: null
};

export default function accounts(state = initialState, action) {
    switch (action.type) {
        case FETCH_ACCOUNTS_REQUEST:
            return Object.assign({}, state, {
                submitting: true,
                error: null
            });

        case FETCH_ACCOUNTS_SUCCESS:
            return Object.assign({}, state, {
                submitting: false,
                data: action.data,
                error: null
            });

        case FETCH_ACCOUNTS_FAILURE:
            return Object.assign({}, state, {
                submitting: false,
                error: action.error
            });

        default:
            return state;
    }
}
