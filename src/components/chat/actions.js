import {
    ADD_CHAT_USER,
    REMOVE_CHAT_USER,
    ADD_CHAT_MESSAGE,
    LOAD_USER_LIST_AND_MESSAGES,
    LOAD_USER_LIST_AND_MESSAGES_REQUEST,
    SET_CURRENT_USER_VIEW,
    NOTIFY_NEW_MESSAGE,
    REMOVE_NOTIFY_NEW_MESSAGE
} from './constants';

export function setCurrentUserView(user) {
    return (dispatch) => {
        dispatch({
            type: SET_CURRENT_USER_VIEW,
            user
        });
    };
}

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

export function notifyNewMessage(sender) {
    return (dispatch) => {
        dispatch({
            type: NOTIFY_NEW_MESSAGE,
            sender
        });
    };
}

export function removeNotifyNewMessage(sender) {
    return (dispatch) => {
        dispatch({
            type: REMOVE_NOTIFY_NEW_MESSAGE,
            sender
        });
    };
}