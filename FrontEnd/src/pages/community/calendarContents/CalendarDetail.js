import { useEffect, useState } from "react";
import styled from "styled-components";
import ModalCloseButton from "../../../components/common/buttons/ModalCloseButton";
import UserProfile from "../../../components/room/UserProfile";
import { CommunityConFirmButton } from "../../../components/common/buttons/CommunityConfirmButton";
import { useSelector } from "react-redux";
import { client } from "../../../utils/client";
import { FailAlert, SuccessAlert } from "../../../utils/sweetAlert";

const CalendarButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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

const DateText = styled.div`
  margin-top: 40px;
  font-weight: bold;
  font-size: 14px;
  margin-left: 15%;
  text-align: left;
`;

const CreateCalendarBlock = styled.div`
  width: 85%;
  padding: 20px 0;
`;

const CreateHeader = styled.div``;

const CheckBoxWrapper = styled.div`
  display: flex;
  float: right;
  margin: 5px 10px 15px 10px;
  font-size: 11px;
  font-weight: bold;
`;

const InputForm = styled.textarea`
  background-color: white;
  width: 90%;
  height: 80px;
  line-height: 30px;
  border: 1px solid #bdcff2;
  border-radius: 5px;
  padding: 10px 15px;
  margin: 20px 0;
  outline: none;
  font-size: 14px;

  &::placeholder {
    font-size: 14px;
    color: #b1b1b1;
  }

  &:focus {
    box-shadow: 0px 0px 5px #5983ff;
  }

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: #80a8d1;
  }
`;

const InputDateBlock = styled.div`
  width: 100%;
  height: 60px;
`;

const DateInputForm = styled.input`
  width: 40px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #bdcff2;
  border-radius: 8px;
  text-align: center;

  margin-left: 5px;
  margin-right: 3px;

  outline: none;
  font-size: 14px;

  &::placeholder {
    font-size: 14px;
    color: #b1b1b1;
  }

  &:focus {
    box-shadow: 0px 0px 2px #5983ff;
  }
`;

const SelectBox = styled.div`
  display: inline-block;
  margin: 0 10px;
  width: 120px;
  background-color: white;
  border: 2px solid #bdcff2;
  height: 20px;
  border-radius: 3px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  padding: 4px 0;
`;

const InputAgesBlock = styled.div`
  height: 30px;
  width: 97.5%;
  border: 3px solid #8eace8;
  border-radius: 3px;
  border-collapse: collapse;
`;

const AgesWrapper = styled.div`
  display: table-cell;
  color: ${(props) => props.color};
  height: 27px;
  padding-top: 3px;

  background-color: ${(props) => props.background};
  border-left: 1px solid ${(props) => props.borderColor};
  border-right: 1px solid ${(props) => props.borderColor};
  text-align: center;

  width: 4.4%;
  font-size: 14px;
  font-weight: bold;
`;

const InputWrapper = styled.div`
  margin: 20px 0 30px 0;
`;

const PeopleLimitWrapper = styled.div`
  font-size: 10px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const StyledAmountWrapper = styled.div`
  display: inline-block;
  width: 40px;
  height: 40px;
  border: 3px solid #bdcff2;
  border-radius: 50%;
  font-size: 15px;
  font-weight: bold;
  line-height: 40px;
  background-color: white;
  color: ${(props) => props.color || "#404040"};
