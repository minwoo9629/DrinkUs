import { useEffect, useState } from "react";
import styled from "styled-components";
import { client } from "../../../utils/client";

const MonthlyCalendar = ({ year, month, daily, setYearAndMonth }) => {
  const dayOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [curDate, setCurDate] = useState(new Date(year, month - 1));
  const [calendar, setCalendar] = useState([]);
  const [first, setFirst] = useState([]);
  const [last, setLast] = useState([]);

  const fetchData = async () => {
    const response = await client
      .get(
        `calendar/month?year=${curDate.getFullYear()}&month=${
          curDate.getMonth() + 1
        }`,
      )
      .then((response) => response);
    setCalendar([...response.data]);
    return response.data;
  };

  useEffect(() => {
    fetchData();
    drawCalendar();
    setYearAndMonth(curDate.getFullYear(), curDate.getMonth() + 1);
  }, [curDate]);

  const drawCalendar = () => {
    const year = curDate.getFullYear();
    const month = curDate.getMonth() + 1;
    const diffFirst = new Date(year, month - 1, 1).getDay(); // 매 월 1일의 요일 -> 0 : 일요일, 6: 토요일
    const lastDay = new Date(year, month, 0).getDate(); // 현재 달의 마지막 일
    const diffLast = (7 - ((lastDay + diffFirst) % 7)) % 7; // 달력에 마지막 채워지는 칸들

    const first = new Array(diffFirst);
    for (let i = 0; i < diffFirst; i++) {
      first[i] = new Date(year, month - 1, -diffFirst + i + 1).getDate();
    }
    const last = new Array(diffLast);
    for (let i = 0; i < diffLast; i++) {
      last[i] = new Date(year, month - 1, i + 1).getDate();
    }

    setFirst([...first]);
    setLast([...last]);
  };

  const onHandleDecreaseMonth = () => {
    // 한 달 앞으로
    setCurDate(
      new Date(
        curDate.getFullYear(),
        curDate.getMonth() - 1,
        curDate.getDate(),
      ),
    );
  };

  const onHandleIncreaseMonth = () => {
    // 한 달 뒤로
    setCurDate(
      new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        curDate.getDate(),
      ),
    );
  };

  // 스타일 지정

  const CalendarWrapper = styled.div`
    max-width: 1200px;
    margin: auto;
    padding-bottom: 60px;
  `;

  const CalendarTitle = styled.div`
    display: inline;
    font-size: 50px;
    font-weight: bold;
    color: #778fbd;
    font-family: Bebas Neue;
  `;

  const CalendarWeek = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    margin: 30px auto 0 auto;
  `;

  const DayOfWeek = styled.div`
    color: white;
    text-align: center;
    font-size: 22px;
    line-height: 50px;
    height: 50px;
    width: 100%;
    font-family: Bebas Neue;

    border-left: 1px solid white;

    background-color: #3a578c;
  `;

  const DayOfMonth = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    justify-content: center;
    margin: auto;
  `;

  const OnDay = styled.div`
    color: #495f7c;
    text-align: center;
    line-height: 40px;
    height: 126px;
    width: 100%;
    display: inline-block;
    border-collapse: collapse;

    border: 1px solid #eaf1ff;

    :nth-child(even) {
      background-color: #eaf1ff;
    }
    :nth-child(odd) {
      background-color: #fff;
    }

    &:hover {
      background-color: #2f64a3;
      color: white;
      transition: all 0.2s linear;
    }
  `;

  const OffDay = styled.div`
    color: #495f7c;
    line-height: 40px;
    height: 126px;
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #eaf1ff;

    :nth-child(even) {
      background-color: #f7f7f7;
      color: #e3e3e3;
    }
    :nth-child(odd) {
      background-color: #f7f7f7;
      color: #e3e3e3;
    }
  `;

  const NextButton = styled.button`
    background-color: inherit;
    border-color: transparent
      ${(props) => (props.direction == "left" ? props.color : "transparent")}
      transparent
      ${(props) => (props.direction == "right" ? props.color : "transparent")};
    border-width: 13px
      ${(props) => (props.direction == "left" ? "15px" : "0px")} 13px
      ${(props) => (props.direction == "right" ? "15px" : "0px")};
    height: 0;
    width: 0;
    margin: 0 25px;
    border-style: solid;

    vertical-align: 15px;

    &: hover {
      border-color: transparent
        ${(props) =>
          props.direction == "left" ? props.hoverColor : "transparent"}
        transparent
        ${(props) =>
          props.direction == "right" ? props.hoverColor : "transparent"};

      transition: all 0.2s linear;
    }

    &:active {
      border-color: transparent
        ${(props) =>
          props.direction == "left" ? props.activeColor : "transparent"}
        transparent
        ${(props) =>
          props.direction == "right" ? props.activeColor : "transparent"};
    }
  `;

  const CalendarDate = styled.div`
    display: flex;
    float: right;
    margin-top: 3px;
    margin-right: 13px;
    font-family: Aboreto;
    font-weight: bold;
    font-size: 16px;

    color: ${(props) => props.color};
  `;

  const SojuImg = styled.div`
    width: 30px;
    margin-top: 80px;
    margin-left: 6px;
  `;
  // 스타일 끝

  return (
    <>
      <CalendarWrapper>
        <NextButton
          onClick={onHandleDecreaseMonth}
          direction="left"
          color="#3a578c"
          hoverColor="#2b4169"
          activeColor="#1a2740"
        />
        <CalendarTitle>
          {curDate.getFullYear()}.{" "}
          {curDate.getMonth() + 1 < 10
            ? "0" + (curDate.getMonth() + 1)
            : curDate.getMonth() + 1}
        </CalendarTitle>
        <NextButton
          onClick={onHandleIncreaseMonth}
          direction="right"
          color="#3a578c"
          hoverColor="#2b4169"
          activeColor="#1a2740"
        />
        <CalendarWeek className="grid date_form date_head">
          {dayOfWeek.map((item, index) => {
            return <DayOfWeek key={index}>{item}</DayOfWeek>;
          })}
        </CalendarWeek>

        <DayOfMonth>
          {first.map((index) => {
            return (
              <OffDay key={index}>
                <CalendarDate>{index}</CalendarDate>
              </OffDay>
            );
          })}
          {calendar.map((item, index) => {
            if (index > 0) {
              return (
                <OnDay
                  {...item}
                  key={index}
                  onClick={() => daily(year, month, index)}
                >
                  <CalendarDate>{index}</CalendarDate>
                  {item ? (
                    <SojuImg>
                      <img
                        src="/assets/community/calendar/soju.png"
                        width="100%"
                      />
                    </SojuImg>
                  ) : (
                    <></>
                  )}
                </OnDay>
              );
            }
          })}
          {last.map((index) => {
            return (
              <OffDay key={index}>
                <CalendarDate>{index}</CalendarDate>
              </OffDay>
            );
          })}
        </DayOfMonth>
      </CalendarWrapper>
    </>
  );
};

export default MonthlyCalendar;
