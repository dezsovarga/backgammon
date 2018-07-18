import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomeContainer from './components/home/HomeContainer';
import AboutPage from './components/about/AboutPage';
import SignUpContainer from './components/authentication/signup/SignUpContainer';
import LoginContainer from './components/authentication/login/LoginContainer';
import ConfirmationContainer from './components/authentication/confirm/ConfirmationContainer';
import EditAccount from "./components/home/components/admin/EditAccountForm";

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
                <Route path="/" component={HomeContainer} onEnter={requireAuth}/>
                <Route path="/about" component={AboutPage} onEnter={requireAuth}/>
                <Route path="/signup" component={SignUpContainer}/>
                <Route path="/login" component={LoginContainer}/>
                <Route path="/verification/:confirmToken" component={ConfirmationContainer}/>
                <Route path="/chat/:username" component={HomeContainer} />
                <Route path="/:view" component={HomeContainer} onEnter={requireAuth}/>
                <Route path="/admin/account/:accountId" component={EditAccount} onEnter={requireAuth}/>

            </Route>
        );
}