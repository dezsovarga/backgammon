export default function registerAccountReducer(state = [], action) {
    switch (action.type) {
        case 'REGISTER_ACCOUNT':
            return state;
        default: return state;
    }
}