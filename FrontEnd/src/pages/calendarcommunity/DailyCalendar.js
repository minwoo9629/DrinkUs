import styled from "styled-components";
import { client } from "../../utils/client";
import { useEffect, useState } from "react";
import Header from "../../components/layout/Header";
import { Wrapper } from "../../components/styled/Wrapper";
import { GoToButton } from "../../components/common/buttons/GoToButton";
import CalendarListItem from "../../components/calendar/CalendarListItem";


const DailyCalendar = () => {

  const [curDate, setCurDate] = useState(new Date());
  const [dailyCalendar, setDailyCalendar] = useState([]);
  const dailyCalendarTitle = `
    ${curDate.getFullYear()}년
    ${curDate.getMonth() + 1}월
    ${curDate.getDate()}일
  `

  const fetchData = async () => {
    const response = await client
      .get(`/calendar/daily?year=${curDate.getFullYear()}
      &month=${curDate.getMonth() + 1}
      &day=${curDate.getDate()}`
      )
      .then((response) => response);
    setDailyCalendar([...response.data.content]);
    return response.data;
  };

  useEffect(() => {
    fetchData();
  }, [curDate]);

  const onHandleDecreaseMonth = () => {
    // 하루 앞으로 
    setCurDate(
      new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        curDate.getDate() - 1,
      ),
    );
  };

  const onHandleIncreaseMonth = () => {
    // 하루 뒤로
    setCurDate(
      new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        curDate.getDate() + 1,
      ),
    );
  };

  return (
    <>
    <Header/>
    <Wrapper color={'#fff'}>
      <div>{dailyCalendarTitle}</div>
      <div>
      {dailyCalendar.map((content, index) => (
          <CalendarListItem
          {...content}
          key={index}
          />
        ))}
      </div>
      <GoToButton onClick={onHandleDecreaseMonth}>하루 앞으로</GoToButton>
      <GoToButton onClick={onHandleIncreaseMonth}>하루 뒤로</GoToButton>
    </Wrapper>
    </>
  );
};

export default DailyCalendar