import React from 'react';
import SignUpForm from './SignUpForm';

class SignUpContainer extends React.Component {

    onRegisterSubmit(registrationData) {
        console.log(registrationData);
    }

    render () {
        return (
            <SignUpForm
                onRegisterSubmit={this.onRegisterSubmit.bind(this)}
            />
        );
    }
}

export default SignUpContainer;