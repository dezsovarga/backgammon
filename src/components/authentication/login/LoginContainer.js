import React from 'react';
import Login from './components/LoginForm';

export default class LoginContainer extends React.Component {
    render() {
        return (
            <Login
                {...this.props}
            />
        );
    }
}
