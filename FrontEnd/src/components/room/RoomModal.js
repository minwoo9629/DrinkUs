import { useState, useEffect } from "react";
import styled from "styled-components";
import { client } from "../../utils/client";
import { GoToButton } from "../common/buttons/GoToButton";
import { Link, useNavigate } from "react-router-dom";
import { TimeGap } from "../../utils/TimeGap";
import { useDispatch } from "react-redux";
import { setRoomSession } from "../../store/actions/room";

// 모달 기본 스타일
const ModalWrapper = styled.div`
  display: none;
  position: absolute;
  top: ${({ top }) => `${top}px`};
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 10;
  background-color: rgb(0, 0, 0, 0.6);
  &.active {
    justify-content: center;
    align-items: center;
    display: flex;
  }
`;

const ModalContentWrapper = styled.div`
  width: 800px;
  min-height: 600px;
  background-color: #eaf1ff;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  opacity: 1;
  padding: 30px;
`;

const ModalHeader = styled.div`
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid gray;
  text-align: right;
  padding: 8px 12px;
`;

const ModalCloseButton = styled.button`
  padding: 8px 10px;
  border: none;
  background-color: white;
  cursor: pointer;
`;

const ModalContent = styled.div`
  padding: 20px;
`;

// 프로필 스타일
const ProfileBlock = styled.div`
  line-height: 1;
  display: block;
  align-items: center;
  margin-bottom: 10px;
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
  font-weight: bold;
  color: #000;
`;

const Popularity = styled.div`
  display: inline-block;
  display: block;
  height: 30px;
  line-height: 30px;
  font-weight: bold;
  color: #000;
`;

// 컨텐츠 스타일
const ContentBlock = styled.div`
  display: block;
  line-height: 1;
  margin-top: 5px;
  margin-bottom: 5px;
  height: 60px;
`

const RoomModal = ({ isOpen, close, roomId }) => {
<<<<<<< HEAD
  // Room 입장을 위한 세션설정
  const dispatch = useDispatch();
  const navigate = useNavigate();
=======

  const navigate = useNavigate();

>>>>>>> 501e36d4c840a589df49c7bb37cb9d7d98a9eda2
  // 모달 위치 조정
  const [ScrollY, setModalLocation] = useState(0);

  const onHandleLocation = () => {
    setModalLocation(window.pageYOffset);
  };

  useEffect(() => {
    const watch = () => {
      window.addEventListener("scroll", onHandleLocation);
    };
    onHandleLocation();
    watch();
    return () => {
      window.removeEventListener("scroll", onHandleLocation);
    };
  });

  // api 요청
  const onRoomDetail = async () => {
    const result = await client
      .get(`rooms/${roomId}`)
      .then((response) => response);
    return result;
  };

  const [data, setData] = useState({});

  const [userData, setUserData] = useState({});

  const dataRefineFunc = async () => {
    const result = await onRoomDetail();
    setData(result.data);
    setUserData(result.data.user)
    return data;
  };

  useEffect(() => {
    dataRefineFunc();
  }, []);

  const timeGap = TimeGap(data.createdDate);

<<<<<<< HEAD
  const onHandleEnterRoom = () => {
    const sessionData = {
      sessionName: `Session${data.roomId}`,
    };
    dispatch(setRoomSession(sessionData));
    navigate("/room/detail");
  };
=======
  const Img = userData.userImg
  const userId = userData.userId

>>>>>>> 501e36d4c840a589df49c7bb37cb9d7d98a9eda2
  return (
    <ModalWrapper className={isOpen ? "active" : ""} top={ScrollY}>
      <ModalContentWrapper>
        <ModalHeader>
          <ModalCloseButton onClick={close}>X</ModalCloseButton>
        </ModalHeader>
        <ModalContent>
<<<<<<< HEAD
          <div>
            {timeGap}시간 전{JSON.stringify(data.roomName)}
            {JSON.stringify(data.category)}
            {JSON.stringify(data.peopleLimit)}
            {JSON.stringify(data.roomId)}
          </div>
          <GoToButton onClick={onHandleEnterRoom}>참여하기</GoToButton>
=======
          <ProfileBlock>
            <ProfileImageWrapper>
              <ProfileImageThumbnail src={Img} onClick={()=>navigate("/profile")}/>
            </ProfileImageWrapper>
            <Nickname>{JSON.stringify(userData.userNickname)}</Nickname>
            <Popularity>{JSON.stringify(userData.userPopularity)}</Popularity>
          </ProfileBlock>
          <ContentBlock>
            {timeGap}시간 전
          </ContentBlock>
          <ContentBlock>
            {JSON.stringify(data.roomName)}
          </ContentBlock>
          <ContentBlock>
            {JSON.stringify(data.category)}
          </ContentBlock>
          <ContentBlock>
            {JSON.stringify(data.peopleLimit)}
          </ContentBlock>
          <GoToButton>
          <Link to="/room/detail">참여하기</Link>
          </GoToButton>
>>>>>>> 501e36d4c840a589df49c7bb37cb9d7d98a9eda2
        </ModalContent>
      </ModalContentWrapper>
    </ModalWrapper>
  );
};

export default RoomModal;
