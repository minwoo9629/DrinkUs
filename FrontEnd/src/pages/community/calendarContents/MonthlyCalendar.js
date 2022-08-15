import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { client } from "../../../utils/client";

const MonthlyCalendar = ({ year, month, daily, setYearAndMonth }) => {
  console.log("### year: " + year + ", month: " + month);
  const navigate = useNavigate();

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
    first.fill(0);
    const last = new Array(diffLast);
    last.fill(0);

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
  const TopMenuWrap = styled.div`
    justify-content: space-between;
    display: flex;
    align-items: center;
  `;

  const NextMonthButton = styled.button`
    width: 20px;
    height: ;30px
    background-color: white;
    color: #495f7c;
    text-transform: uppercase;
    font-size: 25px;
    font-weight: 800;
    border: none;
    margin: auto 10px;
  `;

  const CalendarTitle = styled.div`
    font-size: 25px;
    color: #6f92bf;
  `;

  const CalendarWeek = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    margin: 30px auto 0 auto;
  `;

  const DayOfWeek = styled.div`
    background: darkblue;
    color: #495f7c;
    text-align: center;
    font-size: 15px;
    line-height: 40px;
    height: 50px;
    width: 100%;
    border: 1px solid #bdcff2;

    :nth-child(even) {
      background-color: #eaf1ff;
    }
    :nth-child(odd) {
      background-color: #fff;
    }
  `;

  const DayOfMonth = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    justify-content: center;
    margin: auto;
  `;

  const OnDay = styled.div`
    background: tomato;
    color: #495f7c;
    text-align: center;
    font-size: 15px;
    line-height: 40px;
    height: 100px;
    width: 100%;
    border: 1px #bdcff2 solid;
    display: inline-block;
    &:hover {
      background-color: red;
      transition: all 0.4s linear;
    }

    :nth-child(even) {
      background-color: #eaf1ff;
    }
    :nth-child(odd) {
      background-color: #fff;
    }

    :hover {
      background-color: #11335c;
      color: #ffeb57;
    }
  `;

  const OffDay = styled.div`
    background: ${(props) => props.background};
    color: #495f7c;
    text-align: center;
    font-size: 15px;
    line-height: 40px;
    height: 100px;
    width: 100%;
    display: table-cell;
    border: 1px #bdcff2 solid;
    border-collapse: collapse;

    :nth-child(even) {
      background-color: #eaf1ff;
    }
    :nth-child(odd) {
      background-color: #fff;
    }
  `;

  const InnerWrapper = styled.div``;
  // 스타일 끝

  return (
    <>
      <InnerWrapper>
        <TopMenuWrap>
          <div>
            <NextMonthButton onClick={onHandleDecreaseMonth}>
              &#60;
            </NextMonthButton>
          </div>
          <CalendarTitle>
            {curDate.getFullYear()}년 {curDate.getMonth() + 1}월
          </CalendarTitle>
          <div className="calendarBox">
            <NextMonthButton onClick={onHandleIncreaseMonth}>
              &#62;
            </NextMonthButton>
          </div>
        </TopMenuWrap>
        <TopMenuWrap></TopMenuWrap>
        <div className="App">
          <div className="wrapper">
            <CalendarWeek className="grid date_form date_head">
              {dayOfWeek.map((item, index) => {
                return <DayOfWeek key={index}>{item}</DayOfWeek>;
              })}
            </CalendarWeek>

            <DayOfMonth className="dateSel">
              {first.map((index) => {
                return <OffDay key={index} background="lightgrey"></OffDay>;
              })}
              {calendar.map((item, index) => {
                if (index > 0) {
                  if (item) {
                    return (
                      <OnDay
                        {...item}
                        key={index}
                        onClick={() => daily(year, month, index)}
                      >
                        {index}
                        <i className="fas fa-glass-cheers"></i>
                      </OnDay>
                    );
                  } else {
                    return (
                      <OffDay key={index} background="smoke">
                        {index}
                      </OffDay>
                    );
                  }
                }
              })}
              {last.map((index) => {
                return <OffDay key={index} background="lightgrey"></OffDay>;
              })}
            </DayOfMonth>
          </div>
        </div>
      </InnerWrapper>
    </>
  );
};

export default MonthlyCalendar;
