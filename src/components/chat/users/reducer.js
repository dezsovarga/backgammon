import {
    ADD_CHAT_USER,
    REMOVE_CHAT_USER
} from '../constants';


export default function users(state = [], action) {
    switch (action.type) {

        case ADD_CHAT_USER: {
            return Object.assign({}, state, {
                users: [...state.users, action.user],
                messages: [...state.messages, {[action.user.name]: []} ]
            });
        }

        case REMOVE_CHAT_USER: {
            const index = state.users.findIndex(x => x.name==action.user.name);
            return Object.assign({}, state, {
                users: [
                    ...state.users.slice(0, index),
                    ...state.users.slice(index + 1)
                ]
            });
        }

        default:
            return state;
    }
}