import React from 'react';
import Message from './Message';

export default class MessageForm extends React.Component {

    render() {
        let commentNodes = this.props.comments.map(function(comment, index) {
            return (
                <Message
                    author={comment.sender}
                    type={comment.type}
                    key={index}
                    content = {comment.content}
                />
            );
        });
        return (
            <div className="message-area" id="messageArea">
                {commentNodes}

            </div>
        );
    }
}