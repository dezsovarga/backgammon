import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import SignUpForm from './SignUpForm';
import * as actions from './actions';


// @connect(mapStateToProps, mapDispatchToProps)

 class SignUpContainer extends React.Component {

    onRegisterSubmit(registrationData) {
        this.props.dispatch(
            actions.registerAccount(registrationData)
        );
    }

    render () {
        return (
            <SignUpForm
                onRegisterSubmit={this.onRegisterSubmit.bind(this)}
                signUpData = {this.props.signUp.inProgress}
            />
        );
    }
}

SignUpContainer.propTypes = {
    dispatch: PropTypes.func.isRequired
};
function mapStateToProps(state) {
    return {
        signUp: state.register
    };
}


export default connect(mapStateToProps) (SignUpContainer);