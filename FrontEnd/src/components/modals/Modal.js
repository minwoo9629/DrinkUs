import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const ModalWrapper = styled.div`
  display: none;
  position: absolute;
  top: 0;
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
  width: 620px;
  height: 480px;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  opacity: 1;
  background-color: #eaf1ff;
  border: 5px solid #6f92bf;
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
const Modal = ({ isOpen, close, modalContent }) => {
  return (
    <ModalWrapper className={isOpen ? "active" : ""}>
      <ModalContentWrapper>
        <ModalContent>{modalContent}</ModalContent>
      </ModalContentWrapper>
    </ModalWrapper>
  );
};

export default Modal;
