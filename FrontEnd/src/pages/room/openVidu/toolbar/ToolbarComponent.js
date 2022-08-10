import React, { Component } from "react";
import "./ToolbarComponent.css";

// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";

// import Mic from "@material-ui/icons/Mic";
// import MicOff from "@material-ui/icons/MicOff";
// import Videocam from "@material-ui/icons/Videocam";
// import VideocamOff from "@material-ui/icons/VideocamOff";
// import Fullscreen from "@material-ui/icons/Fullscreen";
// import FullscreenExit from "@material-ui/icons/FullscreenExit";
// import SwitchVideoIcon from "@material-ui/icons/SwitchVideo";
// import PictureInPicture from "@material-ui/icons/PictureInPicture";
// import ScreenShare from "@material-ui/icons/ScreenShare";
// import StopScreenShare from "@material-ui/icons/StopScreenShare";
// import Tooltip from "@material-ui/core/Tooltip";
// import PowerSettingsNew from "@material-ui/icons/PowerSettingsNew";
// import QuestionAnswer from "@material-ui/icons/QuestionAnswer";

// import IconButton from "@material-ui/core/IconButton";

// const logo = require("/assets/images/logo129.png");

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

  render() {
    const mySessionId = this.props.sessionId;
    const localUser = this.props.user;
    return (
      <div className="toolbar" id="header">
        <div className="toolbar">
          {/* <div id="navSessionInfo">
            <img id="header_img" alt="OpenVidu Logo" src={logo} />

            {this.props.sessionId && (
              <div id="titleContent">
                <span id="session-title">{mySessionId}</span>
              </div>
            )}
          </div> */}

          <div className="buttonsContent">
            <button
              color="inherit"
              className="navButton"
              id="navMicButton"
              onClick={this.micStatusChanged}
            >
              {localUser !== undefined && localUser.isAudioActive() ? (
                // <Mic />
                <p>마이크켜기</p>
              ) : (
                <p>마이크끄기</p>
                // <MicOff color="IconButtonsecondary" />
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
                {/* <StopScreenShare color="secondary" /> */}
              </button>
            )}

            <button
              color="inherit"
              className="navButton"
              onClick={this.switchCamera}
            >
              <p>SwitchVideoIcon</p>
              {/* <SwitchVideoIcon /> */}
            </button>
            <button
              color="inherit"
              className="navButton"
              onClick={this.toggleFullscreen}
            >
              {localUser !== undefined && this.state.fullscreen ? (
                <p>FullscreenExit</p>
              ) : (
                // <FullscreenExit />
                <p>Fullscreen</p>
                // <Fullscreen />
              )}
            </button>
            <button
              color="secondary"
              className="navButton"
              onClick={this.leaveSession}
              id="navLeaveButton"
            >
              <p>PowerSettingsNew</p>
              {/* <PowerSettingsNew /> */}
            </button>
            <button
              color="inherit"
              onClick={this.toggleChat}
              id="navChatButton"
            >
              {this.props.showNotification && <div id="point" className="" />}
              {/* <Tooltip title="Chat"> */}
              <p>QuestionAnswer</p>
              {/* <QuestionAnswer /> */}
              {/* </Tooltip> */}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
