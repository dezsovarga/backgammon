import {
    FETCH_ACCOUNTS_REQUEST,
    FETCH_ACCOUNTS_SUCCESS,
    FETCH_ACCOUNTS_FAILURE} from './constants';

import DataService from '/services/DataService';

export function fetchAccounts() {
    return (dispatch) => {
        dispatch({
            type: FETCH_ACCOUNTS_REQUEST
        });

        return DataService.instance.getAllAccounts()
            .then((response) => {
                dispatch({
                    type: FETCH_ACCOUNTS_SUCCESS,
                    data: response.data
                });
            })
            .catch((error) => {
                let message;
                if (error.response.data.reason) {
                    message = error.response.data.reason;
                } else {
                    message = error.message;
                }

                dispatch({
                    type: FETCH_ACCOUNTS_FAILURE,
                    error: message
                });
            });
    };
}
