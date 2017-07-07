import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import SignUpContainer from './components/authentication/signup/SignUpContainer';
import LoginContainer from './components/authentication/login/LoginContainer';
import ConfirmationContainer from './components/authentication/confirm/ConfirmationContainer';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="about" component={AboutPage} />
        <Route path="signup" component={SignUpContainer} />
        <Route path="login" component={LoginContainer} />
        <Route path="verification/:confirmToken" component={ConfirmationContainer}/>
    </Route>
);