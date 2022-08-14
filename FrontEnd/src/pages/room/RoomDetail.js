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

const RoomDetailWrapper = styled.div`
  width: 800px;
  margin-bottom: 20px;
  color: white;
  background-color: #6f92bf;
  border-radius: 30px;
  padding: 20px 0px 20px 0px;
  box-shadow: inset 0px 0px 4px 4px rgba(189, 207, 242, 0.5);
  border: 3px solid #bdcff2;
`;

const RoomInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 640px;
  margin: 10px 0px 0px 80px;
  color: ${(props) => props.color};
`;

const ImageWrapper = styled.img`
  display: flex;
  margin: 0px 0px 0px 80px;
  background-color: gray;
  width: 640px;
  height: 400px;
  border-radius: 30px;
`;

const Button = styled.button`
  width: 100px;
  height: 48px;
  margin: 6px 20px 0px 10px;
  border-radius: 20px;
  background-color: #eaf1ff;
  color: #676775;
  font-size: 18px;
  line-height: 3px;
  border: 3px solid #bdcff2;
  box-shadow: inset 0px 0px 4px 4px rgba(189, 207, 242, 0.5);
  margin-right: 80px;
  cursor: pointer;
`;

// 프로필 스타일
const ProfileBlock = styled.div`
  line-height: 1;
  display: block;
  align-items: center;
  margin-bottom: 20px;
  margin-left: 60px;
`;

const ProfileImageWrapper = styled.div`
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
  display: inline-block;
  display: block;
  margin-bottom: 4px;
  height: 30px;
  line-height: 30px;
  font-size: 20px;
  color: #fff;
`;

const ButtonNicknameWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 30px;
`;

const Popularity = styled.div`
  display: inline-block;
  display: flex;
  width: 130px;
  justify-content: space-between;
  height: 30px;
  line-height: 30px;
  color: #fff;
`;

