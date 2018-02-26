import React from 'react';
import { connect } from 'react-redux';
import MessageList from './components/MessageList';
import UsersList from './components/UsersList';
import mockUsers from './data/users.json';
import {addUser, removeUser, addMessage} from './actions';

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

    onConnected() {

        this.props.stompClient.subscribe("/topic/public", this.onMessageReceived.bind(this));

        // Tell your username to the server
        this.props.stompClient.send("/app/chat.addUser",
            {},
            JSON.stringify({sender: this.props.authData.username, type: 'JOIN'})
        );
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

    onMessageReceived(payload) {

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


        this.props.dispatch(addMessage(message));

        let messageArea = document.getElementById("messageArea");
        messageArea.scrollTop = messageArea.scrollHeight;
    }

    sendMessage(event) {
        let messageContent = this.state.message;
        if(messageContent && this.props.stompClient) {
            let chatMessage = {
                sender: this.props.authData.username,
                content: messageContent,
                type: 'CHAT'
            };
            this.props.stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
        }
    }

    onMessageChange(e) {
        let message = e.target.value;
        this.setState({message: message});
    }

    handleKeyPress(event) {
        if(event.key == 'Enter'){
            this.sendMessage(event);
            event.target.value = '';
        }
    }

    render () {
        const {chat:{users, messages}, params: {username}} = this.props;

        let messagesToDisplayIndex = username ? messages.findIndex(x => x.id === username): 0;

        const messageList = messages.length ?
            <MessageList
                {...this.props}
                comments={messages[messagesToDisplayIndex].messageList}
            /> : '';
        return (
            <div className="chat-container">
                <UsersList
                    {...this.props}
                    users={this.props.chat.users}
                />
                <div className="message-form">
                    {messageList}

                    <div className="input-form">
                        <input
                            type="text"
                            className="message-input"
                            placeholder="Type your message here"
                            aria-describedby="basic-addon1"
                            onChange={this.onMessageChange.bind(this)}
                            onKeyPress={this.handleKeyPress.bind(this)}
                        />
                        <span
                            className="btn btn-primary btn-sm "
                            onClick={this.sendMessage.bind(this)}
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