import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import SignUpForm from './SignUpForm';
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
        return (
            <SignUpForm
                onRegisterSubmit={this.onRegisterSubmit.bind(this)}
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

function mapDispatchToProps(dispatch) {
    return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps) (SignUpContainer);
