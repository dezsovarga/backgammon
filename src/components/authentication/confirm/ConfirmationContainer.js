import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { confirmEmail } from './actions';
import ConfirmationPage from './components/ConfirmationPage';

class ConfirmationContainer extends React.Component {

    componentDidMount() {
        const { dispatch, params } = this.props;
        dispatch(
            confirmEmail(params.confirmToken)
        );
    }

    render() {
        return (
            <div className="confirm-container">
                <ConfirmationPage
                    {...this.props}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        signUp: state.register
    };
}

function mapDispatchToProps(dispatch) {
    return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps) (ConfirmationContainer);