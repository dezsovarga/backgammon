import React from 'react';
import { connect } from 'react-redux';
import { logout } from 'authentication/login/actions';
import { fetchAccounts } from './actions';
import AccountsTable from './components/AccountsTable';

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
			<div className="jumbotron">
				<h1> Backgammon </h1>
				<p> Welcome  {this.props.authData.username}</p>

				<span onClick={this.onLogout.bind(this)} className="btn btn-primary btn-lg"> Log out </span>

				<AccountsTable
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