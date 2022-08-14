import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CalendarModal from "../../components/calendar/CalendarModal";

const CalendarWrapper = styled.div`
  width: 100vw;
  background-color: white;
  display: flex;
  justify-content: center;
`

const MenuWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 500px;
`

const TopMenuWrap = styled.div`
  margin: 20px;
  justify-content: space-between;
  display: flex;
  align-items: center;
  width: 1000px;
`;

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

  const handleTime = content.time;
  const time = `${handleTime.split('T')[1].split(':')[0]}:${handleTime.split('T')[1].split(':')[1]}`

  return (
    <>
    <CalendarModal close={modalClose}
      isOpen={isOpen}
      calendarId={content.calendarId}
      />
    <CalendarWrapper onClick={modalOpen}>
      <TopMenuWrap>
        <div>{content.calendarContent}</div>
      <MenuWrap>
        <div>{time}</div>
        <div>{content.place}</div>
        <div>{content.peopleLimit}</div>
      </MenuWrap>
      </TopMenuWrap>
    </CalendarWrapper>
    </>
  );
};

export default CalendarListItem