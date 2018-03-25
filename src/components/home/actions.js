import {
    FETCH_ACCOUNTS_REQUEST,
    FETCH_ACCOUNTS_SUCCESS,
    FETCH_ACCOUNTS_FAILURE} from './constants';

import DataService from '/services/DataService';
import {loadUserListAndMessages, setCurrentUserView} from "../chat/actions";

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
                dispatch(loadUserListAndMessages(response.data));
                dispatch(setCurrentUserView(response.data[0].email));
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
