import {
    ADD_CHAT_MESSAGE,
    ADD_CHAT_USER,
    REMOVE_CHAT_USER
} from './constants';

const initialState = {
    users:[],
    messages:[]
};

export default function users(state = initialState, action) {
    switch (action.type) {
        case ADD_CHAT_USER:
            return Object.assign({}, state, {
                users: [...state.users, action.user]
            });

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

        case ADD_CHAT_MESSAGE:
            return Object.assign({}, state, {
                messages: [...state.messages, action.message]
            });

        default:
            return state;
    }
}