// 비밀번호
const PwInput = styled.input`
  display: flex;
  width: 200px;
  height: 20px;
  border-radius: 10px;
  border: 3px solid #bdcff2;
  box-shadow: inset 0px 0px 4px 4px rgba(189, 207, 242, 0.5);
  height: 600px;
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

  const dataRefineFunc = async () => {
    const result = await onRoomDetail();
    setData(result.data);
    setAgeState(result.data.ages);
    return data;
  };

  useEffect(() => {
    dataRefineFunc();
  }, []);

  // user 정보 state
  const [createdUser, setCreatedUser] = useState([]);

  // 방 입장 세션 정보
  const onHandleEnterRoom = () => {
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
        result.push(<span key={i}>{i + 2 + "0" + "대" + "   "}</span>);
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

  return (
    <>
      <BackButton />
      <Wrapper>
        <RoomDetailWrapper>
          <ProfileBlock>
            <ProfileImageWrapper>
              <ProfileImageThumbnail
                src={`/assets/profileImage/profile${createdUser.userImg}.png`}
                onClick={() => navigate("/profile")}
              />
            </ProfileImageWrapper>
            <ButtonNicknameWrapper>
              <Nickname>{createdUser.userNickname}</Nickname>
              <div>
                x/{data.peopleLimit}
                {data.roomPw !== null ? (
                  <Button
                    onClick={() => {
                      onRoomPw();
                    }}
                  >
                    참여하기
                  </Button>
                ) : (
                  <Button onClick={onHandleEnterRoom}>참여하기</Button>
                )}
              </div>
            </ButtonNicknameWrapper>
            <Popularity>
              인기도 {createdUser.userPopularity}°
              <img
                style={{ width: "30px", height: "30px" }}
                src={
                  process.env.PUBLIC_URL +
                  `/assets/alcoholImage/${popularlityPercent}.png`
                }
              />
            </Popularity>
          </ProfileBlock>
          {data.placeTheme === "술집" ? (
            <ImageWrapper
              src={
                process.env.PUBLIC_URL +
                "/assets/RoomBackground/publichouse.jpg"
              }
              onClick={() => navigate(`/rooms/${roomId}`)}
            />
          ) 
          : data.placeTheme === "펍" ? (
            <ImageWrapper
              src={process.env.PUBLIC_URL + "/assets/RoomBackground/pub.jpg"}
              onClick={() => navigate(`/rooms/${roomId}`)}
            />
          ) 
          : data.placeTheme === "칵테일바" ? (
            <ImageWrapper
              src={
                process.env.PUBLIC_URL + "/assets/RoomBackground/cocktail.jpg"
              }
              onClick={() => navigate(`/rooms/${roomId}`)}
            />
          )
          : data.placeTheme === "야구장" ? (
            <ImageWrapper
              src={
                process.env.PUBLIC_URL + "/assets/RoomBackground/baseball.jpg"
              }
              onClick={() => navigate(`/rooms/${roomId}`)}
            />
          )
          : data.placeTheme === "축구장" ? (
            <ImageWrapper
              src={
                process.env.PUBLIC_URL + "/assets/RoomBackground/soccer.jpg"
              }
              onClick={() => navigate(`/rooms/${roomId}`)}
            />
          )
          : data.placeTheme === "페스티벌" ? (
            <ImageWrapper
              src={
                process.env.PUBLIC_URL + "/assets/RoomBackground/festival.jpg"
              }
              onClick={() => navigate(`/rooms/${roomId}`)}
            />
          )
          : data.placeTheme === "클럽" ? (
            <ImageWrapper
              src={
                process.env.PUBLIC_URL + "/assets/RoomBackground/club.jpg"
              }
              onClick={() => navigate(`/rooms/${roomId}`)}
            />
          )
          : data.placeTheme === "편의점" ? (
            <ImageWrapper
              src={
                process.env.PUBLIC_URL + "/assets/RoomBackground/convenience.jpg"
              }
              onClick={() => navigate(`/rooms/${roomId}`)}
            />
          )
          : data.placeTheme === "한강공원" ? (
            <ImageWrapper
              src={
                process.env.PUBLIC_URL + "/assets/RoomBackground/river.jpg"
              }
              onClick={() => navigate(`/rooms/${roomId}`)}
            />
          )
          : data.placeTheme === "미술관" ? (
            <ImageWrapper
              src={
                process.env.PUBLIC_URL + "/assets/RoomBackground/art.jpg"
              }
              onClick={() => navigate(`/rooms/${roomId}`)}
            />
          )
          : data.placeTheme === "영화관" ? (
            <ImageWrapper
              src={
                process.env.PUBLIC_URL + "/assets/RoomBackground/movie.jpg"
              }
              onClick={() => navigate(`/rooms/${roomId}`)}
            />
          )
          : data.placeTheme === "도서관" ? (
            <ImageWrapper
              src={
                process.env.PUBLIC_URL + "/assets/RoomBackground/livrary.jpg"
              }
              onClick={() => navigate(`/rooms/${roomId}`)}
            />
          )
          : (
            <ImageWrapper
              src={
                process.env.PUBLIC_URL + "/assets/RoomBackground/outside.jpg"
              }
              onClick={() => navigate(`/rooms/${roomId}`)}
            />
          )}
          <RoomInfoWrapper>
            <h2>{data.roomName}</h2>
            <h4>{timeGap}시간 전</h4>
          </RoomInfoWrapper>
          <RoomInfoWrapper>
            {data.categoryName}
            <div>{rendering()}</div>
            {data.roomPw !== null ? (
              <PwInput
                onChange={onPwInput}
                value={inputPw.roomPw}
                name="roomPw"
                placeholder="비밀번호를 입력하세요."
              />
            ) : null}
          </RoomInfoWrapper>
        </RoomDetailWrapper>
      </Wrapper>
    </>
  );
};

export default RoomDetail;
