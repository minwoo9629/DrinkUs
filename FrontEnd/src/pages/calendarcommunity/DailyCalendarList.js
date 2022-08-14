import styled from "styled-components";
import { client } from "../../utils/client";
import { useEffect, useState } from "react";
import Header from "../../components/layout/Header";
import CalendarListItem from "../../components/calendar/CalendarListItem";
import { useLocation, useNavigate } from "react-router-dom";
import { CalendarButton } from "../../components/common/buttons/CalendarButton";

const CalendarWrapper = styled.div`
  width: 100vw;
  background-color: white;
  display: flex;
  justify-content: center;
`

const TopMenuWrap = styled.div`
  margin: 20px;
  justify-content: space-between;
  display: flex;
  align-items: center;
  width: 1000px;
`;

const NextDayButton = styled.button`
  width: 20px;
  height: 30px;
  background-color: white;
  color: #495F7C;
  text-transform: uppercase;
  font-size: 25px;
  font-weight: 800;
  border: none;
  margin: 0px 8px 5px 8px;
`

const ButtonWrapper = styled.div`
  width: 300px;
  display: flex;
`

const Title = styled.h2`
  display: flex;
  color: #6F92BF;
  margin: 0px 8px 0px 8px;
`

const HrStyle = styled.hr`
  width: 1100px;
  margin-bottom: 10px;
`

const MenuWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 500px;
`

const ContentWrapper = styled.div`
  width: 100vw;
  background-color: white;
  display: flex;
  justify-content: center;
  flex-direction: column;
`

const PromiseLetter = styled.p`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`

const DailyCalendarList = () => {

  const location = useLocation();
  const navigate = useNavigate(); 
  const year = location.pathname.split('/')[2]
  const month = location.pathname.split('/')[3]
  const day = location.pathname.split('/')[4]

  const [dailyCalendar, setDailyCalendar] = useState([]);
  const dailyCalendarTitle = `
    ${year}.
    ${month}.
    ${day}
  `

  const fetchData = async () => {
    const response = await client
      .get(`/calendar/daily?year=${year}
      &month=${month}
      &day=${day}`
      )
      .then(function(response) {
        setDailyCalendar([...response.data.content]);
      })
      .catch(function(error) {
        setDailyCalendar([])
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const nextDay = parseInt(day) + 1;

  return (
    <>
    <Header location={'lightzone'}/>
    <CalendarWrapper>
      <TopMenuWrap>
        <div>
        <CalendarButton onClick={() => navigate("/calendar")} color={"#bdcff2"} textColor={"#fff"}>월간</CalendarButton>
        <CalendarButton onClick={() => navigate("/daily")} color={"#ffffff"} textColor={"#6F92BF"}>일간</CalendarButton>
        </div>
        <ButtonWrapper>
          <NextDayButton onClick={() => {window.location.replace(`/calendar/${year}/${month}/${day-1}`)}}>&#60;</NextDayButton>
          <Title>{dailyCalendarTitle}</Title>
          <NextDayButton onClick={() => {window.location.replace(`/calendar/${year}/${month}/${nextDay}`)}}>&#62;</NextDayButton>
        </ButtonWrapper>
        <CalendarButton onClick={() => navigate("/calendar/create")} color={"#bdcff2"} textColor={"#fff"}>글쓰기</CalendarButton>
      </TopMenuWrap>
    </CalendarWrapper>
    <CalendarWrapper>
      <TopMenuWrap>
      <div>내용</div>
      <MenuWrap>
        <div>시간</div>
        <div>장소</div>
        <div>인원</div>
      </MenuWrap>
      </TopMenuWrap>
    </CalendarWrapper>
    <CalendarWrapper>
    <HrStyle/>
    </CalendarWrapper>
    <ContentWrapper>
      {dailyCalendar.length === 0 ?
      <PromiseLetter>오늘 잡힌 약속이 없어요. 약속을 잡아보세요!</PromiseLetter> :
      <>
      {dailyCalendar.map((content, index) => (
          <CalendarListItem
          {...content}
          key={index}
          />
        ))}
      </>
      }
    </ContentWrapper>
    <CalendarWrapper>
    </CalendarWrapper>
    </>
  );
};

export default DailyCalendarList