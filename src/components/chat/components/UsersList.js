import React from 'react';
import User from './User';

export default class UsersList extends React.Component {

    render() {
        let userNodes = this.props.users.map(function(user, index) {
            return (
                <User
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