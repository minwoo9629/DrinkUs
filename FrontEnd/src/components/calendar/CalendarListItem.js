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

  border-bottom: 1px solid #f5f5f5;

  margin-bottom: -1px;

  &:hover {
    background-color: #f7f7f7;
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

const CalendarListItem = ({ content, successHandler, year, month, day }) => {
  console.log(content);

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
        isOpen={isOpen}
        modalContent={
          modalType == "show" ? (
            <CalendarDetail
              calendarId={content.calendarId}
              successHandler={successHandler}
              close={modalClose}
              setModalType={setModalType}
            />
          ) : (
            <EditCalendar
              calendarId={content.calendarId}
              content={content}
              calendarDate={{ y: year, m: month, d: day }}
              close={modalClose}
              successHandler={successHandler}
            />
          )
        }
        width="800px"
        height="500px"
      />
      <CalendarListItemWrapper onClick={modalOpen}>
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
