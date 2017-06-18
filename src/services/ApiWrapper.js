import axios from 'axios';
import qs from 'qs';

const singleton = Symbol();
const singletonEnforcer = Symbol();

/**
 * Object that provides access to making HTTP requests using axios and
 * has the base configuration setup
 */
export default class ApiWrapper {

    constructor(enforcer, baseURL) {
        this.baseUrl = baseURL;
        this.axios = axios.create({
            baseURL: this.baseUrl,
            headers: {
                common: {},
                post: {}
            }
        });

        this.axios.defaults.timeout = 120 * 1000; // 120 sec
        this.cacheTime = 24 * 60; // 24 hours
        this.axios.defaults.headers.post['Content-Type'] = 'application/json';
        this.axios.defaults.paramsSerializer = (params) => {
            return qs.stringify(params, { arrayFormat: 'repeat' });
        };

        if (enforcer !== singletonEnforcer) throw new Error('Cannot construct singleton');
    }

    getBaseURL() {
        return this.baseUrl;
    }

    static get instance() {
        if (!this[singleton]) {
            this[singleton] = new ApiWrapper(singletonEnforcer, process.env.API_URL);
        }
        return this[singleton];
    }
}