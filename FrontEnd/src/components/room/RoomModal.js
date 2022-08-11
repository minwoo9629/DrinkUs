import { useState, useEffect } from "react";
import styled from "styled-components";
import { client } from "../../utils/client";
import { GoToButton } from "../common/buttons/GoToButton";
import { Link } from "react-router-dom";
import { TimeGap } from "../../utils/TimeGap";

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
  background-color: #EAF1FF;
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
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;
const RoomModal = ({ isOpen, close, roomId }) => {

  // 모달 위치 조정
  const [ScrollY, setModalLocation] = useState(0);
  
  const onHandleLocation = () => {
    setModalLocation(window.pageYOffset);
  }

  useEffect(()=> {
    const watch = () => {
      window.addEventListener("scroll", onHandleLocation);
    };
    onHandleLocation();
    watch();
    return () => {
      window.removeEventListener("scroll", onHandleLocation);
    }
  })

  // api 요청
  const onRoomDetail = async () => {
    const result = await client
      .get(`rooms/${roomId}`)
      .then((response) => response);
    return result;
  };

  const [data, setData] = useState({});

  const dataRefineFunc = async () => {
    const result = await onRoomDetail();
    setData(result.data);
    return data;
  };

  useEffect(() => {
    dataRefineFunc();
  }, []);

  const timeGap = TimeGap(data.createdDate)

  return (
    <ModalWrapper className={isOpen ? "active" : ""} top={ScrollY}>
      <ModalContentWrapper>
        <ModalHeader>
          <ModalCloseButton onClick={close}>X</ModalCloseButton>
        </ModalHeader>
        <ModalContent>
          <div>
          {timeGap}시간 전
          {JSON.stringify(data.roomName)}
          {JSON.stringify(data.category)}
          {JSON.stringify(data.peopleLimit)}
          {JSON.stringify(data.roomId)}
          </div>
          <GoToButton>
          <Link to="/room/detail">참여하기</Link>
          </GoToButton>
        </ModalContent>
      </ModalContentWrapper>
    </ModalWrapper>
  );
};

export default RoomModal;
