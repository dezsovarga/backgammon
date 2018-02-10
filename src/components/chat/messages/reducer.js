import {
    ADD_CHAT_MESSAGE
} from '../constants';


export default function messages(state = [], action) {
    switch (action.type) {
        case ADD_CHAT_MESSAGE:
            return state.concat([
                {
                    message: action.message
                }
            ]);

        default:
            return state;
    }
}