import { SIGN_UP_REQUEST} from './constants';

export function registerAccount(registrationData) {
    return { type: SIGN_UP_REQUEST, registrationData };
}
