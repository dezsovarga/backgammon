import React from 'react';
import App from './components/App';
import HomePage from './components/home/HomeContainer';
import AboutPage from './components/about/AboutPage';
import SignUpContainer from './components/authentication/signup/SignUpContainer';
import LoginContainer from './components/authentication/login/LoginContainer';
import ConfirmationContainer from './components/authentication/confirm/ConfirmationContainer';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

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
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={HomePage} onEnter={requireAuth}/>
                    <Route path="/about" component={AboutPage} onEnter={requireAuth}/>
                    <Route path="/signup" component={SignUpContainer}/>
                    <Route path="/login" component={LoginContainer}/>
                    <Route path="/verification/:confirmToken" component={ConfirmationContainer}/>
                    <Route path="/chat/:username" component={HomePage} />
                </Switch>
            </BrowserRouter>
            /*<Route name="app" component={App}>
                {/!*<IndexRoute component={HomePage}/>*!/}
                <Route path="/" component={HomePage} onEnter={requireAuth}/>
                <Route path="/about" component={AboutPage} onEnter={requireAuth}/>
                <Route path="/signup" component={SignUpContainer}/>
                <Route path="/login" component={LoginContainer}/>
                <Route path="/verification/:confirmToken" component={ConfirmationContainer}/>
                <Route path="/chat/:username" component={HomePage} />

            </Route>
            */
        );
}