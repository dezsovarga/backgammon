import React from 'react';
import { connect } from 'react-redux';
import { logout } from 'authentication/login/actions';

class HomePage extends React.Component {

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
			</div>
		);
	}
}

function mapStateToProps(state) {
    return {
        authData: state.authData
    };
}

export default connect(mapStateToProps) (HomePage);