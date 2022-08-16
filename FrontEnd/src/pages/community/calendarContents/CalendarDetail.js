import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { client } from "../../../utils/client";
import { FailAlert, SuccessAlert } from "../../../utils/sweetAlert";
import { GetPopularlityPercent } from "../../../utils/GetPopularlityPercent";
import moment from "moment";
import ModalCloseButton from "../../../components/common/buttons/ModalCloseButton";

const ModalContent = styled.div`
  margin: auto 100px;
  color: black;
`;

// 프로필 스타일
const ProfileWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProfileBlock = styled.div`
  line-height: 1;
  display: flex;
  justify-content: left;
  align-items: center;
  margin-bottom: 10px;
`;

const CalendarButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileImageWrapper = styled.div`
  float: left;
  width: 60px;
  height: 60px;
  margin: 0px 20px 0px 20px;
`;

const ProfileInfo = styled.div`
  align-items: center;
`;

const ProfileImageThumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 100%;
  border: 3px solid white;
`;

const Nickname = styled.div`
  height: 30px;
  line-height: 30px;
  font-size: 15px;
  font-weight: bold;
  color: #000000;
`;

const Popularity = styled.div`
  text-align: center;
  align-items: center;
  height: 30px;
  font-size: 15px;
  line-height: 30px;
  font-weight: bold;
  color: #484d59;
`;

const ContentBlock = styled.div`
  background-color: white;
  margin: 20px auto;
  border-radius: 10px;
  line-height: 30px;
  height: 30px;
  width: 90%;
  padding: 20px;
  border: 1px solid #bdcff2;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const PlaceBlock = styled.div`
  display: flex;
  background-color: white;
  border: 2px solid #6f92bf;
  margin: 12px 0px 10px 20px;
  border-radius: 20px;
  height: 40px;
  width: 200px;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const CalendarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TimeBlock = styled.div`
  display: flex;
  background-color: white;
  border: 2px solid #6f92bf;
  margin: 12px 0px 10px 20px;
  border-radius: 20px;
  height: 40px;
  width: 200px;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const LetterBlock = styled.p`
  display: flex;
  margin: 12px 0px 0px 20px;
`;

const AgeBlock = styled.div`
  display: flex;
`;

const AgeLetter = styled.div`
  background-color: ${(props) => props.background};
  border: 2px solid #6f92bf;
  margin: 12px 0px 10px 20px;
  align-items: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const ParticipantBlock = styled.div`
  display: flex;
  width: 60px;
  height: 60px;
  border-radius: 100px;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  border: 2px solid #6f92bf;
  margin: 20px auto;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const Button = styled.button`
  float: right;
  margin-right: 2%;
  background-color: white;
  background-color: ${(props) => props.background};
  color: #676775;
  color: ${(props) => props.color};
  width: 100px;
  height: 40px;
  font-size: 16px;
  border: 2px solid #6f92bf;
  border-radius: 20px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.25);
  cursor: ${(props) => props.cursor};
