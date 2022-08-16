import React, { Component } from "react";

import styled from "styled-components";
import { randomDrink } from "../../../../utils/sweetAlert";

const ToolBar = styled.div`
  width: 20%;
  max-width: 150px;
  min-width: 150px;
  color: #ffffff;
  height: 100%;
  background-color: #333333;
  /* position: absolute;
  top: 0;
  left: 0;
  z-index: 999999; */
`;

const ToolbarMenuWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
const RoomContentWrapper = styled.div`
  height: 40%;
  min-height: 530px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 200px;
`;
export const RoomContentButtonWrapper = styled.div`
  width: 60px;
  height: 60px;
`;

const RoomContentButton = styled.button`
  border: none;
  width: 100%;
  height: 100%;
  border-radius: 15px;
  background-color: #676775;
  position: ${(props) => props.position};
  cursor: pointer;
  &.active {
    background-color: #97c5ff;
  }
  &:hover {
    background-color: #97c5ff;
  }
`;

RoomContentButton.default = {
  position: "static",
};

const ChatAlertPoint = styled.div`
  width: 15px;
  height: 15px;
  position: absolute;
  top: -5px;
  right: -5px;
  border-radius: 50%;
  background-color: #ffa600;
  border: 1px solid #000;
  z-index: 99999;
`;

const FontAwesomeStyled = styled.i`
  font-size: ${({ fontSize }) => fontSize};
  font-weight: 900;
  font-family: "Font Awesome 5 Free";
`;

