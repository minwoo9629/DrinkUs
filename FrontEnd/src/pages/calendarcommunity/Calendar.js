import { useEffect, useState } from "react";
import styled from "styled-components";
import { GoToButton } from "../../components/common/buttons/GoToButton";
import { useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header";
import { Wrapper } from "../../components/styled/Wrapper";
import { client } from "../../utils/client";

const Calendar = () => {

  const navigate = useNavigate();

  const dayOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  // const [state, setState] = useState(state 초기값);
  const [curDate, setCurDate] = useState(new Date());
  const [calendar, setCalendar] = useState([]);
  const [first, setFirst] = useState([]);
  const [last, setLast] = useState([]);
  const calendarTitle = `${curDate.getFullYear()}년 ${
    curDate.getMonth() + 1
  }월`;
  const fetchData = async () => {
    const response = await client
      .get(
        `calendar/month?year=${curDate.getFullYear()}&month=${
          curDate.getMonth() + 1
        }`,
      )
      .then((response) => response);
    console.log(response.data);
    setCalendar([...response.data]);
    return response.data;
  };

  useEffect(() => {
    fetchData();
    drawCalendar();
  }, [curDate]);

  const drawCalendar = () => {
    const year = curDate.getFullYear();
    const month = curDate.getMonth() + 1;
    const diffFirst = new Date(year, month - 1, 1).getDay(); // 매 월 1일의 요일 -> 0 : 일요일, 6: 토요일
    const lastDay = new Date(year, month, 0).getDate(); // 현재 달의 마지막 일
    const diffLast = (7 - ((lastDay + diffFirst) % 7)) % 7; // 달력에 마지막 채워지는 칸들

    const first = new Array(diffFirst);
    const last = new Array(diffLast);

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

  // 스타일 지정!!!!!
  const DayOfWeek = styled.div`
        background: darkblue;
        color: #fff;
        text-align: center;
        font-size: 15px;
        line-height: 40px;
        height: 50px;
        width: 100px;
        margin: 3px;
        border: 1px darkblue solid;
        display: inline-block;
`;

  const OnDay = styled.div`
        background: tomato;
        color: black;
        text-align: center;
        font-size: 15px;
        line-height: 40px;
        height: 100px;
        width: 100px;
        margin: 3px;
        border: 1px tomato solid;
        display: inline-block;
        &:hover{
            background-color: red; 
            transition: all 0.4s linear;
        }
`;

  const OffDay = styled.div`
        background:  ${(props) => props.background};
        color: black;
        text-align: center;
        font-size: 15px;
        line-height: 40px;
        height: 100px;
        width: 100px;
        margin: 3px;
        display: inline-block;
        border: 1px lightgrey solid;
`;

  const InnerWrapper = styled.div`
        width: 800px;
  `

  // 스타일 끝

  return (
    <>
    <Header/>
    <Wrapper color={'#fff'}>
    <InnerWrapper>
    <GoToButton onClick={() => navigate("/calendar/create")} color={"cornflowerblue"}>글쓰기</GoToButton>
    <GoToButton onClick={() => navigate("/daily")} color={"cornflowerblue"}>일간게시판</GoToButton>
    <div className="App">
      <div>
        <button onClick={onHandleDecreaseMonth}>&#60;</button>
      </div>

      <div>{calendarTitle}</div>
      <div className="calendarBox">
        <button onClick={onHandleIncreaseMonth}>&#62;</button>
      </div>

      <div className="wrapper">
        <div className="grid date_form date_head">
          {dayOfWeek.map((item, index) => {
            return <DayOfWeek key={index}>{item}</DayOfWeek>;
          })}
        </div>

        <div className="dateSel">
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
                    onClick={() => {
                      navigate(`/calendar/${curDate.getFullYear()}/${curDate.getMonth() + 1}/${index}`
                      , {year: curDate.getFullYear(), month: curDate.getMonth() + 1, index: index});
                    }}
                  >
                    {index}
                  </OnDay>
                );
              } else {
                return <OffDay key={index} background="smoke">{index}</OffDay>;
              }
            }
          })}
          {last.map((index) => {
            return <OffDay key={index} background="lightgrey"></OffDay>;
          })}
        </div>
      </div>
    </div>
    </InnerWrapper>
    </Wrapper>
    </>
  );
}

export default Calendar;