`;

const CalendarDetail = ({
  calendarId,
  successHandler,
  close,
  setModalType,
}) => {
  // 사용자 정보 확인
  const user = useSelector((state) => state.user);

  // 글 정보를 담을 state
  const [calendar, setCalendar] = useState({});

  // 글 정보를 가져오는 api요청
  const onCalendarDetail = async () => {
    const result = await client
      .get(`/calendar/${calendarId}`)
      .then((response) => response);
    return result;
  };

  // 모달에 들어오면 바로 api 요청 보내기
  useEffect(() => {
    onHandleData();
  });

  // api 요청으로 받은 데이터(result)를 state에 담아주기
  const onHandleData = async () => {
    const result = await onCalendarDetail();
    setCalendar(result.data);
    setAgeState(result.data.ages);
  };

  const [ageState, setAgeState] = useState([]);
  // 나이대 값 ~대 로 변경
  const renderingAges = () => {
    const result = [];
    for (let i = 0; i < 6; i++) {
      result.push(
        <AgeLetter background={ageState[i] == "Y" ? "white" : "gray"} key={i}>
          {i + 2 + "0대"}
        </AgeLetter>,
      );
    }
    return result;
  };

  // 참가, 참가 취소 api 요청
  const onPost = async () => {
    if (calendar.participant === calendar.peopleLimit) {
      FailAlert("방 인원이 다 찼어요!");
      close();
    }
    const result = await client
      .post(`/calendar/join/${calendarId}`)
      .then(() => {
        SuccessAlert("참가신청이 완료되었습니다!");
        successHandler();
        close();
      })
      .catch((e) => {
        FailAlert("일정 참가에 실패하였습니다!");
        console.log(e);
      });
  };

  const onDelete = async () => {
    await client
      .delete(`/calendar/join/${calendarId}`)
      .then(() => {
        SuccessAlert("취소되었습니다!");
        successHandler();
        close();
      })
      .catch((e) => {
        FailAlert("취소에 실패하였습니다!");
        console.log(e);
      });
  };

  // 일정 삭제 api 요청
  const onDeleteCalendar = async () => {
    await client
      .delete(`/calendar/${calendarId}`)
      .then(() => SuccessAlert("게시글이 삭제되었습니다!"))
      .catch((error) => console.log(error));
    close();
    successHandler();
  };

  // 참가, 취소 버튼 누르면 바뀌기
  const onHandleParticipate = () => {
    setCalendar((calendar.isParticipate = !calendar.isParticipate));
  };

  // 인기도 아이콘으로 변환
  const popularlityPercent = GetPopularlityPercent(calendar.createrPopularity);

  const day = moment(calendar.time).format("YYYY.MM.DD");
  const time = moment(calendar.time).format("hh:mm");

  return (
    <>
      <ModalContent>
        <ModalCloseButton close={close} />
        {/* 프로필 + 버튼 */}
        <ProfileWrapper>
          <ProfileBlock>
            <ProfileImageWrapper>
              <ProfileImageThumbnail
                src={`/assets/profileImage/profile${calendar.createrImg}.png`}
                onClick={() => navigate("/profile")}
              />
            </ProfileImageWrapper>
            <ProfileInfo>
              <Nickname>{calendar.createrNickname}</Nickname>
              <Popularity>
                인기도 {calendar.createrPopularity}°
                <img
                  style={{
                    width: "30px",
                    height: "30px",
                    marginLeft: "20px",
                  }}
                  src={
                    process.env.PUBLIC_URL +
                    `/assets/alcoholImage/${popularlityPercent}.png`
                  }
                />
              </Popularity>
            </ProfileInfo>
          </ProfileBlock>
          <CalendarButtonWrapper>
            <>
              {user.data.userId === calendar.createrId ? (
                <>
                  <Button onClick={() => setModalType("edit")}>수정하기</Button>
                  <Button onClick={onDeleteCalendar}>삭제하기</Button>
                </>
              ) : calendar.isParticipate === true ? (
                <Button
                  cursor="pointer"
                  onClick={() => {
                    onDelete(), onHandleParticipate();
                  }}
                >
                  취소
                </Button>
              ) : calendar.participant >= calendar.peopleLimit ? (
                <Button color="white" background="gray">
                  참여불가
                </Button>
              ) : (
                <Button
                  cursor="pointer"
                  onClick={() => {
                    onPost(), onHandleParticipate();
                  }}
                >
                  참가
                </Button>
              )}
            </>
          </CalendarButtonWrapper>
        </ProfileWrapper>

        {/* 방 설명 */}
        <ContentBlock>{calendar.calendarContent}</ContentBlock>

        {/* 시간 */}
        <CalendarWrapper>
          <TimeBlock>
            {day} {time}
          </TimeBlock>
          <LetterBlock>에</LetterBlock>
        </CalendarWrapper>

        {/* 장소 */}
        <CalendarWrapper>
          <PlaceBlock>{calendar.place}</PlaceBlock>
          <LetterBlock>에서 만나요</LetterBlock>
        </CalendarWrapper>

        {/* 연령대 */}
        <AgeBlock>{renderingAges()}</AgeBlock>

        {/* 참여인원 */}
        <ParticipantBlock>
          {calendar.participant} / {calendar.peopleLimit}
        </ParticipantBlock>
      </ModalContent>
    </>
  );
};

export default CalendarDetail;
