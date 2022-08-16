import { Wrapper } from "../../components/styled/Wrapper";
import { client } from "../../utils/client";
import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setRoomSession } from "../../store/actions/room";
import { BackButton } from "../../components/common/buttons/BackButton";
import { TimeGap } from "../../utils/TimeGap";
import { FailAlert } from "../../utils/sweetAlert";
import { GetPopularlityPercent } from "../../utils/GetPopularlityPercent";
import Modal from "../../components/modals/Modal";
import UserProfileContent from "../../components/modals/contents/UserProfileContent";

const RoomDetailWrapper = styled.div`
  position: relative;
  width: 800px;
  height: 630px;
  margin-bottom: 20px;
  color: white;
  background-color: #8ea4bf;
  border-radius: 10px;
  box-shadow: inset 0px 0px 20px 1px rgba(62, 71, 82, 0.5);
  border: 2px solid rgba(62, 71, 82, 0.8);
  padding-top: 25px;
`;

const ImageWrapper = styled.img`
  display: flex;
  background-color: gray;
  width: 640px;
  height: 400px;
  border-radius: 20px;

  margin-top: 10px;
  margin-left: 80px;

  box-shadow: 1px 1px 20px 1px rgba(0, 0, 0, 0.35);
`;

const Button = styled.button`
  width: 100px;
  height: 40px;
  margin: 0 5px;
  border-radius: 10px;
  background-color: ${(props) => props.background};
  color: ${(props) => props.color};
  font-size: 16px;
  font-weight: bold;
  border: none;
  box-shadow: 2px 2px 5px 0.1px rgba(0, 0, 0, 0.3);

  cursor: pointer;
`;

// 프로필 스타일
const ProfileBlock = styled.div`
  align-items: center;
  margin-left: 60px;
  margin-top: 20px;
`;

const ProfileImageWrapper = styled.div`
  display: inline-block;
  float: left;
  width: 60px;
  height: 60px;
  margin: 0px 20px 0px 20px;
`;

const ProfileImageThumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 100%;
  border: 3px solid white;
`;

const Nickname = styled.div`
  padding-top: 5px;
  margin-bottom: 4px;
  font-size: 18px;
  font-weight: bold;
`;

const ButtonNicknameWrapper = styled.div`
  position: absolute;
  right: 90px;
  justify-content: space-between;
  margin-top: -5px;
`;

const Popularity = styled.div`
  display: flex;
  width: 100px;
  line-height: 30px;
  color: #fff;
  font-size: 14px;
`;

// 비밀번호
const PwInput = styled.input`
  padding-left: 10px;
  display: bolck;
  width: 140px;
  height: 35px;
  border-radius: 3px;
  border: 1px solid #bdcff2;
  outline: none;
  color: #2d2d2d;

  &::placeholder {
    font-size: 13px;
    color: #b1b1b1;
  }
`;

const RoomInfoWrapper = styled.div`
  display: ${(props) => props.display || "inline"};
  position: ${(props) => props.position};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin-top: ${(props) => props.marginTop};
  margin-bottom: ${(props) => props.marginBottom};
  margin-left: ${(props) => props.marginLeft};
  margin-right: ${(props) => props.marginRight};
  color: ${(props) => props.color};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  font-family: ${(props) => props.fontFamily};
  padding-top: ${(props) => props.paddingTop};
  padding-bottom: ${(props) => props.paddingBottom};
  padding-left: ${(props) => props.paddingLeft};
  padding-right: ${(props) => props.paddingRight};

  left: ${(props) => props.left};
  right: ${(props) => props.right};
  top: ${(props) => props.top};
  bottom: ${(props) => props.bottom};

  float: ${(props) => props.float};
