import Header from "../../components/layout/Header";
import { Wrapper } from "../../components/styled/Wrapper";
import { client } from "../../utils/client"
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const CalendarBlock = styled.div`
  width: 800px;
  margin-bottom: 20px;
  color: white;
  background-color: #6F92BF;
  border-radius: 30px;
  padding: 30px;
`

const ContentBlock = styled.div`
  display: block;
  line-height: 1;
  margin-top: 5px;
  margin-bottom: 5px;
  height: 60px;
`;

const StyledButton = styled.button`
  adding: 4px;
  border: none;
  background-color: black;
  font-size: 16px;
  color: white;
  cursor: pointer;
`;


const CalendarDetail = () => {
  
  const location = useLocation();
  console.log(useLocation().pathname.split('/')[2])

  // 글 정보를 담을 state 
  const [calendar, setCalendar] = useState({});

  // api요청
  const onCalendarDetail = async () => {
    const result = await client
      .get(`${location.pathname}`)
      .then((response) => response)
    return result
  }

  // 페이지에 들어오면 바로 api 요청 보내기
  useEffect(()=>{
    onHandleData();
  },[])

  // api 요청으로 받은 데이터(result)를 state에 담아주기
  const onHandleData = async () => {
    const result = await onCalendarDetail()
    setCalendar(result.data);
    setAgeState(result.data.ages)
    return calendar, ageState
  }

  const [ageState, setAgeState] = useState([]);

  // 나이대 값 ~대 로 변경
  const rendering = () => {
    const result = [];
    for (let i = 0; i < 6; i++) {
      if (ageState[i] === 'Y') {
        result.push(
        <span key={i}>
          {i+2 + '0' + '대'}
        </span>
        )
      }
    }
    return result
  }

  return (
    <>
      <Header/>
      <Wrapper>
        <CalendarBlock>
          <ContentBlock>
            방 내용: {calendar.calendarContent}
          </ContentBlock>
          <ContentBlock>
            참가자: {calendar.participant} / {calendar.peopleLimit}
          </ContentBlock>
          <ContentBlock>
            장소: {calendar.place} 에서
          </ContentBlock>
          <ContentBlock>
            시간: {calendar.time} 에 만나요
          </ContentBlock>
          <ContentBlock>
            나이대: {rendering()}
          </ContentBlock>
          <>
            {
              calendar.participant === calendar.peopleLimit ?
              <p>마감</p> : (
                calendar.isParticipate === true ?
              <StyledButton>취소</StyledButton> : <StyledButton>참가</StyledButton>
              )
            }
          </>
        </CalendarBlock>
      </Wrapper>
    </>
  );
};

export default CalendarDetail