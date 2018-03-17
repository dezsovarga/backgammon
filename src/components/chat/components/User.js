import React from 'react';
import { Link } from 'react-router';

export default class User extends React.Component {
    render() {
        let username = this.props.name;
        let status = this.props.status;
        let linkTo = `/chat/${username}`;

        return (
            <Link to={linkTo}>
                <div className="chat-user">
                    <div className="avatar">

                    </div>
                    <div className="chat-username">
                        <div> {username} </div>
                        <div> {status} </div>
                    </div>
                    {this.props.children}
                </div>
            </Link>
        );
    }
}
