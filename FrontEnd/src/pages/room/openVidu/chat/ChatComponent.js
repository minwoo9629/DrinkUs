import React, { Component } from "react";
import styled from "styled-components";
import "./ChatComponent.css";
// import IconButton from "@material-ui/core/IconButton";
// import Fab from "@material-ui/core/Fab";
// import HighlightOff from "@material-ui/icons/HighlightOff";
// import Send from "@material-ui/icons/Send";
// import { Tooltip } from "@material-ui/core";

const StyledChatContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const StyledChatComponent = styled.div`
  position: relative;
  background: linear-gradient(
    180deg,
    rgba(136, 136, 136, 1) 0%,
    rgba(180, 180, 180, 1) 35%,
    rgba(181, 181, 181, 1) 59%,
    rgba(136, 136, 136, 1) 100%
  );
  height: 100%;
  width: 100%;
  border-radius: 20px;
  box-shadow: 10px 10px 15px 6px rgba(0, 0, 0, 0.3);
  display: ${(props) => props.display};
`;

const StyeldChatToolbar = styled.div`
  position: sticky;
  margin: auto;
  width: 80%;
  top: 40px;
  line-height: 35px;
  height: 45px;
  background: transparent;
  box-sizing: border-box;
  font-weight: bold;
  font-size: 14px;
  text-align: center;
  padding-top: 4px;
  margin-bottom: 30px;
  border-radius: 20px;
  background-color: #bdcff2;
  color: black;
`;

const MessageWrapper = styled.div`
  padding: 0 15px 10px 15px;
  height: calc(100% - 110px);
  overflow: auto;
  box-sizing: border-box;
`;

const MessageInputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: auto;
  position: sticky;
  bottom: 40px;
  width: 80%;
  background-color: #ffffff;
  text-align: center;
  padding: 10px 20px;
  height: 30px;
  border-radius: 20px;
`;

const StyledChatInput = styled.input`
  border: none;
  height: 25px;
  width: 85%;
  outline: none;
`;

const StyeldSendButton = styled.button`
  cursor: pointer;
  border: none;
  background-color: transparent;
  position: absolute;
  right: 0px;
  top: 0;
  bottom: 0;
  width: 50px;
  height: 50px;
  color: cornflowerblue;
  font-size: 20px;
`;
export default class ChatComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageList: [],
      message: "",
    };
    this.chatScroll = React.createRef();

    this.handleChange = this.handleChange.bind(this);
    this.handlePressKey = this.handlePressKey.bind(this);
    this.close = this.close.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    this.props.user
      .getStreamManager()
      .stream.session.on("signal:chat", (event) => {
        const data = JSON.parse(event.data);
        let messageList = this.state.messageList;
        messageList.push({
          connectionId: event.from.connectionId,
          nickname: data.nickname,
          message: data.message,
        });
        const document = window.document;
        setTimeout(() => {
          const userImg = document.getElementById(
            "userImg-" + (this.state.messageList.length - 1)
          );
          const video = document.getElementById("video-" + data.streamId);
          const avatar = userImg.getContext("2d");
          avatar.drawImage(video, 200, 120, 285, 285, 0, 0, 60, 60);
          this.props.messageReceived();
        }, 50);
        this.setState({ messageList: messageList });
        this.scrollToBottom();
      });
  }

  handleChange(event) {
    this.setState({ message: event.target.value });
  }

  handlePressKey(event) {
    if (event.key === "Enter") {
      this.sendMessage();
    }
  }

  sendMessage() {
    console.log(this.state.message);
    if (this.props.user && this.state.message) {
      let message = this.state.message.replace(/ +(?= )/g, "");
      if (message !== "" && message !== " ") {
        const data = {
          message: message,
          nickname: this.props.user.getNickname(),
          streamId: this.props.user.getStreamManager().stream.streamId,
        };
        this.props.user.getStreamManager().stream.session.signal({
          data: JSON.stringify(data),
          type: "chat",
        });
      }
    }
    this.setState({ message: "" });
  }

  scrollToBottom() {
    setTimeout(() => {
      try {
        this.chatScroll.current.scrollTop =
          this.chatScroll.current.scrollHeight;
      } catch (err) {}
    }, 20);
  }

  close() {
    this.props.close(undefined);
  }

  render() {
    return (
      <StyledChatContainer>
        <StyledChatComponent display={this.props.chatDisplay}>
          <StyeldChatToolbar>
            <span>
              {/* {this.props.user.getStreamManager().stream.session.sessionId} - */}
              채팅
            </span>
          </StyeldChatToolbar>
          <MessageWrapper ref={this.chatScroll}>
            {this.state.messageList.map((data, i) => (
              <div
                key={i}
                id="remoteUsers"
                className={
                  "message" +
                  (data.connectionId !== this.props.user.getConnectionId()
                    ? " left"
                    : " right")
                }
              >
                <canvas
                  id={"userImg-" + i}
                  width="60"
                  height="60"
                  className="user-img"
                />
                <div className="msg-detail">
                  <div className="msg-info">
                    <p> {data.nickname}</p>
                  </div>
                  <div className="msg-content">
                    <span className="triangle" />
                    <p className="text">{data.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </MessageWrapper>

          <MessageInputWrapper>
            <StyledChatInput
              placeholder="상대방과 자유롭게 이야기해봐요"
              id="chatInput"
              value={this.state.message}
              onChange={this.handleChange}
              onKeyPress={this.handlePressKey}
            />
            <StyeldSendButton
              size="small"
              id="sendButton"
              onClick={this.sendMessage}
            >
              <i class="fas fa-seedling"></i>
            </StyeldSendButton>
            {/* <Tooltip title="Send message"></Tooltip> */}
          </MessageInputWrapper>
        </StyledChatComponent>
      </StyledChatContainer>
    );
  }
}
