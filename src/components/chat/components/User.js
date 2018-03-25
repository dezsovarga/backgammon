import React from 'react';
import {setCurrentUserView} from '../actions';
import classNames from 'classnames';

export default class User extends React.Component {

    setCurrentUser() {

        const { dispatch } = this.props;
        return dispatch(setCurrentUserView(this.props.name));
    }

    render() {
        let username = this.props.name;
        let status = this.props.status;
        const isCurrentView = this.props.currentUserView === username;
        const className = classNames({ 'chat-user': true }, { 'current-view': isCurrentView });

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