FontAwesomeStyled.defaultProps = {
  fontSize: "32px",
};
const MicVideoIconWrapper = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #bdcff2;
`;

export default class ToolbarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { fullscreen: false };
    this.camStatusChanged = this.camStatusChanged.bind(this);
    this.micStatusChanged = this.micStatusChanged.bind(this);
    this.screenShare = this.screenShare.bind(this);
    this.stopScreenShare = this.stopScreenShare.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
    this.switchCamera = this.switchCamera.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.toggleChat = this.toggleChat.bind(this);
    this.toggleGame = this.toggleGame.bind(this);
    this.toggleSetting = this.toggleSetting.bind(this);
  }

  recommendToasts() {
    this.props.recommendToasts();
  }

  recommendTopics() {
    this.props.recommendTopics();
  }

  randomDrink() {
    this.props.randomDrink();
    this.toggleSetting = this.toggleSetting.bind(this);
    this.toggleGame = this.toggleGame.bind(this);
  }

  micStatusChanged() {
    this.props.micStatusChanged();
  }

  camStatusChanged() {
    this.props.camStatusChanged();
  }

  screenShare() {
    this.props.screenShare();
  }

  stopScreenShare() {
    this.props.stopScreenShare();
  }

  toggleFullscreen() {
    this.setState({ fullscreen: !this.state.fullscreen });
    this.props.toggleFullscreen();
  }

  switchCamera() {
    this.props.switchCamera();
  }

  leaveSession() {
    this.props.leaveSession();
  }

  toggleChat() {
    this.props.toggleChat();
  }
  toggleSetting() {
    this.props.toggleSetting();
  }

  toggleGame() {
    this.props.toggleGame();
  }

  render() {
    const mySessionId = this.props.sessionId;
    const localUser = this.props.user;
    return (
      <ToolBar>
        <ToolbarMenuWrapper>
          {/* <div id="navSessionInfo">
            <img id="header_img" alt="OpenVidu Logo" src={logo} />

            {this.props.sessionId && (
              <div id="titleContent">
                <span id="session-title">{mySessionId}</span>
              </div>
            )}
          </div> */}
          <RoomContentWrapper>
            <RoomContentButtonWrapper>
              <RoomContentButton onClick={this.toggleSetting}>
                <FontAwesomeStyled className="fas fa-cog" />
              </RoomContentButton>
            </RoomContentButtonWrapper>
            <RoomContentButtonWrapper>
              <RoomContentButton onClick={this.toggleGame}>
                <FontAwesomeStyled className="fas fa-gamepad" />
              </RoomContentButton>
            </RoomContentButtonWrapper>
            <RoomContentButtonWrapper>
              <RoomContentButton
                onClick={this.toggleChat}
                position={"relative"}
              >
                <FontAwesomeStyled className="fas fa-comment-dots" />
                {this.props.showNotification && <ChatAlertPoint />}
              </RoomContentButton>
            </RoomContentButtonWrapper>
            <RoomContentButtonWrapper>
              <RoomContentButton onClick={this.leaveSession}>
                <FontAwesomeStyled className="fas fa-sign-out-alt" />
              </RoomContentButton>
            </RoomContentButtonWrapper>
            <RoomContentButtonWrapper>
              <RoomContentButton onClick={this.micStatusChanged}>
                {localUser !== undefined && localUser.isAudioActive() ? (
                  <FontAwesomeStyled className="fas fa-microphone" />
                ) : (
                  <FontAwesomeStyled className="fas fa-microphone-slash" />
                )}
              </RoomContentButton>
            </RoomContentButtonWrapper>
            <RoomContentButtonWrapper>
              <RoomContentButton onClick={this.camStatusChanged}>
                {localUser !== undefined && localUser.isVideoActive() ? (
                  <FontAwesomeStyled className="fas fa-video" />
                ) : (
                  <FontAwesomeStyled className="fas fa-video-slash" />
                )}
              </RoomContentButton>
            </RoomContentButtonWrapper>
            <RoomContentButtonWrapper>
              {localUser !== undefined && localUser.isScreenShareActive() ? (
                <RoomContentButton
                  onClick={this.stopScreenShare}
                  className="active"
                >
                  <FontAwesomeStyled className="fas fa-desktop active" />
                </RoomContentButton>
              ) : (
                <RoomContentButton onClick={this.screenShare}>
                  <FontAwesomeStyled className="fas fa-desktop" />
                </RoomContentButton>
              )}
            </RoomContentButtonWrapper>
          </RoomContentWrapper>
          {/* {localUser !== undefined && localUser.isScreenShareActive() && (
            <button onClick={this.stopScreenShare} id="navScreenButton">
              <p>StopScreenShare</p>
            </button>
          )} */}
          {/* <div className="buttonsContent">
            <button
              color="inherit"
              className="navButton"
              id="navMicButton"
              onClick={this.micStatusChanged}
            >
              {localUser !== undefined && localUser.isAudioActive() ? (
                <Mic />
                <p>마이크켜기</p>
              ) : (
                <p>마이크끄기</p>
                <MicOff color="IconButtonsecondary" />
              )}
            </button>

            <button
              color="inherit"
              className="navButton"
              id="navCamButton"
              onClick={this.camStatusChanged}
            >
              {localUser !== undefined && localUser.isVideoActive() ? (
                <p>캠켜기</p>
              ) : (
                <p>캠끄기</p>
              )}
            </button>

            <button
              color="inherit"
              className="navButton"
              onClick={this.screenShare}
            >
              {localUser !== undefined && localUser.isScreenShareActive() ? (
                <p>PictureInPicture</p>
              ) : (
                <p>ScreenShare</p>
              )}
            </button>

            {localUser !== undefined && localUser.isScreenShareActive() && (
              <button onClick={this.stopScreenShare} id="navScreenButton">
                <p>StopScreenShare</p>
                <StopScreenShare color="secondary" />
              </button>
            )}

            <button
              color="inherit"
              className="navButton"
              onClick={this.switchCamera}
            >
              <p>SwitchVideoIcon</p>
              <SwitchVideoIcon />
            </button>
            <button
              color="inherit"
              className="navButton"
              onClick={this.toggleFullscreen}
            >
              {localUser !== undefined && this.state.fullscreen ? (
                <p>FullscreenExit</p>
              ) : (
                <FullscreenExit />
                <p>Fullscreen</p>
                <Fullscreen />
              )}
            </button>
            <button
              color="secondary"
              className="navButton"
              onClick={this.leaveSession}
              id="navLeaveButton"
            >
              <p>PowerSettingsNew</p>
              <PowerSettingsNew />
            </button>
            <button
              color="inherit"
              onClick={this.toggleChat}
              id="navChatButton"
            >
              {this.props.showNotification && <div id="point" className="" />}
              <Tooltip title="Chat">
              <p>QuestionAnswer</p>
              <QuestionAnswer />
              </Tooltip>
            </button>
          </div> */}
        </ToolbarMenuWrapper>
      </ToolBar>
    );
  }
}
