import {
    ADD_CHAT_USER
} from '../constants';


export default function users(state = [], action) {
    switch (action.type) {
        case ADD_CHAT_USER:
            return Object.assign({}, state, {
                state: [...state, action.user]
            });

        default:
            return state;
    }
}