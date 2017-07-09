import Symbol from 'es6-symbol';
import ApiWrapper from './ApiWrapper';

const singleton = Symbol();
const singletonEnforcer = Symbol();

/**
 * Singleton class that encapsulates authentication related API calls
 */

export default class AuthenticationService {

    constructor(enforcer) {
        if (enforcer !== singletonEnforcer) throw new Error('Cannot construct singleton');
    }

    static get instance() {
        if (!this[singleton]) {
            this[singleton] = new AuthenticationService(singletonEnforcer);
        }
        return this[singleton];
    }

    /**
     * Login to app
     * @param {string} HTTP Basic Authorization header
     * @returns {string} The bearer token needed for all subsequent operations.
     */
    login(loginData) {
        const tokenEncoded = btoa(unescape(
            encodeURIComponent(`${loginData.username}:${loginData.password}`)));
        const config = {
            headers: {
                Authorization: `Basic ${tokenEncoded}`
            },
            params: {
                timestamp: Date.now().toString()
            }
        };
        // prevent caching the request using timestamp ( this seems to be relieable on IE too )
        // Note: setting no-cache header will not be enough for some stupid browsers
        return ApiWrapper.instance.axios.get('account/login', config);
    }

    createAccount(data) {
        const registrationRequest = {
            account: data,
            verificationLink: `${ApiWrapper.instance.getBaseURL()}/#verification`
        };

        return ApiWrapper.instance.axios.post(
            'account/register',
            JSON.stringify(registrationRequest)
        );
    }

    /**
     * Confirm email
     * @param {string} confirmToken
     * @returns {object} The promise object of the api call.
     */
    confirmEmail(confirmToken) {
        return ApiWrapper.instance.axios.get(
            'account/register/confirm',
            {
                headers: {
                    Authorization: confirmToken
                }
            }
        );
    }
}