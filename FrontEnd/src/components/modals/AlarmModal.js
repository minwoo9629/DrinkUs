import styled from "styled-components";

// 모달 스타일
const ModalWrapper = styled.div`
  top: -50px;
  display: none;
  position: absolute;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 10;
  background-color: transparent;
  &.active {
    justify-content: center;
    align-items: center;
    display: flex;
  }
`;

const ModalContentWrapper = styled.div`
  width: 300px;
  min-height: 400px;
  background-color: #EAF1FF;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  opacity: 1;
  padding: 30px;
  margin-left: 40%;
  border: #6F92BF solid;
  box-shadow: inset 0px 0px 4px 4px rgba(189, 207, 242, 0.5);
`;

const ModalContent = styled.div`
  padding: 20px;
`;

const AlarmModal = ({ isOpen, close }) => {



  return (
    <ModalWrapper className={isOpen ? "active" : ""} onClick={close}>
      <ModalContentWrapper>
        <ModalContent>알람창</ModalContent>
      </ModalContentWrapper>
    </ModalWrapper>
  );
};

export default AlarmModal;
