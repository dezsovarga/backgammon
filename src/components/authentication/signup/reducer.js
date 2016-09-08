import { SIGN_UP_REQUEST } from './constants';

export const signUpInitialState = {
    // inProgress tell us there is an undergoing registration process (not api call request)
    inProgress: false,
    authData: null,
    error: null
};

export default function register(state = signUpInitialState, action) {
    switch (action.type) {
        case  SIGN_UP_REQUEST:
            return Object.assign({}, state, {
                inProgress: true,
                error: null
            });
        default: return state;
    }
}