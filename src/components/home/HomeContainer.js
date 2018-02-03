import React from 'react';
import { connect } from 'react-redux';
import { logout } from 'authentication/login/actions';
import { fetchAccounts } from './actions';
import AccountsTable from './components/AccountsTable';
import ChatContainer from 'chat/ChatContainer';


class HomeContainer extends React.Component {

	componentDidMount() {
        const { dispatch } = this.props;
		dispatch(fetchAccounts());
	}

    onLogout() {
        const { dispatch } = this.props;
        dispatch(logout());
    }

	render () {
		return (
			<div className="home-page">
				<div className="welcome-header">
					<span onClick={this.onLogout.bind(this)} className="logout-header"> Log out </span>
					<span className="welcome-username"> Welcome  {this.props.authData.username} </span>
				</div>



				<ChatContainer
                    {...this.props }
				/>
			</div>
		);
	}
}

function mapStateToProps(state) {
    return {
        authData: state.authData,
		accounts: state.accounts
    };
}

function mapDispatchToProps(dispatch) {
    return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps) (HomeContainer);