`;

const CalendarDetail = ({
  content,
  close,
  successHandler,
  setModalType,
  modalType,
}) => {
  // 사용자 정보 확인
  const user = useSelector((state) => state.user);
  const date = new Date(content.time);
  const propsUser = {
    data: {
      userPopularity: content.createrPopularity,
      userImg: content.createrImg,
      userNickname: content.createrNickname,
    },
  };

  const [state, setState] = useState({
    calendarId: content.calendarId,
    createrId: content.createrId,
    content: content.calendarContent,
    ages: content.ages,
    date: {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    },
    hour: date.getHours(),
    minute: date.getMinutes(),
    place: content.place,
    participant: content.participant,
    peopleLimit: content.peopleLimit,
    isParticipate: content.isParticipate,
  });

  // 참가, 참가 취소 api 요청
  const onPost = async () => {
    if (state.participant === state.peopleLimit) {
      FailAlert("방 인원이 다 찼어요!");
      modalType == "show" ? setModalType("none") : setModalType("show");
      close();
    }
    const result = await client
      .post(`/calendar/join/${state.calendarId}`)
      .then(() => {
        SuccessAlert("참가신청이 완료되었습니다!");
        modalType == "show" ? setModalType("none") : setModalType("show");
        successHandler();
        close();
      })
      .catch((e) => {
        FailAlert("일정 참가에 실패하였습니다!");
        modalType == "show" ? setModalType("none") : setModalType("show");
        close();
        console.log(e);
      });
  };

  const onDelete = async () => {
    await client
      .delete(`/calendar/join/${state.calendarId}`)
      .then(() => {
        SuccessAlert("취소되었습니다!");
        successHandler();
        modalType == "show" ? setModalType("none") : setModalType("show");
        close();
      })
      .catch((e) => {
        FailAlert("취소에 실패하였습니다!");
        close();
        modalType == "show" ? setModalType("none") : setModalType("show");
        console.log(e);
      });
  };

  // 일정 삭제 api 요청
  const onDeleteCalendar = async () => {
    await client
      .delete(`/calendar/${state.calendarId}`)
      .then(() => SuccessAlert("게시글이 삭제되었습니다!"))
      .catch((error) => console.log(error));
    modalType == "show" ? setModalType("none") : setModalType("show");
    close();
    successHandler();
  };

  // 참가, 취소 버튼 누르면 바뀌기
  const onHandleParticipate = () => {
    setState({ ...state, isParticipate: !state.isParticipate });
  };

  const rendering = () => {
    console.log(user.data.userId + " " + state.createrId);
    if (user.data.userId == state.createrId) {
      return (
        <>
          <CommunityConFirmButton
            event={() => {
              setModalType("edit");
            }}
            content="수정하기"
          />
          <CommunityConFirmButton
            background="white"
            color="#bdcff2"
            event={onDeleteCalendar}
            content="삭제하기"
            hoverColor="white"
            hoverBackground="#f06c6c"
            hoverBorderColor="#f06c6c"
          />
        </>
      );
    }
    if (date < new Date() || state.participant >= state.peopleLimit) {
      if (user.data.userId == state.createrId) {
        return (
          <CommunityConFirmButton
            background="white"
            color="#bdcff2"
            event={onDeleteCalendar}
            content="삭제하기"
            hoverColor="white"
            hoverBackground="#f06c6c"
            hoverBorderColor="#f06c6c"
          />
        );
      } else {
        return (
          <CommunityConFirmButton
            marginRight="0"
            color="white"
            background="#b5b5b5"
            content="참여불가"
            borderColor="#b5b5b5"
            hoverBackground="#b5b5b5"
            hoverBorderColor="#b5b5b5"
            cursor=""
          />
        );
      }
    }

    if (state.isParticipate) {
      return (
        <CommunityConFirmButton
          event={() => {
            onDelete();
            onHandleParticipate();
          }}
          marginRight="0"
          content="취소"
        />
      );
    } else {
      return (
        <CommunityConFirmButton
          event={() => {
            onPost();
            onHandleParticipate();
          }}
          marginRight="0"
          content="참가"
        />
      );
    }
  };

  return (
    <>
      <CreateCalendarBlock>
        <ModalCloseButton
          close={() => {
            close();
          }}
          e6fff6
        />
        <CreateHeader>
          <UserProfile user={propsUser} />
        </CreateHeader>
        <InputForm type="text" value={state.content} name="content" disabled />
        <InputAgesBlock>
          {state.ages.map((item, index) => {
            return (
              <>
                <AgesWrapper
                  borderColor={index % 5 == 0 ? "none" : "#bdcff2"}
                  background={item == "Y" ? "#d0dbf2" : "white"}
                  hoverBackground={item == "Y" ? "none" : "#ebf1ff"}
                  color="#3b3b3b"
                >
                  {index + 2}0대
                </AgesWrapper>
              </>
            );
          })}
        </InputAgesBlock>
        <CheckBoxWrapper></CheckBoxWrapper>
        <InputDateBlock>
          <DateText>
            {state.date.year}년 {state.date.month}월 {state.date.day}일
          </DateText>
          <DateInputForm value={state.hour} disabled />
          시
          <DateInputForm value={state.minute} disabled />
          분에
          <SelectBox>{state.place}</SelectBox>
          에서 만나요!
        </InputDateBlock>
        {/* 장소 선택 */}
        <InputWrapper>
          {/* 인원수 선택 */}
          <PeopleLimitWrapper>
            <div>인원</div>
            <StyledAmountWrapper
              color={content.participant >= state.peopleLimit ? "#e64c4c" : ""}
            >
              {content.participant}/{state.peopleLimit}
            </StyledAmountWrapper>
          </PeopleLimitWrapper>
        </InputWrapper>

        <CalendarButtonWrapper>
          <>{rendering()}</>
        </CalendarButtonWrapper>
      </CreateCalendarBlock>
    </>
  );
};

export default CalendarDetail;
