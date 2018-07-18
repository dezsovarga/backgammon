import React from 'react';
import { connect } from 'react-redux';
import { logout } from 'authentication/login/actions';
import { fetchAccounts } from './actions';
import { removeUser } from 'chat/actions';
import AccountsTable from './components/admin/AccountsTable';
import Header from './components/Header';
import Navigation from './components/Navigation';

import ChatContainer from 'chat/ChatContainer';
import SockJS from 'sockjs-client';
import HomePage from "./components/HomePage";
import GamePage from "./components/game/GamePage";
import LeaderBoardPage from "./components/leaderBoard/LeaderBoardPage";
import AdminPage from "./components/admin/AdminPage";


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

    getContent(view, accounts) {
        let content;
        switch(view) {
            case "game":
                content = <GamePage/>;
                break;

            case "leader-board":
                content = <LeaderBoardPage/>;
                break;

            case "chat":
                content =
                    (<ChatContainer
                        stompClient = {this.stompClient}
                        {...this.props }
                    />);
                break;

            case "admin":
                content =
                    (<AdminPage
                        accounts = {accounts}
                        {...this.props}
                    />);
                break;

            default:
                content = <HomePage/>;
        }
        return content;
    }

	render () {
        const { accounts, params: {view}} = this.props;
        let content = null;
        if (accounts.data) {
            content = this.getContent(view, accounts);
        }

		return (
			<div className="home-page">
                <Header
                    {...this.props}
                />
                <Navigation
                    {...this.props}
                    onLogout={this.onLogout.bind(this)}
                />
                {content}
			</div>
		);
	}
}

function mapStateToProps(state) {
    return {
        authData: state.authData,
		accounts: state.accounts,
        currentUserView: state.chat.currentUserView,
        admin: state.admin
    };
}

function mapDispatchToProps(dispatch) {
    return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps) (HomeContainer);