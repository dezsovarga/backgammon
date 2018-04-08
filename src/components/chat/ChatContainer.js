import React from 'react';
import { connect } from 'react-redux';
import MessageList from './components/MessageList';
import UsersList from './components/UsersList';
import {addMessage, notifyNewMessage} from './actions';

class ChatContainer extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            comments: [],
            people: [],
            message: "",
            users: []
        };

        this.props.stompClient.connect({}, this.onConnected.bind(this), this.onError.bind(this));
    }

    componentDidMount() {

    }

    subScribeToMessageQueue(queueName, username) {

        this.props.stompClient.subscribe(`/topic/private.chat.${queueName}`, this.onMessageReceived.bind(this));

        // Tell your username to the server
        // this.props.stompClient.send("/app/chat.addUser",
        this.props.stompClient.send(`/app/private.chat.${queueName}`, {},
            JSON.stringify({
                sender: username,
                type: 'JOIN'
            })
        );
    }

    createMessageQueue(name1, name2) {
        let compareResult = name1.localeCompare(name2);
        return compareResult === -1 ? `${name1}_:_${name2}` : `${name2}_:_${name1}`;
    }

    onConnected() {
        let username = this.props.authData.username;
        let accounts = this.props.accounts.data;

        if (accounts.length == 0) {
            const queueName = this.createMessageQueue(username, username);
            this.subScribeToMessageQueue(queueName, username);
        } else {
            for (let value of accounts) {
                const queueName = this.createMessageQueue(username, value.email);
                this.subScribeToMessageQueue(queueName, username);
            }
        }
    }

    onError(error) {
        // console.log("Could not connect to WebSocket server. Please refresh this page to try again!");
        let message = {
            "content":"Could not connect to WebSocket server. Please refresh this page to try again!",
            "type": "ERROR"
        };
        this.state.comments.push(message);
        this.setState({
            comments: this.state.comments
        });
    }

    /*onPublicMessageReceived(payload) {

        let message = JSON.parse(payload.body);
        switch (message.type) {
            case "JOIN": {
                let joinedUser = {
                    name: message.sender,
                    status: "active"
                };
                this.props.dispatch(addUser(joinedUser));
                break;
            }

            case "LEAVE": {
                let leftUser = {
                    name: message.sender,
                    status: "active"
                };
                this.props.dispatch(removeUser(leftUser));
                break;
            }

        }
    }*/

    onMessageReceived(payload) {

        let message = JSON.parse(payload.body);
        let loggedInUser = this.props.authData.username;
        this.props.dispatch(addMessage(message, loggedInUser));
        if (!this.props.chat.hasNewMessage.includes(message.sender) &&
            loggedInUser !== message.sender) {
            this.props.dispatch(notifyNewMessage(message.sender));
        }

        let messageArea = document.getElementById("messageArea");
        messageArea.scrollTop = messageArea.scrollHeight;
    }

    sendMessage(sendTo) {
        let messageContent = this.state.message;
        let loggedInUser = this.props.authData.username;
        const messageQueue = this.createMessageQueue(loggedInUser, sendTo);
        if(messageContent && this.props.stompClient) {
            let chatMessage = {
                sender: this.props.authData.username,
                receiver: sendTo,
                content: messageContent,
                type: 'CHAT'
            };
            this.props.stompClient.send(`/app/private.chat.${messageQueue}`, {}, JSON.stringify(chatMessage));
        }
    }

    onMessageChange(e) {
        let message = e.target.value;
        this.setState({message: message});
    }

    handleKeyPress(sendTo, event) {
        if(event.key == 'Enter'){
            this.sendMessage(sendTo);
            event.target.value = '';
        }
    }

    render () {
        const {chat:{users, messages, loading, currentUserView},
                    params: {username} } = this.props;

        let commentsList = [];
        if (!loading) {
            let messagesToDisplayIndex = currentUserView ? messages.findIndex(x => x.id === currentUserView): 0;
            commentsList = messages.length ?
                messages[messagesToDisplayIndex].messageList : [];
        }

        return (
            <div className="chat-container">
                <UsersList
                    {...this.props}
                    users={users}
                />
                <div className="message-form">
                    <MessageList
                        {...this.props}
                        comments={commentsList}
                    />

                    <div className="input-form">
                        <input
                            type="text"
                            className="message-input"
                            placeholder="Type your message here"
                            aria-describedby="basic-addon1"
                            onChange={this.onMessageChange.bind(this)}
                            onKeyPress={this.handleKeyPress.bind(this, currentUserView)}
                        />
                        <span
                            className="btn btn-primary btn-sm "
                            onClick={this.sendMessage.bind(this, currentUserView)}
                        >
                        Send
                    </span>

                    </div>
                </div>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        chat: state.chat
    };
}

function mapDispatchToProps(dispatch) {
    return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps) (ChatContainer);