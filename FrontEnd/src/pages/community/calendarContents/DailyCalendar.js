import styled from "styled-components";
import { client } from "../../../utils/client";
import { useEffect, useState } from "react";
import CalendarListItem from "../../../components/calendar/CalendarListItem";
import { useLocation, useNavigate } from "react-router-dom";
import { CalendarButton } from "../../../components/common/buttons/CalendarButton";
import Modal from "../../../components/modals/Modal";
import CreateCalendar from "./CreateCalendar";

const CalendarWrapper = styled.div``;

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
  color: #495f7c;
  text-transform: uppercase;
  font-size: 25px;
  font-weight: 800;
  border: none;
  margin: 0px 8px 5px 8px;
`;

const ButtonWrapper = styled.div`
  width: 300px;
  display: flex;
`;

const Title = styled.h2`
  display: flex;
  color: #6f92bf;
  margin: 0px 8px 0px 8px;
`;

const HrStyle = styled.hr`
  width: 1100px;
  margin-bottom: 10px;
`;

const MenuWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 500px;
`;

const ContentWrapper = styled.div``;

const PromiseLetter = styled.p`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const DailyCalendar = ({ year, month, day, monthly }) => {
  const location = useLocation();
  const navigate = useNavigate();

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
      .catch(function (error) {
        setDailyCalendar([]);
      });
  };

  const [modalState, setModalState] = useState(false);
  const openModal = () => {
    setModalState(true);
  };

  const closeModal = () => {
    setModalState(false);
  };

  useEffect(() => {
    fetchData();
  });

  const nextDay = parseInt(day) + 1;

  return (
    <>
      <CalendarWrapper>
        <Modal
          isOpen={modalState}
          modalContent={
            <CreateCalendar
              calendarDate={{ y: year, m: month, d: day }}
              close={closeModal}
              successHandler={fetchData}
            />
          }
          width="800px"
          height="500px"
        />
        <TopMenuWrap>
          <ButtonWrapper>
            <NextDayButton
              onClick={() => {
                window.location.replace(
                  `/calendar/${year}/${month}/${day - 1}`,
                );
              }}
            >
              &#60;
            </NextDayButton>
            <Title>{dailyCalendarTitle}</Title>
            <NextDayButton
              onClick={() => {
                window.location.replace(
                  `/calendar/${year}/${month}/${nextDay}`,
                );
              }}
            >
              &#62;
            </NextDayButton>
          </ButtonWrapper>
          <CalendarButton
            onClick={() => {
              monthly();
            }}
            color={"#bdcff2"}
            textColor={"#fff"}
          >
            뒤로가기
          </CalendarButton>

          <CalendarButton
            onClick={openModal}
            color={"#bdcff2"}
            textColor={"#fff"}
          >
            글쓰기
          </CalendarButton>
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
        <HrStyle />
      </CalendarWrapper>
      <ContentWrapper>
        {dailyCalendar.length === 0 ? (
          <PromiseLetter>
            오늘 잡힌 약속이 없어요. 약속을 잡아보세요!
          </PromiseLetter>
        ) : (
          <>
            {dailyCalendar.map((content, index) => (
              <CalendarListItem {...content} key={index} />
            ))}
          </>
        )}
      </ContentWrapper>
    </>
  );
};

export default DailyCalendar;
