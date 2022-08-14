import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { client } from "../../utils/client"
import { useNavigate } from "react-router-dom";
import { FailAlert, SuccessAlert } from "../../utils/sweetAlert";
import { GetPopularlityPercent } from "../../utils/GetPopularlityPercent";

// 모달 스타일
const ModalWrapper = styled.div`
  display: none;
  position: absolute;
  top: ${({ top }) => `${top}px`};
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 10;
  background-color: rgb(0, 0, 0, 0.6);
  &.active {
    justify-content: center;
    align-items: center;
    display: flex;
  }
`;

const ModalContentWrapper = styled.div`
  width: 800px;
  min-height: 600px;
  background-color: #EAF1FF;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  opacity: 1;
  padding: 30px;
`;

const ModalHeader = styled.div`
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid gray;
  text-align: right;
  padding: 8px 12px;
`;

const ModalCloseButton = styled.button`
  padding: 8px 10px;
  border: none;
  background-color: white;
  cursor: pointer;
`;

const ModalContent = styled.div`
  padding: 20px;
`;

// 프로필 스타일
const ProfileBlock = styled.div`
  line-height: 1;
  display: block;
  align-items: center;
  margin-bottom: 10px;
`;

const ProfileImageWrapper = styled.div`
  float: left;
  width: 60px;
  height: 60px;
  margin: 0px 20px 0px 20px;
`;

const ProfileImageThumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 100%;
  border: 3px solid white;
`;

const Nickname = styled.div`
  display: inline-block;
  display: block;
  margin-bottom: 4px;
  height: 30px;
  line-height: 30px;
  font-size: 20px;
  color: #000;
`;

const Popularity = styled.div`
  display: inline-block;
  display: flex;
  height: 30px;
  line-height: 30px;
  font-weight: bold;
  color: #000;
`;

// 모달 내부 스타일
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

const CalendarModal = ({ isOpen, close, calendarId }) => {

  const navigate = useNavigate();

  // 모달 위치 조정
  const [ScrollY, setModalLocation] = useState(0);
  
  const onHandleLocation = () => {
    setModalLocation(window.pageYOffset);
  }

  useEffect(()=> {
    const watch = () => {
      window.addEventListener("scroll", onHandleLocation);
    };
    onHandleLocation();
    watch();
    return () => {
      window.removeEventListener("scroll", onHandleLocation);
    }
  })

  // 사용자 정보 확인
  const user = useSelector((state) => state.user);

  // 글 정보를 담을 state 
  const [calendar, setCalendar] = useState({});

  // 글 정보를 가져오는 api요청
  const onCalendarDetail = async () => {
    const result = await client
      .get(`/calendar/${calendarId}`)
      .then((response) => response)
    return result
  }

  // 모달에 들어오면 바로 api 요청 보내기
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

  // 참가, 참가 취소 api 요청
  const onPost = async () => {
    if (calendar.participant === calendar.peopleLimit) {
      FailAlert('방 인원이 다 찼어요!')
    }
    const result = await client
      .post(`/calendar/join/${calendarId}`)
      .then((response) => response)
      SuccessAlert('참가신청이 완료되었습니다!')
      onHandleData()
    return result
  }

  const onDelete = async () => {
    await client
      .delete(`/calendar/join/${calendarId}`)
      SuccessAlert('취소되었습니다!')
      onHandleData()
  }

  // 일정 삭제 api 요청
  const onDeleteCalendar = async () => {
    await client
    .delete(`/calendar/${calendarId}`)
    SuccessAlert('게시글이 삭제되었습니다!')
    navigate(-1);
  }

  // 참가, 취소 버튼 누르면 바뀌기
  const onHandleParticipate = () => {
    setCalendar(calendar.isParticipate = !calendar.isParticipate)
  }

  const userId = calendar.createrId

  // 인기도 아이콘으로 변환
  const popularlityPercent = GetPopularlityPercent(calendar.createrPopularity);

  return (
    <ModalWrapper className={isOpen ? "active" : ""} top={ScrollY}>
      <ModalContentWrapper>
        <ModalHeader>
          <ModalCloseButton onClick={close}>X</ModalCloseButton>
        </ModalHeader>
        <ModalContent>
          <ProfileBlock>
            <ProfileImageWrapper>
              <ProfileImageThumbnail src={`/assets/profileImage/profile${calendar.createrImg}.png`} onClick={()=>navigate("/profile")}/>
            </ProfileImageWrapper>
            <Nickname>{calendar.createrNickname}</Nickname>
            <Popularity>
              인기도 {calendar.createrPopularity}° 
              <img
                style={{ width: "30px", height: "30px", marginLeft: "20px" }}
                src={
                  process.env.PUBLIC_URL +
                  `/assets/alcoholImage/${popularlityPercent}.png`
                }
              />
            </Popularity>
          </ProfileBlock>
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
              user.data.userId === calendar.createrId ?
              <>
              <StyledButton onClick={() => navigate(`/calendar/${calendar.calendarId}/edit`)}>수정하기</StyledButton>/
              <StyledButton onClick={onDeleteCalendar}>삭제하기</StyledButton>
              </> : (calendar.isParticipate === true ?
              <StyledButton onClick={ () => {onDelete(), onHandleParticipate()} }>취소</StyledButton> : 
              <StyledButton onClick={ () => {onPost(), onHandleParticipate()} }>참가</StyledButton>)
            }
          </>
        </ModalContent>
      </ModalContentWrapper>
    </ModalWrapper>
  );
};

export default CalendarModal;