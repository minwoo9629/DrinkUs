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
  top: 30px;
  right: 60px;
  position: absolute;
  z-index: 1000;
  color: #ffffff;
  font-size: 20px;
`;

const StatusWrapper = styled.div`
  display: flex;
  width: 40px;
  height: fit-content;
  position: absolute;
  color: #c71100;
  top: 30px;
  left: 60px;
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
      <>
        <div className="OT_widget-container">
          <div className="pointer nickname">
            <div
              onClick={() => {
                this.props.openModal(this.props.user.getNickname());
              }}
            >
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
              <StatusWrapper>
                {!this.props.user.isVideoActive() ? (
                  <div id="camIcon">
                    <FontAwesomeStyled className="fas fa-video-slash" />
                  </div>
                ) : null}

                {!this.props.user.isAudioActive() ? (
                  <div id="micIcon">
                    <FontAwesomeStyled className="fas fa-microphone-slash" />
                  </div>
                ) : null}
              </StatusWrapper>
              <div>
                {!this.props.user.isLocal() && (
                  <StyledAnotherUserMicState onClick={this.toggleSound}>
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
      </>
    );
  }
}
