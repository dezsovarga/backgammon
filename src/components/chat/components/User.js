import React from 'react';
import {setCurrentUserView, removeNotifyNewMessage} from '../actions';
import classNames from 'classnames';

export default class User extends React.Component {

    setCurrentUser() {

        const { dispatch } = this.props;
        dispatch(setCurrentUserView(this.props.name));
        dispatch(removeNotifyNewMessage(this.props.name));
    }

    render() {

        let username = this.props.name;
        let status = this.props.status;
        let usersWithNewMessages = this.props.usersWithNewMessages;
        const isCurrentView = this.props.currentUserView === username;
        let hasNewMessage = usersWithNewMessages.includes(username) ? true : false;
        const className = classNames({ 'chat-user': true }, { 'current-view': isCurrentView },
            {'has-new-message': hasNewMessage });

        return (
            <div onClick={this.setCurrentUser.bind(this)}>
                <div className={className}>
                    <div className="avatar">

                    </div>
                    <div className="chat-username">
                        <div> {username} </div>
                        <div> {status} </div>
                    </div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
