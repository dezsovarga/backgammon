import Symbol from 'es6-symbol';
import ApiWrapper from './ApiWrapper';

const singleton = Symbol();
const singletonEnforcer = Symbol();

export default class DataService {

    constructor(enforcer) {
        if (enforcer !== singletonEnforcer) throw new Error('Cannot construct singleton');
    }

    static get instance() {
        if (!this[singleton]) {
            this[singleton] = new DataService(singletonEnforcer);
        }
        return this[singleton];
    }

    /**
     * Get all accounts
     * @returns {object} The promise object of the api call.
     */
    getAllAccounts() {
        return ApiWrapper.instance.axios.get(
            'home/users'
        );
    }
}