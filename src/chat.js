import React from "react";
import "./chat.css";
import io from "socket.io-client";

class Chat extends React.Component {
  constructor(props) {
    super(props);
    //add state to chat component for holding name, message and a array of messages
    this.state = {
      name: "",
      message: "",
      messages: [],
    };
    this.socket = io("localhost:8000");

    this.socket.on("receive", function (data) {
      appendMessage(data);
    });
    this.chatBox = React.createRef();

    //to append all the messages in the messages array
    const appendMessage = (data) => {
      this.setState({
        messages: [...this.state.messages, data],
      });
    };

    //to scroll down to bottom automatically in the message box
    this.scrollToMyRef = () => {
      const scroll =
        this.chatBox.current.scrollHeight - this.chatBox.current.clientHeight;
      this.chatBox.current.scrollTo(0, scroll);
    };

    //functionality to send message
    this.sendMessage = (e) => {
      this.socket.emit("send", {
        name: this.state.name,
        message: this.state.message,
      });
      this.setState({ message: "" }, () => this.scrollToMyRef());
    };
  }
  render() {
    return (
      <div className="chat-container">
        <div className="chat-header">
          Chat-App
          <img src="" alt="" height={17}></img>
        </div>
        {/* loop through all mesaages and display name and message */}
        <div ref={this.chatBox} className="chat-messages">
          <div>
            {this.state.messages.map((message, index) => {
              return (
                <div key={index}>
                  <h3>
                    {message.name}: <span>{message.message}</span>
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
        <div className="chat-footer">
          <input
            type="text"
            placeholder="your name"
            className="username"
            value={this.state.name}
            onChange={(e) => this.setState({ name: e.target.value })}
          />
          <input
            type="text"
            placeholder="message..."
            className="user-message"
            value={this.state.message}
            onChange={(e) => this.setState({ message: e.target.value })}
          />
          <button onClick={this.sendMessage}>Send</button>
        </div>
      </div>
    );
  }
}

export default Chat;
