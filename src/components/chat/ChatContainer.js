import React from 'react';
import { connect } from 'react-redux';
import SockJS from 'sockjs-client';
import MessageList from './components/MessageList';
import UsersList from './components/UsersList';
import mockUsers from './data/users.json';

class ChatContainer extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            comments: [],
            people: [],
            message: "",
            users: mockUsers
        };

        let sockjs_url = new SockJS("http://localhost:8081/ws");
        this.stompClient = Stomp.over(sockjs_url);
        this.stompClient.connect({}, this.onConnected.bind(this), this.onError);
    }

    onConnected() {

        this.stompClient.subscribe("/topic/public", this.onMessageReceived.bind(this));

        // Tell your username to the server
        this.stompClient.send("/app/chat.addUser",
            {},
            JSON.stringify({sender: this.props.authData.username, type: 'JOIN'})
        );
    }

    onError(error) {
        console.log("Could not connect to WebSocket server. Please refresh this page to try again!");
    }

    onMessageReceived(payload) {
        let message = JSON.parse(payload.body);
        this.state.comments.push(message);
        this.setState({
            comments: this.state.comments
        });
        let messageArea = document.getElementById("messageArea");
        messageArea.scrollTop = messageArea.scrollHeight;
    }

    sendMessage(event) {
        let messageContent = this.state.message;
        if(messageContent && this.stompClient) {
            let chatMessage = {
                sender: this.props.authData.username,
                content: messageContent,
                type: 'CHAT'
            };
            this.stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
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
        return (
            <div className="chat-container">
                <UsersList
                    {...this.props}
                    users={this.state.users}
                />
                <div className="message-form">
                    <MessageList
                        {...this.props}
                        comments={this.state.comments}
                    />

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
        authData: state.authData
    };
}

function mapDispatchToProps(dispatch) {
    return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps) (ChatContainer);