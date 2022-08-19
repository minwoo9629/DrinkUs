import React, { Component, useEffect, useRef, useState } from "react";
import axios from "axios";
import "./VideoRoomComponent.css";
import { OpenVidu } from "openvidu-browser";
import StreamComponent from "./stream/StreamComponent";
import DialogExtensionComponent from "./dialog-extension/DialogExtension";
import ChatComponent from "./chat/ChatComponent";
import OpenViduLayout from "./layout/openvidu-layout";
import UserModel from "./models/user-model";
import ToolbarComponent from "./toolbar/ToolbarComponent";
import styled from "styled-components";
import { connect } from "react-redux";
import { clearRoomSession } from "../../../store/actions/room";
import { useNavigate } from "react-router-dom";
import { isCompositeComponent } from "react-dom/test-utils";
import RoomSetting from "./setting/RoomSetting";
import RoomGame from "./game/RoomGame";
import * as StompJs from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import Modal from "../../../components/modals/Modal";
import UserProfileContent from "../../../components/modals/contents/UserProfileContent";
import {
  gameResult,
  randomDrink,
  randomTopik,
  recommendToasts,
} from "../../../utils/sweetAlert";
import { getTargetUserId } from "../../../api/ProfileAPI";
import { getRoomInfo } from "../../../api/RoomAPI";

const Theme = {
  술집: "publichouse",
  펍: "pub",
  칵테일바: "cocktail",
  야구장: "baseball",
  축구장: "soccer",
  페스티벌: "festival",
  클럽: "club",
  편의점: "outside",
  한강공원: "river",
  미술관: "art",
  영화관: "movie",
  도서관: "library",
  집: "house",
};

const CountDown = {
  8: "#6aeb4d",
  7: "#b7eb49",
  6: "#eaed3e",
  5: "#e6cc3c",
  4: "#edac34",
  3: "#ed8734",
  2: "#e85920",
  1: "#ff2d19",
};

const ButtonContentComponentWrapper = styled.div`
  width: 330px;
  padding: 20px;
  background-color: #131317;
  display: ${(props) => props.display};
`;

const StyledLayoutBounds = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  flex-wrap: wrap;
  right: 0;
  height: 100%;
  min-width: 400px !important;
  width: 100%;
  overflow-y: hidden;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${(props) =>
    "/assets/RoomBackground/" + Theme[props.bgImg] + ".jpg"});
`;

// const StyeldBombAction = styled.div`
//   width: 100vw;
//   height: 100vh;
//   top: -50%;
//   left: -50%;
//   position: absolute;
//   animation: bombAnimation 0.2s infinite;
//   @keyframes bombAnimation {
//     0% {
//       background-color: #dcf2fb;
//     }
//     100% {
//       background-color: #ffead8;
//     }
//   }
// `;

var localUser = new UserModel();
let missionFailedUser = [];
let userCnt = 0;
// 게임 서버와 연결할 클라이언트
let ROOM_ID = 0;
// const ROOM_ID = Math.ceil(Math.random() * 5);
const gameClient = React.createRef({});
//
function withNavigation(Component) {
  return (props) => <Component navigate={useNavigate()} {...props} />;
}

const StyeldBombCount = styled.div`
  position: absolute;
  font-size: 30px;
  font-weight: bold;
  color: white;
  width: 350px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  text-align: center;
  padding: 5px 5px;
`;

const StyledBombSecond = styled.div`
  font-family: "Silkscreen";
  position: absolute;
  font-size: 150px;
  color: ${(props) => props.color || "yellow"};
  width: 350px;
  text-align: center;

  margin-top: 20px;
`;

const BombImg = styled.div`
  position: absolute;
  margin-top: 100px;
  margin-left: -100px;
`;

