import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import LocalStorage from 'utils/LocalStorage';
import { setAuthData } from 'authentication/actions';
import routes from './routes';
import { LOCALSTORAGE_AUTH_DATA } from 'utils/constants';
import './styles/main.css';
import  '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

// Update authData from localstorage
const authData = LocalStorage.getEncodedItem(LOCALSTORAGE_AUTH_DATA);
if (authData) {
    store.dispatch(setAuthData(authData));
}

render(
    <Provider store={store}>
        <Router children={routes(store)} history={history}/>
    </Provider>,
    document.getElementById('app')
);