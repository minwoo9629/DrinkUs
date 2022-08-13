import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CalendarModal from "../../components/calendar/CalendarModal";

const ItemBox = styled.div`
  display: flex;
  align-items: center;
  width: 1000px;
  height: 100px;
`

const CalendarListItem = (content) => {
  const navigate = useNavigate();

  // 모달
  const [isOpen, setIsOpen] = useState(false)

  const modalOpen = () =>{
    setIsOpen(true);
  }

  const modalClose = () =>{
    setIsOpen(false);
  }

  return (
    <>
    <CalendarModal close={modalClose}
      isOpen={isOpen}
      calendarId={content.calendarId}
      />
    <ItemBox onClick={modalOpen}>
      {JSON.stringify(content.calendarContent)}/
      {content.calendarId}/
      {JSON.stringify(content.time)}
      {JSON.stringify(content.place)}
      {JSON.stringify(content.peopleLimit)}
      </ItemBox>
    </>
  );
};

export default CalendarListItem