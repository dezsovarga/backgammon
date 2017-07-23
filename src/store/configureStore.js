import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../rootReducer';
import thunk from 'redux-thunk';
import { routerReducer } from 'react-router-redux';

export default function configureStore(initialState) {

    return createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(thunk),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    );
}