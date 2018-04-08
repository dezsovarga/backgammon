import {combineReducers} from 'redux';
import {
    ADD_CHAT_MESSAGE,
    ADD_CHAT_USER,
    LOAD_USER_LIST_AND_MESSAGES,
    LOAD_USER_LIST_AND_MESSAGES_REQUEST, NOTIFY_NEW_MESSAGE,
    REMOVE_CHAT_USER, REMOVE_NOTIFY_NEW_MESSAGE, SET_CURRENT_USER_VIEW
} from './constants';

const initialState = {
    users:[],
    messages:[],
    loadingData: true,
    currentUserView: null,
    hasNewMessage: []
};

export default function users(state = initialState, action) {
    switch (action.type) {

        case NOTIFY_NEW_MESSAGE: {
            return Object.assign({}, state, {
                hasNewMessage: [...state.hasNewMessage, action.sender]
            });
        }

        case REMOVE_NOTIFY_NEW_MESSAGE: {
            const userIndex = state.hasNewMessage.findIndex(x => x==action.sender);
            return Object.assign({}, state, {
                hasNewMessage: [
                    ...state.hasNewMessage.slice(0, userIndex),
                    ...state.hasNewMessage.slice(userIndex + 1)
                ]
            });
        }

        case SET_CURRENT_USER_VIEW: {
            return Object.assign({}, state, {
                currentUserView: action.user
            });
        }

        case LOAD_USER_LIST_AND_MESSAGES_REQUEST: {
            return Object.assign({}, state, {
                loadingData: true
            });
        }

        case LOAD_USER_LIST_AND_MESSAGES: {

            let messages = action.accounts.map( (item, index) => {
                return {
                    id:item.email,
                    messageList: []
                };
            });

            return Object.assign({}, state, {
                users: action.accounts,
                messages: messages,
                loadingData: false
            });
        }

        case ADD_CHAT_USER: {

            return Object.assign({}, state, {
                users: [...state.users, action.user],
                messages: [...state.messages, {"id":action.user.email, "messageList": []} ]
            });
        }

        case REMOVE_CHAT_USER: {
            const userIndex = state.users.findIndex(x => x.name==action.user.name);
            const messageIndex = state.messages.findIndex(x => x.id == action.user.name);
            return Object.assign({}, state, {
                users: [
                    ...state.users.slice(0, userIndex),
                    ...state.users.slice(userIndex + 1)
                ],
                messages: [
                    ...state.messages.slice(0, messageIndex),
                    ...state.messages.slice(messageIndex + 1)]
            });
        }

        case ADD_CHAT_MESSAGE: {

            let userToFind = action.loggedInUser === action.message.sender ?
                action.message.receiver : action.message.sender;
            const userIndex = state.messages.findIndex(x => x.id == userToFind);
            let privateMessages = state.messages.map( (item, index) => {
                if(index !== userIndex) {
                    // This isn't the item we care about - keep it as-is
                    return item;
                } else {
                    return {
                        id:item.id,
                        messageList: [...item.messageList, action.message]
                    };
                }
            });
            return Object.assign({}, state, {
                messages: privateMessages
            });
        }
        default:
            return state;
    }
}