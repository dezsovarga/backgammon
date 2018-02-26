import {combineReducers} from 'redux';
import {
    ADD_CHAT_MESSAGE,
    ADD_CHAT_USER,
    REMOVE_CHAT_USER
} from './constants';

const initialState = {
    users:[],
    messages:[
        // {"id":"public", "messageList":[]}
    ]
};

export default function users(state = initialState, action) {
    switch (action.type) {
        case ADD_CHAT_USER: {

            return Object.assign({}, state, {
                users: [...state.users, action.user],
                messages: [...state.messages, {"id":action.user.name, "messageList": []} ]
            });
        }

        case REMOVE_CHAT_USER: {
            const index = state.users.findIndex(x => x.name==action.user.name);
            return Object.assign({}, state, {
                users: [
                    ...state.users.slice(0, index),
                    ...state.users.slice(index + 1)
                ]
                // users: [...state.users, action.user]
            });
        }

        case ADD_CHAT_MESSAGE: {

            const userIndex = state.messages.findIndex(x => x.id == action.message.sender);
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