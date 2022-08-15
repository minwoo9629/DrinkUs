import styled from "styled-components";
import { client } from "../../../utils/client";
import { useEffect, useState } from "react";
import CalendarListItem from "../../../components/calendar/CalendarListItem";
import Modal from "../../../components/modals/Modal";
import CreateCalendar from "./CreateCalendar";

const TopMenuWrap = styled.div`
  margin: 20px;
  justify-content: space-between;
  display: flex;
  align-items: center;
  width: 1000px;
`;

const NextDayButton = styled.button`
  display: inline;
  width: 20px;
  height: 30px;
  background-color: white;
  color: #495f7c;
  text-transform: uppercase;
  font-size: 25px;
  font-weight: 800;
  border: none;
  margin: 0px 8px 5px 8px;
`;

const TitleWrapper = styled.div`
  margin-left: 200px;
  text-align: center;
`;

const ButtonWrapper = styled.span`
  display: flex;
  float: right;
`;

const Title = styled.h2`
  display: inline;
  color: #6f92bf;
  margin: 0px 8px 0px 8px;
`;

const ContentWrapper = styled.div`
  border-bottom: 5px solid rgb(228, 228, 228);
`;

const CalendarWrapper = styled.div``;
const ContentTitle = styled.div`
  height: 30px;
  margin-top: 15px;
  padding: 15px 0;
  border-top: 5px solid rgb(228, 228, 228);
  border-bottom: 3px solid rgb(228, 228, 228);
`;
const ContentListWrapper = styled.div``;
const Content = styled.div`
  width: ${(props) => props.width};
  font-weight: bold;
  font-size: 17px;
  margin-left: ${(props) => props.marginLeft || "30px"};
  text-align: ${(props) => props.textAlign || "center"};
  float: left;
`;

const CalendarButton = styled.button`
  padding: 10px 13px;
  width: 100px;
  font-size: 15px;
  font-weight: bold;
  margin-right: 10px;
  cursor: pointer;
  border-radius: 7px;
  background-color: ${(props) => props.background};
  color: ${(props) => props.color};
  border: 2px solid ${(props) => props.borderColor};

  &:hover {
    background-color: ${(props) => props.hoverBackground};
    color: ${(props) => props.hoverColor};
    transition: all 0.2s linear;
    border: 2px solid ${(props) => props.hoverBorderColor};
  }
`;

const DailyCalendar = ({ year, month, day, monthly }) => {
  const [dailyCalendar, setDailyCalendar] = useState([]);
  const dailyCalendarTitle = `
    ${year}.
    ${month}.
    ${day}
  `;

  const fetchData = async () => {
    const response = await client
      .get(
        `/calendar/daily?year=${year}
      &month=${month}
      &day=${day}`,
      )
      .then(function (response) {
        setDailyCalendar([...response.data.content]);
      })
      .catch(function (error) {});
  };

  const [modalState, setModalState] = useState({ write: false, list: false });
  const openWriteModal = () => {
    setModalState({ write: true, list: modalState.list });
  };

  const closeWriteModal = () => {
    setModalState({ write: false, list: modalState.list });
  };

  useEffect(() => {
    fetchData();
  });

  const nextDay = parseInt(day) + 1;

  return (
    <>
      <CalendarWrapper>
        <Modal
          isOpen={modalState.write}
          modalContent={
            <CreateCalendar
              calendarDate={{ y: year, m: month, d: day }}
              close={closeWriteModal}
              successHandler={fetchData}
            />
          }
          width="800px"
          height="500px"
        />

        <TitleWrapper>
          <NextDayButton
            onClick={() => {
              window.location.replace(`/calendar/${year}/${month}/${day - 1}`);
            }}
          >
            &#60;
          </NextDayButton>
          <Title>{dailyCalendarTitle}</Title>
          <NextDayButton
            onClick={() => {
              window.location.replace(`/calendar/${year}/${month}/${nextDay}`);
            }}
          >
            &#62;
          </NextDayButton>

          <ButtonWrapper>
            <CalendarButton
              onClick={openWriteModal}
              background="#bdcff2"
              color="#fff"
              borderColor="#bdcff2"
              hoverBackground="#5d81c9"
              hoverColor="#fff"
              hoverBorderColor="#5d81c9"
            >
              일정 생성
            </CalendarButton>
            <CalendarButton
              onClick={() => {
                monthly();
              }}
              background="#fff"
              color="#bdcff2"
              borderColor="#bdcff2"
              hoverBackground="#c4c4c4"
              hoverColor="#fff"
              hoverBorderColor="#c4c4c4"
            >
              달력으로
            </CalendarButton>
          </ButtonWrapper>
        </TitleWrapper>
      </CalendarWrapper>

      <ContentWrapper>
        <ContentTitle>
          <Content width="600px" textAlign="left" marginLeft="50px">
            내용
          </Content>
          <Content width="150px">시간</Content>
          <Content width="200px">장소</Content>
          <Content width="100px">인원</Content>
        </ContentTitle>
        <ContentListWrapper>
          {dailyCalendar.length == 0 ? (
            <>오늘 잡힌 약속이 없어요. 약속을 잡아보세요!</>
          ) : (
            <>
              {dailyCalendar.map((content, index) => (
                <CalendarListItem {...content} key={index} />
              ))}
            </>
          )}
        </ContentListWrapper>
      </ContentWrapper>
    </>
  );
};

export default DailyCalendar;
