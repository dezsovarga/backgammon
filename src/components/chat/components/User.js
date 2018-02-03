import React from 'react';

export default class User extends React.Component {
    render() {
        let username = this.props.name;
        let status = this.props.status;

        return (
            <div className="chat-user">
                <div className="avatar">

                </div>
                <div className="chat-username">
                    <div> {username} </div>
                    <div> {status} </div>
                </div>
                {this.props.children}
            </div>
        );
    }
}
