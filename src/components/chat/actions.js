import {
    ADD_CHAT_USER,
    REMOVE_CHAT_USER,
    ADD_CHAT_MESSAGE
} from './constants';

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


export function addMessage(message) {
    return (dispatch) => {
        dispatch({
            type: ADD_CHAT_MESSAGE,
            message
        });
    };
}