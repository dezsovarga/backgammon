import {
    ADD_CHAT_USER,
    REMOVE_CHAT_USER,
    ADD_CHAT_MESSAGE,
    LOAD_USER_LIST_AND_MESSAGES,
    LOAD_USER_LIST_AND_MESSAGES_REQUEST
} from './constants';

export function loadUserListAndMessages(accounts) {
    return (dispatch) => {
        dispatch({
            type: LOAD_USER_LIST_AND_MESSAGES_REQUEST
        });
        dispatch({
            type: LOAD_USER_LIST_AND_MESSAGES,
            accounts
        });
    };
}

export function addUser(user) {
    return (dispatch) => {
        dispatch({
            type: ADD_CHAT_USER,
            user
        });
    };
}

export function removeUser(user) {
    return (dispatch) => {
        dispatch({
            type: REMOVE_CHAT_USER,
            user
        });
    };
}


export function addMessage(message, loggedInUser) {
    return (dispatch) => {
        dispatch({
            type: ADD_CHAT_MESSAGE,
            message,
            loggedInUser
        });
    };
}