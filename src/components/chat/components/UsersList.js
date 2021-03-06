import React from 'react';
import User from './User';

export default class UsersList extends React.Component {

    render() {
        let dispatch = this.props.dispatch;
        let usersWithNewMessages = this.props.chat.hasNewMessage;
        let currentUserView = this.props.chat.currentUserView;
        let userNodes = this.props.users.map(function(user, index) {
            return (
                <User
                    dispatch={dispatch}
                    currentUserView = {currentUserView}
                    usersWithNewMessages = {usersWithNewMessages}
                    name={user.email}
                    status={user.status}
                    key={index}
                />
            );
        });
        return (
            <div className="users-list" id="usersList">
                {userNodes}
            </div>
        );
    }
}