const BombGame = ({
  second,
  clickCount,
  toggleBombGame,
  display,
  onDecreaseCount,
}) => {
  const [secondState, setSecondState] = useState(parseInt(second));

  useEffect(() => {
    if (secondState < 0) {
      toggleBombGame("none");
    }
  }, [secondState]);

  useEffect(() => {
    const countDown = setInterval(() => {
      if (parseInt(secondState) >= 0) {
        setSecondState((prevState) => prevState - 1);
      }
      if (parseInt(secondState) === 0) {
        clearInterval(countDown);
        toggleBombGame("none");
      }
    }, 1000);
    return () => clearInterval(countDown);
  }, [secondState]);
  return (
    <div
      style={{
        position: "absolute",
        zIndex: 1000000,
        top: "20%",
        left: "50%",
        display: display,
      }}
    >
      <>
        <div
          onClick={secondState > 0 ? onDecreaseCount : ""}
          style={{ position: "relative" }}
        >
          <StyeldBombCount style={{ position: "absolute" }}>
            {clickCount <= 0 ? (
              <span style={{ fontSize: "40px", color: "#87e8ae" }}>성공!</span>
            ) : (
              <>
                폭탄을{" "}
                <span style={{ fontSize: "40px", color: "#f54e42" }}>
                  {clickCount}
                </span>{" "}
                번 클릭하세요!
              </>
            )}
          </StyeldBombCount>
          <StyledBombSecond color={CountDown[secondState]}>
            {secondState}
          </StyledBombSecond>
          {secondState <= 0 && clickCount > 0 ? (
            <BombImg>
              <img
                src="/assets/game/explosion.gif"
                width="550px"
                style={{ marginTop: "-300px" }}
              />
            </BombImg>
          ) : (
            <BombImg>
              <img src="/assets/game/bombGif.gif" width="550px" />
            </BombImg>
          )}
        </div>
      </>
    </div>
  );
};

class VideoRoomComponent extends Component {
  constructor(props) {
    super(props);
    ROOM_ID = this.props.sessionInfo.roomId;
    this.accessToken = sessionStorage.getItem("ACCESS_TOKEN");
    this.OPENVIDU_SERVER_URL = this.props.openviduServerUrl
      ? this.props.openviduServerUrl
      : "https://i7b306.p.ssafy.io:8443";
    this.OPENVIDU_SERVER_SECRET = this.props.openviduSecret
      ? this.props.openviduSecret
      : "DRINKUS";
    this.hasBeenUpdated = false;
    this.layout = new OpenViduLayout();
    let sessionName = this.props.sessionInfo
      ? this.props.sessionInfo.sessionName
      : "SessionA";
    let userName = this.props.user
      ? this.props.user.userNickname
      : "OpenVidu_User" + Math.floor(Math.random() * 100);
    this.remotes = [];
    this.localUserAccessAllowed = false;
    this.state = {
      mySessionId: sessionName,
      myUserName: userName,
      session: undefined,
      localUser: undefined,
      subscribers: [],
      chatDisplay: "none",
      gameDisplay: "none",
      bombGameDisplay: "none",
      settingDisplay: "none",
      currentVideoDevice: undefined,
      clickCount: 10,
      second: null,
      modalState: false,
      targetUserId: "",
      placeTheme: "",
    };

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    this.updateLayout = this.updateLayout.bind(this);
    this.camStatusChanged = this.camStatusChanged.bind(this);
    this.micStatusChanged = this.micStatusChanged.bind(this);
    this.nicknameChanged = this.nicknameChanged.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
    this.switchCamera = this.switchCamera.bind(this);
    this.screenShare = this.screenShare.bind(this);
    this.stopScreenShare = this.stopScreenShare.bind(this);
    this.closeDialogExtension = this.closeDialogExtension.bind(this);
    this.toggleChat = this.toggleChat.bind(this);
    this.checkNotification = this.checkNotification.bind(this);
    this.checkSize = this.checkSize.bind(this);
    this.toggleSetting = this.toggleSetting.bind(this);
    this.toggleGame = this.toggleGame.bind(this);
    this.toggleBombGame = this.toggleBombGame.bind(this);
    this.onDecreaseCount = this.onDecreaseCount.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.getRoomInfo = this.getRoomInfo.bind(this);
  }

