import React, { Component } from "react";
import "./StreamComponent.css";
import OvVideoComponent from "./OvVideo";
import styled from "styled-components";
// import { RoomContentButtonWrapper } from "../toolbar/ToolbarComponent";

const FontAwesomeStyled = styled.i`
  font-size: ${({ fontSize }) => fontSize};
  font-weight: 900;
  z-index: 10000;
  font-family: "Font Awesome 5 Free";
`;

const StyledAnotherUserMicState = styled.div`
  cursor: pointer;
  background-color: #000000c4;
  position: absolute;
  bottom: 161px;
  right: 100px;
  z-index: 1000;
  color: #ffffff;
  font-size: 20px;
  color: red;
`;

export default class StreamComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: this.props.user.getNickname(),
      showForm: false,
      mutedSound: false,
      isFormValid: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlePressKey = this.handlePressKey.bind(this);
    this.toggleNicknameForm = this.toggleNicknameForm.bind(this);
    this.toggleSound = this.toggleSound.bind(this);
  }

  handleChange(event) {
    this.setState({ nickname: event.target.value });
    event.preventDefault();
  }

  toggleNicknameForm() {
    if (this.props.user.isLocal()) {
      this.setState({ showForm: !this.state.showForm });
    }
  }

  toggleSound() {
    this.setState({ mutedSound: !this.state.mutedSound });
  }

  handlePressKey(event) {
    if (event.key === "Enter") {
      console.log(this.state.nickname);
      if (this.state.nickname.length >= 3 && this.state.nickname.length <= 20) {
        this.props.handleNickname(this.state.nickname);
        this.toggleNicknameForm();
        this.setState({ isFormValid: true });
      } else {
        this.setState({ isFormValid: false });
      }
    }
  }

  render() {
    return (
      <div className="OT_widget-container">
        <div className="pointer nickname">
          <div>
            <span id="nickname">{this.props.user.getNickname()}</span>
          </div>
        </div>

        {this.props.user !== undefined &&
        this.props.user.getStreamManager() !== undefined ? (
          <div className="streamComponent">
            <OvVideoComponent
              className="example"
              user={this.props.user}
              mutedSound={this.state.mutedSound}
            />

            <div id="statusIcons">
              {!this.props.user.isVideoActive() ? (
                <div id="camIcon">
                  {/* <VideocamOff id="statusCam" /> */}
                  <p style={{ color: "white" }}>롸?</p>
                </div>
              ) : null}

              {!this.props.user.isAudioActive() ? (
                <div id="micIcon">
                  <p style={{ color: "white" }}>
                    롸? 캠화면에서 마이크껐을때 보이는곳
                  </p>
                  {/* <MicOff id="statusMic" /> */}
                </div>
              ) : null}
            </div>
            <div>
              {!this.props.user.isLocal() && (
                <StyledAnotherUserMicState
                  id="volumeButton"
                  onClick={this.toggleSound}
                >
                  {this.state.mutedSound ? (
                    <FontAwesomeStyled className="fas fa-microphone-slash" />
                  ) : (
                    <FontAwesomeStyled className="fas fa-microphone" />
                  )}
                </StyledAnotherUserMicState>
              )}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
