import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { client } from "../../utils/client"
import { useNavigate } from "react-router-dom";
import { FailAlert, SuccessAlert } from "../../utils/sweetAlert";
import { GetPopularlityPercent } from "../../utils/GetPopularlityPercent";
import moment from "moment";
import Modal from "../modals/Modal";
import UserProfileContent from "../modals/contents/UserProfileContent";

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
  min-height: 500px;
  background-color: #EAF1FF;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  opacity: 1;
  padding: 30px;
  box-shadow: inset 0px 0px 4px 4px #BDCFF2;
`;

const ModalHeader = styled.div`
  width: 100%;
  box-sizing: border-box;
  text-align: right;
`;

const ModalCloseButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 20px;
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
const InnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 700px;
`

const ContentBlock = styled.div`
  display: flex;
  background-color: white;
  border: 2px solid #6F92BF;
  margin: 24px 0px 10px 60px;
  border-radius: 20px;
  height: 80px;
  width: 680px;
  padding: 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`

const PlaceBlock = styled.div`
  display: flex;
  background-color: white;
  border: 2px solid #6F92BF;
  margin: 12px 0px 10px 20px;
  border-radius: 20px;
  height: 40px;
  width: 200px;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`

const TImeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 700px;
`

const TimeBlock = styled.div`
  display: flex;
  background-color: white;
  border: 2px solid #6F92BF;
  margin: 12px 0px 10px 20px;
  border-radius: 20px;
  height: 40px;
  width: 200px;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`

const LetterBlock = styled.p`
  display: flex;
  margin: 12px 0px 0px 20px;
`

const AgeBlock = styled.div`
  display: flex;
  width: 700px;
  align-items: center;
  justify-content: center;
`

const AgeLetter = styled.div`
  display: flex;
  background-color: white;
  border: 2px solid #6F92BF;
  margin: 12px 0px 10px 20px;
  border-radius: 20px;
  height: 40px;
  align-items: center;
  justify-content: center;
  padding: 0px 30px 0px 30px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`

const ParticipantBlock = styled.div`
  display: flex;
  width: 60px;
  height: 60px;
  border-radius: 100px;
  justify-content: center;
  align-items: center;
  background: #FFFFFF;
  border: 2px solid #6F92BF;
  margin: 12px 0px 10px 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`

const Button = styled.button `
  float: right;
  margin-right: 2%;
  background-color: white;
  color: #676775;
  width: 100px;
  height: 40px;
  font-size: 16px;
  border: 2px solid #6F92BF;
  border-radius: 20px;
  box-shadow: 0px 4px 6px rgba(0,0,0,0.25);
  cursor: pointer;
`

const CalendarModal = ({ isOpen, close, calendarId }) => {

  // 프로필 모달용 STATE
  const [modalState, setModalState] = useState(false);

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
    setAgeState(result.data.ages);
    return calendar, ageState
  }

  const [ageState, setAgeState] = useState([]);

  // 나이대 값 ~대 로 변경
  const rendering = () => {
    const result = [];
    for (let i = 0; i < 6; i++) {
      if (ageState[i] === 'Y') {
        result.push(
        <AgeLetter key={i}>
          {i+2 + '0대'}
        </AgeLetter>
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

  // 인기도 아이콘으로 변환
  const popularlityPercent = GetPopularlityPercent(calendar.createrPopularity);
  
  const day = moment(calendar.time).format('YYYY.MM.DD')
  const time = moment(calendar.time).format('hh:mm')
  
  // 프로필 모달
  const openModal = () => {
    setModalState(true);
  };
  
  const closeModal = () => {
    setModalState(false);
  };
  
  return (
    <>
    {calendar.createrId !== undefined ? (<><Modal
      width={"800px"}
      height={"600px"}
      isOpen={modalState}
      closeModal={closeModal}
      modalContent={
        <UserProfileContent userId={calendar.createrId} close={closeModal} />
      }
    /></>):(<></>)}
    <ModalWrapper className={isOpen ? "active" : ""} top={ScrollY}>
      <ModalContentWrapper>
        <ModalHeader>
          <ModalCloseButton onClick={close}>
          <i className="fas fa-times"></i>
          </ModalCloseButton>
        </ModalHeader>
        <ModalContent>
          <ProfileBlock>
            <ProfileImageWrapper>
              <ProfileImageThumbnail src={`/assets/profileImage/profile${calendar.createrImg}.png`} onClick={()=> {openModal(), close()}} />
            </ProfileImageWrapper>
              <>
                {
                  user.data.userId === calendar.createrId ?
                  <>
                  <Button onClick={() => navigate(`/calendar/${calendar.calendarId}/edit`)}>수정하기</Button>
                  <Button onClick={onDeleteCalendar}>삭제하기</Button>
                  </> : (calendar.isParticipate === true ?
                  <Button onClick={ () => {onDelete(), onHandleParticipate()} }>취소</Button> : 
                  <Button onClick={ () => {onPost(), onHandleParticipate()} }>참가</Button>)
                }
              </>
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
          <InnerWrapper>
          <ContentBlock>
            {calendar.calendarContent}
          </ContentBlock>
          <TImeWrapper>
            <PlaceBlock>
              {calendar.place}
            </PlaceBlock>
            <LetterBlock>
              에서
            </LetterBlock>
          </TImeWrapper>
          <TImeWrapper>
            <TimeBlock>
              {day}
            </TimeBlock>
            <TimeBlock>
              {time}
            </TimeBlock>
            <LetterBlock>
              에 만나요
            </LetterBlock>
          </TImeWrapper>
          { rendering().length === 0 ? 
          <AgeLetter>
            아무나 다 참여할 수 있어요
          </AgeLetter> : 
          <AgeBlock>
            {rendering()}
          </AgeBlock>
          }
          <ParticipantBlock>
            {calendar.participant} / {calendar.peopleLimit}
          </ParticipantBlock>
          </InnerWrapper>
      
        </ModalContent>
      </ModalContentWrapper>
    </ModalWrapper>
    </>
  );
};

export default CalendarModal;