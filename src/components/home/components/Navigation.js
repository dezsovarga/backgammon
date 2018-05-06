import React from 'react';
import { Link } from 'react-router';

export default class Navigation extends React.Component {

    getLoginLink() {
        return (
            <Link to="/login">
                Login
            </Link>
        );
    }

    render() {

        const {authData} = this.props;
        const isUserAuthenticated = authData.token;


        const welcomeUser = (
            <div className="right">
                <span> Welcome {authData.username} </span>
                <span onClick={this.props.onLogout} className="logout-header"> Log out </span>
            </div>
        );
        const userData = isUserAuthenticated ? welcomeUser : this.getLoginLink();

        return (
            <div className="topnav">
                <Link to="/"> Home </Link>
                <Link to="/game"> Game </Link>
                <Link to="/leader-board"> LeaderBoard </Link>
                <Link to="/chat"> Chat </Link>
                <Link to="/admin"> Admin </Link>
                {userData}
            </div>
        );
    }
}