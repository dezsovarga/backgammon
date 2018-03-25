import React from 'react';
import { connect } from 'react-redux';
import { logout } from 'authentication/login/actions';
import { fetchAccounts } from './actions';
import { removeUser } from 'chat/actions';
import AccountsTable from './components/AccountsTable';
import ChatContainer from 'chat/ChatContainer';
import SockJS from 'sockjs-client';


class HomeContainer extends React.Component {

    constructor(props, context) {
        super(props, context);

        let sockjs_url = new SockJS("http://localhost:8081/ws");
        this.stompClient = Stomp.over(sockjs_url);
    }

	componentDidMount() {
        const { dispatch } = this.props;
		dispatch(fetchAccounts());
	}

	removeFromUserList() {
        const { dispatch } = this.props;
        const userToLeft = {
			name: this.props.authData.username
        };
		dispatch(removeUser(userToLeft));
    }

    onLogout() {
        const { dispatch } = this.props;
        dispatch(logout());
        this.stompClient.disconnect();
        // this.removeFromUserList();
    }

	render () {
		return (
			<div className="home-page">
				<div className="welcome-header">
					<span onClick={this.onLogout.bind(this)} className="logout-header"> Log out </span>
					<span className="welcome-username"> Welcome  {this.props.authData.username} </span>
				</div>

				<ChatContainer
					stompClient = {this.stompClient}
                    {...this.props }
				/>
			</div>
		);
	}
}

function mapStateToProps(state) {
    return {
        authData: state.authData,
		accounts: state.accounts,
        currentUserView: state.chat.currentUserView
    };
}

function mapDispatchToProps(dispatch) {
    return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps) (HomeContainer);