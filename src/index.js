import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import { createBrowserHistory } from 'history';
import { syncHistoryWithStore } from 'react-router-redux';
import LocalStorage from 'utils/LocalStorage';
import { setAuthData } from 'authentication/actions';
import { LOCALSTORAGE_AUTH_DATA } from 'utils/constants';
import './styles/main.scss';
import  '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import AppRoutes from './routes';

const store = configureStore();
const history = syncHistoryWithStore(createBrowserHistory(), store);

// Update authData from localstorage
const authData = LocalStorage.getEncodedItem(LOCALSTORAGE_AUTH_DATA);
if (authData) {
    store.dispatch(setAuthData(authData));
}

render(
    <Provider store={store}>
        <AppRoutes />
    </Provider>,
    document.getElementById('app')
);