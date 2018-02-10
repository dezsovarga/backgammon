import React from 'react';
import moment from 'moment';

export default class Message extends React.Component {
    render() {
        let messageType = this.props.type;
        let separator = messageType === "LEAVE" || messageType === "JOIN" ? " " : "";
        let content = messageType === "LEAVE" ? "has left" : messageType === "JOIN" ? "has joined" : this.props.content;
        // let content-type = messageType === "ERROR" ? "error" : "";
        let timestamp = moment().format('MMMM Do YYYY, h:mm a');
        return (
            <div className={`chat-message ${this.props.type}`}>
                <div className="author">
                    <div className="bullet" />
                    {this.props.author}
                    <span className="timestamp"> {timestamp} </span>
                </div>
                {separator}
                <div className={`message-content ${messageType}`}>
                    {content}
                </div>
                {this.props.children}
            </div>
        );
    }
}
