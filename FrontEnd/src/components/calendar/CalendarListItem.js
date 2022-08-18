import styled from "styled-components";
import { useState } from "react";
import { useSelector } from "react-redux";
import Modal from "../modals/Modal";
import CalendarDetail from "../../pages/community/calendarContents/CalendarDetail";
import EditCalendar from "../../pages/community/calendarContents/EditCalendar";

const CalendarListItemWrapper = styled.div`
  width: 100%;
  padding-top: 20px;
  padding-bottom: 45px;

  background-color: ${(props) => props.background};

  border-bottom: 1px solid #f5f5f5;

  margin-bottom: -1px;

  &:hover {
    background-color: ${(props) => props.hoverColor || "#f7f7f7"};
  }
`;

const Content = styled.div`
  width: ${(props) => props.width};
  color: ${(props) => props.color};
  font-size: 16px;
  margin-left: ${(props) => props.marginLeft || "30px"};
  text-align: ${(props) => props.textAlign || "center"};
  float: left;
`;

const InfoWrapper = styled.span`
  margin-left: 10px;
  color: #7dd47d;
`;

const CalendarListItem = ({ content, successHandler }) => {
  // 사용자 정보 확인
  const user = useSelector((state) => state.user);

  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState("show");

  const modalOpen = () => {
    setIsOpen(true);
  };

  const modalClose = () => {
    setIsOpen(false);
  };

  const handleTime = content.time;
  const time = `${handleTime.split("T")[1].split(":")[0]}:${
    handleTime.split("T")[1].split(":")[1]
  }`;

  return (
    <>
      <Modal
        bgColor={"transparent"}
        isOpen={isOpen}
        modalContent={
          modalType == "show" || modalType == "none" ? (
            <CalendarDetail
              calendarId={content.calendarId}
              content={content}
              successHandler={successHandler}
              close={modalClose}
              modalType={modalType}
              setModalType={setModalType}
            />
          ) : (
            <EditCalendar
              calendarId={content.calendarId}
              content={content}
              close={() => {
                setModalType("show");
                modalClose();
              }}
              successHandler={successHandler}
              width="500px"
              height="900px"
              setModalType={setModalType}
              modalType={modalType}
            />
          )
        }
        background={modalType == "show" ? "#f7faff" : "white"}
        width="600px"
        borderColor="none"
      />
      <CalendarListItemWrapper
        onClick={modalOpen}
        background={new Date(content.time) < new Date() ? "#ededed" : ""}
        hoverColor={new Date(content.time) < new Date() ? "#e0e0e0" : ""}
      >
        <Content width="230px" textAlign="left" marginLeft="50px">
          {content.createrNickname}
        </Content>

        <Content width="500px" textAlign="left" color="#3b3b3b">
          {content.calendarContent}
          {content.isParticipate && content.createrId != user.data.userId ? (
            <InfoWrapper>
              <i class="fa fa-check"></i>
            </InfoWrapper>
          ) : (
            <></>
          )}
        </Content>
        <Content width="90px" color="#3b3b3b">
          {time}
        </Content>
        <Content width="90px" color="#3b3b3b">
          {content.place}
        </Content>
        <Content
          width="90px"
          color={
            content.participant >= content.peopleLimit ? "#e64c4c" : "#3b3b3b"
          }
        >
          {content.participant}/{content.peopleLimit}
        </Content>
      </CalendarListItemWrapper>
    </>
  );
};

export default CalendarListItem;
