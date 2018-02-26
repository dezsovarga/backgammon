import React from 'react';
import { Route } from 'react-router-dom';
import App from './components/App';
import HomePage from './components/home/HomeContainer';
import AboutPage from './components/about/AboutPage';
import SignUpContainer from './components/authentication/signup/SignUpContainer';
import LoginContainer from './components/authentication/login/LoginContainer';
import ConfirmationContainer from './components/authentication/confirm/ConfirmationContainer';

export default function routes(store) {

    function requireAuth(nextState, replace) {
        const isUserAuthenticated = store.getState().authData.token;

        if (!isUserAuthenticated) {
            replace({
                pathname: '/login',
                state: { nextPathname: nextState.location.pathname }
            });
        }
    }

        return (
            <Route name="app" component={App}>
                {/*<IndexRoute component={HomePage}/>*/}
                <Route path="/" component={HomePage} onEnter={requireAuth}/>
                <Route path="/about" component={AboutPage} onEnter={requireAuth}/>
                <Route path="/signup" component={SignUpContainer}/>
                <Route path="/login" component={LoginContainer}/>
                <Route path="/verification/:confirmToken" component={ConfirmationContainer}/>
                <Route path="/chat/:username" component={HomePage} />

            </Route>
        );
}