`;

const RoomDetail = () => {
  // Room 입장을 위한 세션설정
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();

  // 방 정보 api 요청
  const onRoomDetail = async () => {
    const result = await client
      .get(`${location.pathname}`)
      .then((response) => response);
    setCreatedUser(result.data.user);
    return result;
  };

  // 방 정보 state
  const [data, setData] = useState([]);

  // 현재 인원 수 체크
  const [curParticipant, setCurParticipant] = useState();

  const dataRefineFunc = async () => {
    const result = await onRoomDetail();
    setData(result.data);
    setAgeState(result.data.ages);

    await client
      .get(`/games/participants/${result.data.roomId}`)
      .then(function (response) {
        setCurParticipant(parseInt(response.data));
      })
      .catch(function (error) {
        FailAlert(error);
        navigate("/rooms");
      });

    return data;
  };

  useEffect(() => {
    dataRefineFunc();
  }, []);

  // user 정보 state
  const [createdUser, setCreatedUser] = useState([]);

  // 방 입장 세션 정보
  const onHandleEnterRoom = () => {
    const participants = client
      .get(`/games/participants/${data.roomId}`)
      .then(function (response) {
        if (response.data >= data.peopleLimit) {
          FailAlert("방 인원 제한을 초과했습니다!");
          navigate("/rooms");
        }
      })
      .catch(function (error) {
        FailAlert(error.response.data.message);
        navigate("/rooms");
      });

    const sessionData = {
      sessionName: `Session${data.roomId}`,
      roomId: data.roomId,
    };
    dispatch(setRoomSession(sessionData));
    navigate("/room/detail");
  };

  // const roomName = data.roomName // 객체로 넘어오는 값들이 있어서 {JSON.stringify(data.roomName)} 대신에 할당해서 씁니다 (Objects are not valid as a React child error)

  const [ageState, setAgeState] = useState([]);

  const timeGap = TimeGap(data.createdDate);

  // 나이대 값 ~대 로 변경
  const rendering = () => {
    const result = [];
    for (let i = 0; i < 6; i++) {
      if (ageState[i] === "Y") {
        result.push(
          <RoomInfoWrapper marginRight="7px" key={i}>
            {i + 2 + "0" + "대" + "  "}
          </RoomInfoWrapper>,
        );
      }
    }
    return result;
  };

  // 비밀번호 체크
  const [inputPw, setInputPw] = useState({
    roomPw: "",
  });

  const onPwInput = (e) => {
    setInputPw({ ...inputPw, [e.target.name]: e.target.value });
  };

  const onRoomPw = async () => {
    const result = await client
      .post("/rooms/pwcheck", {
        roomId: data.roomId,
        roomPw: inputPw.roomPw,
      })
      .then(function (response) {
        onHandleEnterRoom();
      })
      .catch(function (error) {
        FailAlert("비밀번호가 틀렸습니다!");
      });
  };

  // 인기도 아이콘으로 변환
  const popularlityPercent = GetPopularlityPercent(createdUser.userPopularity);

  // 프로필 모달
  const [modalState, setModalState] = useState(false);

  const openModal = () => {
    setModalState(true);
  };

  const closeModal = () => {
    setModalState(false);
  };

  return (
    <>
      {createdUser.userId !== undefined ? (
        <>
          <Modal
            width={"800px"}
            height={"600px"}
            isOpen={modalState}
            closeModal={closeModal}
            modalContent={
              <UserProfileContent
                userId={createdUser.userId}
                close={closeModal}
              />
            }
          />
        </>
      ) : (
        <></>
      )}
      <BackButton />
      <Wrapper color={"#0a0a0a"}>
        <RoomDetailWrapper>
          <RoomInfoWrapper
            fontSize="40px"
            fontWeight="bolder"
            marginLeft="100px"
            color="#2e2e2e"
            fontFamily="Do Hyeon"
          >
            {data.roomName}
          </RoomInfoWrapper>
          <RoomInfoWrapper marginLeft="15px">
            {data.categoryName}
          </RoomInfoWrapper>
          <RoomInfoWrapper
            position="absolute"
            right="90px"
            top="45px"
            fontWeight="bold"
            fontSize="15px"
          >
            {timeGap}
          </RoomInfoWrapper>
          {data.placeTheme === "술집" ? (
            <ImageWrapper
              src={
                process.env.PUBLIC_URL +
                "/assets/RoomBackground/publichouse.jpg"
              }
              onClick={() => navigate(`/rooms/${roomId}`)}
            />
          ) : data.placeTheme === "펍" ? (
            <ImageWrapper
              src={process.env.PUBLIC_URL + "/assets/RoomBackground/pub.jpg"}
              onClick={() => navigate(`/rooms/${roomId}`)}
            />
          ) : data.placeTheme === "칵테일바" ? (
            <ImageWrapper
              src={
                process.env.PUBLIC_URL + "/assets/RoomBackground/cocktail.jpg"
              }
              onClick={() => navigate(`/rooms/${roomId}`)}
            />
          ) : data.placeTheme === "야구장" ? (
            <ImageWrapper
              src={
                process.env.PUBLIC_URL + "/assets/RoomBackground/baseball.jpg"
              }
              onClick={() => navigate(`/rooms/${roomId}`)}
            />
          ) : data.placeTheme === "축구장" ? (
            <ImageWrapper
              src={process.env.PUBLIC_URL + "/assets/RoomBackground/soccer.jpg"}
              onClick={() => navigate(`/rooms/${roomId}`)}
            />
          ) : data.placeTheme === "페스티벌" ? (
            <ImageWrapper
              src={
                process.env.PUBLIC_URL + "/assets/RoomBackground/festival.jpg"
              }
              onClick={() => navigate(`/rooms/${roomId}`)}
            />
          ) : data.placeTheme === "클럽" ? (
            <ImageWrapper
              src={process.env.PUBLIC_URL + "/assets/RoomBackground/club.jpg"}
              onClick={() => navigate(`/rooms/${roomId}`)}
            />
          ) : data.placeTheme === "편의점" ? (
            <ImageWrapper
              src={
                process.env.PUBLIC_URL +
                "/assets/RoomBackground/convenience.jpg"
              }
              onClick={() => navigate(`/rooms/${roomId}`)}
            />
          ) : data.placeTheme === "한강공원" ? (
            <ImageWrapper
              src={process.env.PUBLIC_URL + "/assets/RoomBackground/river.jpg"}
              onClick={() => navigate(`/rooms/${roomId}`)}
            />
          ) : data.placeTheme === "미술관" ? (
            <ImageWrapper
              src={process.env.PUBLIC_URL + "/assets/RoomBackground/art.jpg"}
              onClick={() => navigate(`/rooms/${roomId}`)}
            />
          ) : data.placeTheme === "영화관" ? (
            <ImageWrapper
              src={process.env.PUBLIC_URL + "/assets/RoomBackground/movie.jpg"}
              onClick={() => navigate(`/rooms/${roomId}`)}
            />
          ) : data.placeTheme === "도서관" ? (
            <ImageWrapper
              src={
                process.env.PUBLIC_URL + "/assets/RoomBackground/livrary.jpg"
              }
              onClick={() => navigate(`/rooms/${roomId}`)}
            />
          ) : data.placeTheme === "집" ? (
            <ImageWrapper
              src={process.env.PUBLIC_URL + "/assets/RoomBackground/house.jpg"}
              onClick={() => navigate(`/rooms/${roomId}`)}
            />
          ) : (
            <ImageWrapper
              src={
                process.env.PUBLIC_URL + "/assets/RoomBackground/outside.jpg"
              }
              onClick={() => navigate(`/rooms/${roomId}`)}
            />
          )}

          <ProfileBlock>
            <RoomInfoWrapper position="absolute" right="100px" fontSize="18px">
              {rendering()}
            </RoomInfoWrapper>

            <ProfileImageWrapper>
              <ProfileImageThumbnail
                src={`/assets/profileImage/profile${createdUser.userImg}.png`}
                onClick={openModal}
              />
            </ProfileImageWrapper>

            <Nickname>{createdUser.userNickname}</Nickname>

            <Popularity>
              인기도 {createdUser.userPopularity}°
              <img
                style={{ width: "25px", height: "25px" }}
                src={
                  process.env.PUBLIC_URL +
                  `/assets/alcoholImage/${popularlityPercent}.png`
                }
              />
            </Popularity>
          </ProfileBlock>

          <ButtonNicknameWrapper>
            {data.roomPw && curParticipant < data.peopleLimit ? (
              <PwInput
                type="password"
                onChange={onPwInput}
                value={inputPw.roomPw}
                name="roomPw"
                placeholder="비밀번호를 입력하세요."
              />
            ) : (
              <></>
            )}

            {curParticipant < data.peopleLimit ? (
              <>
                {data.roomPw ? (
                  <Button
                    color="white"
                    background="#3d68a1"
                    onClick={() => {
                      onRoomPw();
                    }}
                  >
                    참여하기
                  </Button>
                ) : (
                  <Button onClick={onHandleEnterRoom}>참여하기</Button>
                )}
              </>
            ) : (
              <>
                <Button color="#c4c4c4" background="#919191">
                  참여불가
                </Button>
              </>
            )}

            <RoomInfoWrapper
              color={curParticipant < data.peopleLimit ? "black" : "#b03535"}
              marginLeft="3px"
              fontSize="16px"
              fontWeight="bold"
            >
              {curParticipant}/{data.peopleLimit}
            </RoomInfoWrapper>
          </ButtonNicknameWrapper>
        </RoomDetailWrapper>
      </Wrapper>
    </>
  );
};

export default RoomDetail;
