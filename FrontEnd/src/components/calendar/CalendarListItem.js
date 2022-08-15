import styled from "styled-components";
import { useState } from "react";
import CalendarModal from "../../components/calendar/CalendarModal";

const CalendarListItemWrapper = styled.div`
  width: 100%;
  padding-top: 20px;
  padding-bottom: 45px;

  border-bottom: 1px solid #f5f5f5;

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

const CalendarListItem = (content) => {
  const [isOpen, setIsOpen] = useState(false);

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
      <CalendarModal
        close={modalClose}
        isOpen={isOpen}
        calendarId={content.calendarId}
      />
      <CalendarListItemWrapper onClick={modalOpen}>
        <Content
          width="600px"
          textAlign="left"
          marginLeft="50px"
          color="#3b3b3b"
        >
          {content.calendarContent}
        </Content>
        <Content width="150px" color="#3b3b3b">
          {time}
        </Content>
        <Content width="200px" color="#3b3b3b">
          {content.place}
        </Content>
        <Content
          width="100px"
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