  componentDidMount() {
    const openViduLayoutOptions = {
      maxRatio: 3 / 2, // The narrowest ratio that will be used (default 2x3)
      minRatio: 9 / 16, // The widest ratio that will be used (default 16x9)
      fixedRatio: false, // If this is true then the aspect ratio of the video is maintained and minRatio and maxRatio are ignored (default false)
      bigClass: "OV_big", // The class to add to elements that should be sized bigger
      bigPercentage: 0.8, // The maximum percentage of space the big ones should take up
      bigFixedRatio: false, // fixedRatio for the big ones
      bigMaxRatio: 3 / 2, // The narrowest ratio to use for the big elements (default 2x3)
      bigMinRatio: 9 / 16, // The widest ratio to use for the big elements (default 16x9)
      bigFirst: true, // Whether to place the big one in the top left (true) or bottom right
      animate: true, // Whether you want to animate the transitions
    };

    this.layout.initLayoutContainer(
      document.getElementById("layout"),
      openViduLayoutOptions,
    );
    window.addEventListener("beforeunload", this.onbeforeunload);
    window.addEventListener("resize", this.updateLayout);
    window.addEventListener("resize", this.checkSize);
    navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    this.joinSession();
    this.connectGameServer();

    this.getRoomInfo(this.props.sessionInfo.roomId);
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onbeforeunload);
    window.removeEventListener("resize", this.updateLayout);
    window.removeEventListener("resize", this.checkSize);
    this.leaveSession();
    this.disconnectGameServer();
  }

  onbeforeunload(event) {
    this.leaveSession();
    this.disconnectGameServer();
  }

  joinSession() {
    this.OV = new OpenVidu();

    this.setState(
      {
        session: this.OV.initSession(),
      },
      () => {
        this.subscribeToStreamCreated();
        this.connectToSession();
      },
    );
  }

  // Spring Boot Server와 Stomp 소켓 연동 시작
  connectGameServer() {
    // STOMP 서버에 연결
    gameClient.current = new StompJs.Client({
      brokerURL: "wss://i7b306.p.ssafy.io/ws-stomp/websocket",
      //   brokerURL: "ws://localhost:8080/ws-stomp/websocket",
      connectHeaders: {
        roomId: ROOM_ID,
        AccessToken: `Bearer ${this.accessToken}`,
      },
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        // 세션 접속
        this.subRecommendTopics();
        this.subRandomDrink();
        this.subRecommendToasts();
        this.subStartBombGame();
        this.subEndBombGame();
      },
    });

    gameClient.current.activate();
  }

  disconnectGameServer() {
    gameClient.current.deactivate();
  }

  pubRandomDrink() {
    gameClient.current.publish({
      destination: `/pub/random`,
      body: JSON.stringify({
        roomId: ROOM_ID,
      }),
    });
  }

  subRandomDrink() {
    gameClient.current.subscribe(
      `/sub/random/${ROOM_ID}`,
      ({ body }) => {
        randomDrink(body);
      },
      {
        AccessToken: `Bearer ${this.accessToken}`,
        roomId: ROOM_ID,
      },
    );
  }

  pubRecommendTopics() {
    gameClient.current.publish({
      destination: `/pub/topic`,
      body: JSON.stringify({
        roomId: ROOM_ID,
        categoryId: null, // 방의 카테고리ID (없으면 null)
      }),
    });
  }

  subRecommendTopics() {
    gameClient.current.subscribe(
      `/sub/topic/${ROOM_ID}`,
      ({ body }) => {
        randomTopik(body);
      },
      {
        AccessToken: `Bearer ${this.accessToken}`,
        roomId: ROOM_ID,
      },
    );
  }

  pubRecommendToasts() {
    gameClient.current.publish({
      destination: `/pub/toast`,
      body: JSON.stringify({
        roomId: ROOM_ID,
      }),
    });
  }

  subRecommendToasts() {
    gameClient.current.subscribe(
      `/sub/toast/${ROOM_ID}`,
      ({ body }) => {
        recommendToasts(body);
      },
      {
        AccessToken: `Bearer ${this.accessToken}`,
        roomId: ROOM_ID,
      },
    );
  }

  pubStartBombGame() {
    gameClient.current.publish({
      destination: `/pub/bomb/start`,
      body: JSON.stringify({
        roomId: ROOM_ID,
      }),
    });
  }

  subStartBombGame() {
    gameClient.current.subscribe(
      `/sub/bomb/start/${ROOM_ID}`,
      ({ body }) => {
        // 여기에 화면에 띄우는 로직 작성
        const obj = JSON.parse(body);
        this.setState(
          { second: obj.second, clickCount: obj.clickCount },
          () => {
            this.toggleBombGame("block");
          },
        );

        let second = obj.second;
        let leftClickCount = obj.clickCount;

        let interval = setInterval(() => {
          second--;

          if (second < 0) {
            this.pubEndBombGame();
            this.toggleBombGame("none");
            this.setState({ second: null });
            clearInterval(interval);
          }
        }, 1000);
      },
      {
        AccessToken: `Bearer ${this.accessToken}`,
        roomId: ROOM_ID,
      },
    );
  }

  pubEndBombGame() {
    gameClient.current.publish({
      destination: `/pub/bomb/result`,
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
      body: JSON.stringify({
        roomId: ROOM_ID,
        clickCount: this.state.clickCount,
      }),
    });
  }

  subEndBombGame() {
    gameClient.current.subscribe(
      `/sub/bomb/result/${ROOM_ID}`,
      ({ body }) => {
        // 여기에 화면에 띄우는 로직 작성
        const resultObj = JSON.parse(body);
        if (!resultObj.result) {
          missionFailedUser.push(resultObj.nickname);
        }
        userCnt++;
        if (userCnt === this.state.subscribers.length + 1) {
          let title = "";
          let subTitle = "";
          if (missionFailedUser.length === 0) {
            title = "모두 성공하셨습니다.";
            subTitle = "잠시 후 또 도전해 보세요";
          } else {
            title = missionFailedUser.join("\n");
            subTitle = "마시세요!!!!!!";
          }
          gameResult(title, subTitle);
          userCnt = 0;
          missionFailedUser = [];
        }
      },
      {
        AccessToken: `Bearer ${this.accessToken}`,
        roomId: ROOM_ID,
      },
    );
  }
  onDecreaseCount() {
    this.setState({
      clickCount: this.state.clickCount >= 1 ? this.state.clickCount - 1 : 0,
    });
  }

  // Spring Boot Server와 Stomp 소켓 연동 끝

  connectToSession() {
    if (this.props.token !== undefined) {
      this.connect(this.props.token);
    } else {
      this.getToken()
        .then((token) => {
          this.connect(token);
        })
        .catch((error) => {
          if (this.props.error) {
            this.props.error({
              error: error.error,
              messgae: error.message,
              code: error.code,
              status: error.status,
            });
          }
          alert("There was an error getting the token:", error.message);
        });
    }
  }

  connect(token) {
    this.state.session
      .connect(token, { clientData: this.state.myUserName })
      .then(() => {
        this.connectWebCam();
      })
      .catch((error) => {
        if (this.props.error) {
          this.props.error({
            error: error.error,
            messgae: error.message,
            code: error.code,
            status: error.status,
          });
        }
        alert("There was an error connecting to the session:", error.message);
        console.log(
          "There was an error connecting to the session:",
          error.code,
          error.message,
        );
      });
  }

  async connectWebCam() {
    var devices = await this.OV.getDevices();
    var videoDevices = devices.filter((device) => device.kind === "videoinput");

    let publisher = this.OV.initPublisher(undefined, {
      audioSource: undefined,
      videoSource: videoDevices[0].deviceId,
      publishAudio: localUser.isAudioActive(),
      publishVideo: localUser.isVideoActive(),
      resolution: "640x480",
      frameRate: 30,
      insertMode: "APPEND",
    });

    if (this.state.session.capabilities.publish) {
      publisher.on("accessAllowed", () => {
        this.state.session.publish(publisher).then(() => {
          this.updateSubscribers();
          this.localUserAccessAllowed = true;
          if (this.props.joinSession) {
            this.props.joinSession();
          }
        });
      });
    }
    localUser.setNickname(this.state.myUserName);
    localUser.setConnectionId(this.state.session.connection.connectionId);
    localUser.setScreenShareActive(false);
    localUser.setStreamManager(publisher);
    this.subscribeToUserChanged();
    this.subscribeToStreamDestroyed();
    this.sendSignalUserChanged({
      isScreenShareActive: localUser.isScreenShareActive(),
    });

    this.setState(
      { currentVideoDevice: videoDevices[0], localUser: localUser },
      () => {
        this.state.localUser.getStreamManager().on("streamPlaying", (e) => {
          this.updateLayout();
          publisher.videos[0].video.parentElement.classList.remove(
            "custom-class",
          );
        });
      },
    );
  }

  updateSubscribers() {
    var subscribers = this.remotes;
    this.setState(
      {
        subscribers: subscribers,
      },
      () => {
        if (this.state.localUser) {
          this.sendSignalUserChanged({
            isAudioActive: this.state.localUser.isAudioActive(),
            isVideoActive: this.state.localUser.isVideoActive(),
            nickname: this.state.localUser.getNickname(),
            isScreenShareActive: this.state.localUser.isScreenShareActive(),
          });
        }
        this.updateLayout();
      },
    );
  }

  leaveSession() {
    const mySession = this.state.session;

    if (mySession) {
      mySession.disconnect();
    }

    // Empty all properties...
    this.OV = null;
    this.setState({
      session: undefined,
      subscribers: [],
      mySessionId: "SessionA",
      myUserName: "OpenVidu_User" + Math.floor(Math.random() * 100),
      localUser: undefined,
    });
    if (this.props.leaveSession) {
      this.props.leaveSession();
    }
    this.props.navigate("/live", { replace: true });
  }
  camStatusChanged() {
    localUser.setVideoActive(!localUser.isVideoActive());
    localUser.getStreamManager().publishVideo(localUser.isVideoActive());
    this.sendSignalUserChanged({ isVideoActive: localUser.isVideoActive() });
    this.setState({ localUser: localUser });
  }

  micStatusChanged() {
    localUser.setAudioActive(!localUser.isAudioActive());
    localUser.getStreamManager().publishAudio(localUser.isAudioActive());
    this.sendSignalUserChanged({ isAudioActive: localUser.isAudioActive() });
    this.setState({ localUser: localUser });
  }

  nicknameChanged(nickname) {
    let localUser = this.state.localUser;
    localUser.setNickname(nickname);
    this.setState({ localUser: localUser });
    this.sendSignalUserChanged({
      nickname: this.state.localUser.getNickname(),
    });
  }

  deleteSubscriber(stream) {
    const remoteUsers = this.state.subscribers;
    const userStream = remoteUsers.filter(
      (user) => user.getStreamManager().stream === stream,
    )[0];
    let index = remoteUsers.indexOf(userStream, 0);
    if (index > -1) {
      remoteUsers.splice(index, 1);
      this.setState({
        subscribers: remoteUsers,
      });
    }
  }

  subscribeToStreamCreated() {
    this.state.session.on("streamCreated", (event) => {
      const subscriber = this.state.session.subscribe(event.stream, undefined);
      // var subscribers = this.state.subscribers;
      subscriber.on("streamPlaying", (e) => {
        this.checkSomeoneShareScreen();
        subscriber.videos[0].video.parentElement.classList.remove(
          "custom-class",
        );
      });
      const newUser = new UserModel();
      newUser.setStreamManager(subscriber);
      newUser.setConnectionId(event.stream.connection.connectionId);
      newUser.setType("remote");
      const nickname = event.stream.connection.data.split("%")[0];
      newUser.setNickname(JSON.parse(nickname).clientData);
      this.remotes.push(newUser);
      if (this.localUserAccessAllowed) {
        this.updateSubscribers();
      }
    });
  }

  subscribeToStreamDestroyed() {
    // On every Stream destroyed...
    this.state.session.on("streamDestroyed", (event) => {
      // Remove the stream from 'subscribers' array
      this.deleteSubscriber(event.stream);
      setTimeout(() => {
        this.checkSomeoneShareScreen();
      }, 20);
      event.preventDefault();
      this.updateLayout();
    });
  }

  subscribeToUserChanged() {
    this.state.session.on("signal:userChanged", (event) => {
      let remoteUsers = this.state.subscribers;
      remoteUsers.forEach((user) => {
        if (user.getConnectionId() === event.from.connectionId) {
          const data = JSON.parse(event.data);
          if (data.isAudioActive !== undefined) {
            user.setAudioActive(data.isAudioActive);
          }
          if (data.isVideoActive !== undefined) {
            user.setVideoActive(data.isVideoActive);
          }
          if (data.nickname !== undefined) {
            user.setNickname(data.nickname);
          }
          if (data.isScreenShareActive !== undefined) {
            user.setScreenShareActive(data.isScreenShareActive);
          }
        }
      });
      this.setState(
        {
          subscribers: remoteUsers,
        },
        () => this.checkSomeoneShareScreen(),
      );
    });
  }

  updateLayout() {
    setTimeout(() => {
      this.layout.updateLayout();
    }, 20);
  }

  sendSignalUserChanged(data) {
    const signalOptions = {
      data: JSON.stringify(data),
      type: "userChanged",
    };
    this.state.session.signal(signalOptions);
  }

  toggleFullscreen() {
    const document = window.document;
    const fs = document.getElementById("container");
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      if (fs.requestFullscreen) {
        fs.requestFullscreen();
      } else if (fs.msRequestFullscreen) {
        fs.msRequestFullscreen();
      } else if (fs.mozRequestFullScreen) {
        fs.mozRequestFullScreen();
      } else if (fs.webkitRequestFullscreen) {
        fs.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }

  async switchCamera() {
    try {
      const devices = await this.OV.getDevices();
      var videoDevices = devices.filter(
        (device) => device.kind === "videoinput",
      );

      if (videoDevices && videoDevices.length > 1) {
        var newVideoDevice = videoDevices.filter(
          (device) =>
            device.deviceId !== this.state.currentVideoDevice.deviceId,
        );

        if (newVideoDevice.length > 0) {
          // Creating a new publisher with specific videoSource
          // In mobile devices the default and first camera is the front one
          var newPublisher = this.OV.initPublisher(undefined, {
            audioSource: undefined,
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: localUser.isAudioActive(),
            publishVideo: localUser.isVideoActive(),
            mirror: true,
          });

          //newPublisher.once("accessAllowed", () => {
          await this.state.session.unpublish(
            this.state.localUser.getStreamManager(),
          );
          await this.state.session.publish(newPublisher);
          this.state.localUser.setStreamManager(newPublisher);
          this.setState({
            currentVideoDevice: newVideoDevice,
            localUser: localUser,
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  screenShare() {
    const videoSource =
      navigator.userAgent.indexOf("Firefox") !== -1 ? "window" : "screen";
    const publisher = this.OV.initPublisher(
      undefined,
      {
        videoSource: videoSource,
        publishAudio: localUser.isAudioActive(),
        publishVideo: localUser.isVideoActive(),
        mirror: false,
      },
      (error) => {
        if (error && error.name === "SCREEN_EXTENSION_NOT_INSTALLED") {
          this.setState({ showExtensionDialog: true });
        } else if (error && error.name === "SCREEN_SHARING_NOT_SUPPORTED") {
          alert("Your browser does not support screen sharing");
        } else if (error && error.name === "SCREEN_EXTENSION_DISABLED") {
          alert("You need to enable screen sharing extension");
        } else if (error && error.name === "SCREEN_CAPTURE_DENIED") {
          alert("You need to choose a window or application to share");
        }
      },
    );

    publisher.once("accessAllowed", () => {
      this.state.session.unpublish(localUser.getStreamManager());
      localUser.setStreamManager(publisher);
      this.state.session.publish(localUser.getStreamManager()).then(() => {
        localUser.setScreenShareActive(true);
        this.setState({ localUser: localUser }, () => {
          this.sendSignalUserChanged({
            isScreenShareActive: localUser.isScreenShareActive(),
          });
        });
      });
    });
    publisher.on("streamPlaying", () => {
      this.updateLayout();
      publisher.videos[0].video.parentElement.classList.remove("custom-class");
    });
  }

  closeDialogExtension() {
    this.setState({ showExtensionDialog: false });
  }

  stopScreenShare() {
    this.state.session.unpublish(localUser.getStreamManager());
    this.connectWebCam();
  }

  checkSomeoneShareScreen() {
    let isScreenShared;
    // return true if at least one passes the test
    isScreenShared =
      this.state.subscribers.some((user) => user.isScreenShareActive()) ||
      localUser.isScreenShareActive();
    const openviduLayoutOptions = {
      maxRatio: 3 / 2,
      minRatio: 9 / 16,
      fixedRatio: isScreenShared,
      bigClass: "OV_big",
      bigPercentage: 0.8,
      bigFixedRatio: false,
      bigMaxRatio: 3 / 2,
      bigMinRatio: 9 / 16,
      bigFirst: true,
      animate: true,
    };
    this.layout.setLayoutOptions(openviduLayoutOptions);
    this.updateLayout();
  }

  toggleChat(property) {
    let display = property;

    if (display === undefined) {
      display = this.state.chatDisplay === "none" ? "block" : "none";
    }
    if (display === "block") {
      this.setState({
        chatDisplay: display,
        messageReceived: false,
        settingDisplay: "none",
        gameDisplay: "none",
      });
    } else {
      console.log("chat", display);
      this.setState({ chatDisplay: display });
    }
    this.updateLayout();
  }

  toggleSetting(property) {
    let display = property;
    if (display === undefined) {
      display = this.state.settingDisplay === "none" ? "block" : "none";
    }
    if (display === "block") {
      this.setState({
        settingDisplay: display,
        chatDisplay: "none",
        gameDisplay: "none",
      });
    } else {
      this.setState({ settingDisplay: display });
    }
    this.updateLayout();
  }

  toggleGame(property) {
    let display = property;
    if (display === undefined) {
      display = this.state.gameDisplay === "none" ? "block" : "none";
    }
    if (display === "block") {
      this.setState({
        gameDisplay: display,
        settingDisplay: "none",
        chatDisplay: "none",
      });
    } else {
      this.setState({ gameDisplay: display });
    }
    this.updateLayout();
  }

  toggleBombGame(property) {
    let display = property;
    if (display === undefined) {
      display = this.bombGameDisplay === "none" ? "block" : "none";
    }
    if (display === "block") {
      this.setState({
        bombGameDisplay: display,
      });
    } else {
      this.setState({ bombGameDisplay: display });
    }
    this.updateLayout();
  }

  checkNotification(event) {
    this.setState({
      messageReceived: this.state.chatDisplay === "none",
    });
  }
  checkSize() {
    if (
      document.getElementById("layout").offsetWidth <= 700 &&
      !this.hasBeenUpdated
    ) {
      this.toggleChat("none");
      this.hasBeenUpdated = true;
    }
    if (
      document.getElementById("layout").offsetWidth > 700 &&
      this.hasBeenUpdated
    ) {
      this.hasBeenUpdated = false;
    }
  }
  async openModal(userNickname) {
    const data = {
      userNickname,
    };
    const result = await getTargetUserId(data);
    this.setState({ targetUserId: result.data });
    this.setState({ modalState: true });
  }

  closeModal() {
    this.setState({ modalState: false });
  }

  async getRoomInfo(roomId) {
    const result = await getRoomInfo(this.props.sessionInfo.roomId);
    this.setState({ placeTheme: result.placeTheme });
  }

  render() {
    const mySessionId = this.state.mySessionId;
    const localUser = this.state.localUser;
    return (
      <>
        {this.state.targetUserId !== "" ? (
          <>
            <Modal
              modalContent={
                <UserProfileContent
                  userId={this.state.targetUserId}
                  close={this.closeModal}
                />
              }
              isOpen={this.state.modalState}
            />
          </>
        ) : (
          <></>
        )}
        {this.state.second !== null ? (
          <>
            <BombGame
              onDecreaseCount={this.onDecreaseCount}
              clickCount={this.state.clickCount}
              second={this.state.second}
              toggleBombGame={this.toggleBombGame}
              display={this.state.bombGameDisplay}
            />
          </>
        ) : (
          <></>
        )}

        <div
          style={{ height: "100vh", width: "100vw", display: "flex" }}
          className="container"
          id="container"
        >
          <ToolbarComponent
            sessionId={mySessionId}
            user={localUser}
            showNotification={this.state.messageReceived}
            camStatusChanged={this.camStatusChanged}
            micStatusChanged={this.micStatusChanged}
            screenShare={this.screenShare}
            stopScreenShare={this.stopScreenShare}
            toggleFullscreen={this.toggleFullscreen}
            switchCamera={this.switchCamera}
            leaveSession={this.leaveSession}
            toggleChat={this.toggleChat}
            toggleSetting={this.toggleSetting}
            toggleGame={this.toggleGame}
          />
          <ButtonContentComponentWrapper
            display={
              this.state.chatDisplay !== "none" ||
              this.state.gameDisplay !== "none" ||
              this.state.settingDisplay != "none"
                ? "flex"
                : "none"
            }
          >
            {localUser !== undefined &&
              localUser.getStreamManager() !== undefined && (
                <ChatComponent
                  user={localUser}
                  chatDisplay={this.state.chatDisplay}
                  close={this.toggleChat}
                  userImg={this.props.user.userImg}
                  messageReceived={this.checkNotification}
                />
              )}
            {localUser !== undefined &&
              localUser.getStreamManager() !== undefined && (
                <RoomSetting
                  settingDisplay={this.state.settingDisplay}
                  close={this.toggleSetting}
                />
              )}
            {localUser !== undefined &&
              localUser.getStreamManager() !== undefined && (
                <RoomGame
                  gameDisplay={this.state.gameDisplay}
                  close={this.toggleGame}
                  bombGame={this.pubStartBombGame}
                  recommendTopics={this.pubRecommendTopics}
                  randomDrink={this.pubRandomDrink}
                  recommendToasts={this.pubRecommendToasts}
                />
              )}
          </ButtonContentComponentWrapper>
          <DialogExtensionComponent
            showDialog={this.state.showExtensionDialog}
            cancelClicked={this.closeDialogExtension}
          />
          <StyledLayoutBounds id="layout" bgImg={this.state.placeTheme}>
            {localUser !== undefined &&
              localUser.getStreamManager() !== undefined && (
                <div
                  className="OT_root OT_publisher custom-class"
                  id="localUser"
                >
                  <StreamComponent
                    user={localUser}
                    handleNickname={this.nicknameChanged}
                  />
                </div>
              )}
            {this.state.subscribers.map((sub, i) => (
              <>
                <div
                  key={i}
                  className="OT_root OT_publisher custom-class"
                  id="remoteUsers"
                >
                  <StreamComponent
                    user={sub}
                    openModal={this.openModal}
                    streamId={sub.streamManager.stream.streamId}
                  />
                </div>
              </>
            ))}
          </StyledLayoutBounds>
        </div>
      </>
    );
  }

  /**
   * --------------------------
   * SERVER-SIDE RESPONSIBILITY
   * --------------------------
   * These methods retrieve the mandatory user token from OpenVidu Server.
   * This behaviour MUST BE IN YOUR SERVER-SIDE IN PRODUCTION (by using
   * the API REST, openvidu-java-client or openvidu-node-client):
   *   1) Initialize a session in OpenVidu Server	(POST /api/sessions)
   *   2) Generate a token in OpenVidu Server		(POST /api/tokens)
   *   3) The token must be consumed in Session.connect() method
   */

  getToken() {
    return this.createSession(this.state.mySessionId).then((sessionId) =>
      this.createToken(sessionId),
    );
  }

  createSession(sessionId) {
    return new Promise((resolve, reject) => {
      var data = JSON.stringify({ customSessionId: sessionId });
      axios
        .post(this.OPENVIDU_SERVER_URL + "/openvidu/api/sessions", data, {
          headers: {
            Authorization:
              "Basic " + btoa("OPENVIDUAPP:" + this.OPENVIDU_SERVER_SECRET),
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          resolve(response.data.id);
        })
        .catch((response) => {
          var error = Object.assign({}, response);
          if (error.response && error.response.status === 409) {
            resolve(sessionId);
          } else {
            console.log(error);
            console.warn(
              "No connection to OpenVidu Server. This may be a certificate error at " +
                this.OPENVIDU_SERVER_URL,
            );
            if (
              window.confirm(
                'No connection to OpenVidu Server. This may be a certificate error at "' +
                  this.OPENVIDU_SERVER_URL +
                  '"\n\nClick OK to navigate and accept it. ' +
                  'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                  this.OPENVIDU_SERVER_URL +
                  '"',
              )
            ) {
              window.location.assign(
                this.OPENVIDU_SERVER_URL + "/accept-certificate",
              );
            }
          }
        });
    });
  }

  createToken(sessionId) {
    return new Promise((resolve, reject) => {
      var data = JSON.stringify({});
      axios
        .post(
          this.OPENVIDU_SERVER_URL +
            "/openvidu/api/sessions/" +
            sessionId +
            "/connection",
          data,
          {
            headers: {
              Authorization:
                "Basic " + btoa("OPENVIDUAPP:" + this.OPENVIDU_SERVER_SECRET),
              "Content-Type": "application/json",
            },
          },
        )
        .then((response) => {
          resolve(response.data.token);
        })
        .catch((error) => reject(error));
    });
  }
}

const mapStateToProps = (state) => ({
  user: state.user.data,
  sessionInfo: state.room,
});

export default connect(mapStateToProps)(withNavigation(VideoRoomComponent));
// export default VideoRoomComponent;
