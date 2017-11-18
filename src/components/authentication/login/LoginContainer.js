import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { authenticate } from './actions';
import Login from './components/LoginForm';

class LoginContainer extends React.Component {

    handleSubmit(loginData) {
        const { dispatch } = this.props;
        return dispatch(
            authenticate(loginData)
        );
    }

    render() {
        return (
            <Login
                {...this.props}
                onSubmit={this.handleSubmit.bind(this)}
            />
        );
    }
}
LoginContainer.propTypes = {
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        signUp: state.register,
        login: state.login
    };
}

function mapDispatchToProps(dispatch) {
    return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps) (LoginContainer);