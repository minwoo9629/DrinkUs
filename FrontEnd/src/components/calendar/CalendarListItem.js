import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { GoToButton } from "../common/buttons/GoToButton";


const ItemBox = styled.div`
  display: flex;
  align-items: center;
  width: 1000px;
  height: 200px;
`

const CalendarListItem = (content) => {

  const navigate = useNavigate();

  return (
    <>
    <ItemBox>
      {JSON.stringify(content.calendarId)}
      {JSON.stringify(content.calendarContent)}
      {JSON.stringify(content.time)}
      {JSON.stringify(content.place)}
      {JSON.stringify(content.peopleLimit)}
      <GoToButton onClick={() => navigate(`/calendar/${content.calendarId}`, {calendarId: content.calendarId})} color={"cornflowerblue"}>상세조회</GoToButton>
    </ItemBox>
    </>
  );
};

export default CalendarListItem