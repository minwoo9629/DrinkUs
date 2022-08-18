import { useEffect, useState } from "react";
import styled from "styled-components";
import MonthlyCalendar from "./MonthlyCalendar";
import DailyCalendar from "./DailyCalendar";

// 스타일 지정
const CalendarWrapper = styled.div`
  text-align: center;
`;

const CalendarCommunity = () => {
  const [calendarMode, setCalendaryMode] = useState("monthly");
  const [date, setDate] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  });

  const setYearAndMonth = (y, m) => {
    setDate({ year: y, month: m, day: date.day });
  };

  const setNewDate = (y, m, d) => {
    setDate({ year: y, month: m, day: d });
  };

  const openMonthlyCalendar = () => {
    setCalendaryMode("monthly");
  };

  const openDailyCalendar = (y, m, d) => {
    setDate({ year: y, month: m, day: d });
    setCalendaryMode("daily");
  };

  return (
    <>
      <CalendarWrapper>
        {calendarMode == "monthly" ? (
          <MonthlyCalendar
            year={date.year}
            month={date.month}
            daily={openDailyCalendar}
            setYearAndMonth={setYearAndMonth}
          />
        ) : (
          <DailyCalendar
            year={date.year}
            month={date.month}
            day={date.day}
            monthly={openMonthlyCalendar}
            setNewDate={setNewDate}
          />
        )}
      </CalendarWrapper>
    </>
  );
};

export default CalendarCommunity;
