import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import SignUpForm from './components/SignUpForm';
// import SignUpInProgress from './components/SignUpInProgress';
import * as actions from './actions';

// @connect(mapStateToProps, mapDispatchToProps)

class SignUpContainer extends React.Component {

    onRegisterSubmit(registrationData) {
        const { dispatch } = this.props;
        return dispatch(
            actions.signUp(registrationData)
        );
    }

    render () {
        let content = null;

        if (this.props.signUp.inProgress) {
            content = (
                <SignUpInProgress
                    resendConfirmationEmail={this.resendConfirmationEmail.bind(this)}
                    {...this.props}
                />
            );
        } else {
            content = (
                <SignUpForm
                    onRegisterSubmit={this.onRegisterSubmit.bind(this)}
                />
            );
        }
        return content;
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

function mapDispatchToProps(dispatch) {
    return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps) (SignUpContainer);
