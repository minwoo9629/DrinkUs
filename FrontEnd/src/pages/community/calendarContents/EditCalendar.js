import { useState } from "react";
import styled from "styled-components";
import { client } from "../../../utils/client";
import { FailAlert, SuccessAlert, EmptyAlert } from "../../../utils/sweetAlert";
import ModalCloseButton from "../../../components/common/buttons/ModalCloseButton";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import UserProfile from "../../../components/room/UserProfile";
import { CommunityConFirmButton } from "../../../components/common/buttons/CommunityConfirmButton";

const DateText = styled.div`
  font-weight: bold;
  font-size: 14px;
  margin-left: 10px;
  text-align: left;
`;

const CreateCalendarBlock = styled.div``;

const CreateHeader = styled.div``;

const CheckBoxWrapper = styled.div`
  display: flex;
  float: right;
  margin: 3px 6px 15px 10px;
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
  clear: both;
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

const SelectBox = styled.select`
  margin: 0 10px;
  width: 100px;
  background-color: white;
  border: 2px solid #bdcff2;
  height: 33px;
  border-radius: 3px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;

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

const InputAgesBlock = styled.div`
  height: 30px;
  width: 97.5%;
  border: 3px solid #bdcff2;
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

  cursor: pointer;

  &:hover {
    transition: all 0.1s linear;
    color: ${(props) => props.hoverColor};
    background-color: ${(props) => props.hoverBackground};
  }
`;

const CheckBoxStyled = styled.input`
  display: none;
`;

const InputWrapper = styled.div`
  margin: 10px 0;
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
  font-size: 20px;
  font-weight: bold;
  line-height: 40px;
  background-color: white;
  color: #404040;
`;

const StyledMinusButton = styled.button`
  display: inline-block;
  border: none;
  background-color: transparent;
  font-size: 16px;
  color: #92a9d6;
  cursor: pointer;
  margin-right: 5px;
`;

const StyledPlusButton = styled.button`
  border: none;
  background-color: transparent;
  font-size: 16px;
  color: #92a9d6;
  cursor: pointer;
  margin-left: 5px;
`;

const AgeCheckBox = styled.input`
  margin-right: 3px;
`;

const CreateCalendar = ({ calendarId, content, close, successHandler }) => {
  const date = new Date(content.time);
  const user = useSelector((state) => state.user);
  const userAge = Math.floor(
    (new Date().getFullYear() - user.data.userBirthday.substring(0, 4) + 1) /
      10,
  );
  userAge >= 7 ? 7 : userAge;

  const [state, setState] = useState({
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
    peopleLimit: content.peopleLimit,
  });

  const [checkAllAges, setCheckAllAges] = useState(false);
  useEffect(() => {
    setState({
      ...state,
      ages: [
        checkAllAges ? "Y" : "N",
        checkAllAges ? "Y" : "N",
        checkAllAges ? "Y" : "N",
        checkAllAges ? "Y" : "N",
        checkAllAges ? "Y" : "N",
        checkAllAges ? "Y" : "N",
      ],
    });
  }, [checkAllAges]);

  const onCalendarInfoInput = (e) => {
    if (e.target.name == "hour" || e.target.name == "minute") {
      let onlyNumber = e.target.value.replace(/[^0-9]/g, "");
      onlyNumber = Math.max(
        0,
        Math.min(e.target.name == "hour" ? 23 : 59, onlyNumber),
      );
      setState({
        ...state,
        [e.target.name]: onlyNumber,
      });
      return;
    }

    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onCalendarInfoSubmit = (e) => {
    e.preventDefault();
    // 방 설명 유효성 체크
    if (!state.content.length) {
      alert(`방 설명을 써 주세요. '${state.place}에서 만날 사람~' 은 어때요?`);
      return;
    }

    for (let i = 0; i < state.ages.length; i++) {
      if (state.ages[i] == "Y") {
        break;
      }
      if (i == state.ages.length - 1) {
        alert("최소 한 개 이상의 나이대를 선택해주세요!");
        return;
      }
    }
    client
      .put(`calendar/${calendarId}`, {
        calendarContent: state.content,
        calendarDatetime:
          state.date.year +
          (state.date.month < 10 ? "0" + state.date.month : state.date.month) +
          (state.date.day < 10 ? "0" + state.date.day : state.date.day) +
          (state.hour < 10 ? "0" + state.hour : state.hour) +
          (state.minute < 10 ? "0" + state.minute : state.minute),
        peopleLimit: state.peopleLimit,
        place: state.place,
        ages: state.ages,
      })
      .then(function () {
        SuccessAlert("수정 성공!");
        successHandler();
        close();
      })
      .catch(function (error) {
        console.log("error: ", error);
        FailAlert("실패!");
      });
  };

  const onAgeCheckbox = (id) => {
    console.log(state);
    const tmpAge = state.ages;
    tmpAge[id] = state.ages[id] == "Y" ? "N" : "Y";
    setState({
      ...state,
      ages: tmpAge,
    });
  };

  // 인원 플러스 마이너스 버튼
  const onHandleIncrease = () => {
    const amount = state.peopleLimit + 1 > 8 ? 8 : state.peopleLimit + 1;
    setState({ ...state, peopleLimit: amount });
  };

  const onHandleDecrease = () => {
    const amount = state.peopleLimit - 1 < 2 ? 2 : state.peopleLimit - 1;
    setState({ ...state, peopleLimit: amount });
  };

  return (
    <>
      <CreateCalendarBlock>
        <ModalCloseButton
          close={() => {
            close();
          }}
        />
        {/* 프로필 + 생성버튼 부분 */}
        <CreateHeader>
          <UserProfile />
        </CreateHeader>
        {/* 방 설명 */}
        <InputForm
          type="text"
          value={state.content}
          name="content"
          placeholder="일정에 대한 설명을 입력하세요."
          onChange={onCalendarInfoInput}
          required
        />
        {/* 연령대 선택 */}
        <InputAgesBlock>
          {state.ages.map((item, index) => {
            return (
              <>
                <AgesWrapper
                  borderColor={index % 5 == 0 ? "none" : "#bdcff2"}
                  background={item == "Y" ? "#ebf1ff" : "#white"}
                  hoverBackground={item == "Y" ? "none" : "#ebf1ff"}
                  color="#3b3b3b"
                  onClick={() => {
                    onAgeCheckbox(index);
                  }}
                >
                  <label>
                    <CheckBoxStyled
                      type="checkbox"
                      id={index}
                      name="ages"
                      value={state.ages}
                      onChange={() => {
                        onAgeCheckbox(index);
                      }}
                    />
                  </label>
                  {index + 2}0대
                </AgesWrapper>
              </>
            );
          })}
        </InputAgesBlock>
        <CheckBoxWrapper>
          <AgeCheckBox
            type="checkbox"
            checked={checkAllAges}
            onChange={() => {
              setCheckAllAges(!checkAllAges);
            }}
          />
          {checkAllAges ? "전부해제" : "전부선택"}
        </CheckBoxWrapper>
        {/* 일자 선택 */}
        <InputDateBlock>
          <DateText>
            {state.date.year}년 {state.date.month}월 {state.date.day}일
          </DateText>
          <DateInputForm
            value={state.hour}
            name="hour"
            placeholder="00"
            onChange={onCalendarInfoInput}
            pattern={"[0-9]+"}
            required
          />
          시
          <DateInputForm
            value={state.minute}
            name="minute"
            placeholder="00"
            onChange={onCalendarInfoInput}
            required
          />
          분에
          <SelectBox
            type="selectbox"
            value={state.place}
            name="place"
            onChange={onCalendarInfoInput}
            required
          >
            <option>술집</option>
            <option>펍</option>
            <option>칵테일바</option>
            <option>야구장</option>
            <option>축구장</option>
            <option>페스티벌</option>
            <option>클럽</option>
            <option>편의점</option>
            <option>한강공원</option>
            <option>미술관</option>
            <option>영화관</option>
            <option>도서관</option>
          </SelectBox>
          에서 만나요!
        </InputDateBlock>
        {/* 장소 선택 */}
        <InputWrapper>
          {/* 인원수 선택 */}
          <PeopleLimitWrapper>
            <div>인원</div>
            <StyledMinusButton onClick={() => onHandleDecrease("peopleLimit")}>
              <i className="fas fa-minus"></i>
            </StyledMinusButton>
            <StyledAmountWrapper>{state.peopleLimit}</StyledAmountWrapper>
            <StyledPlusButton onClick={() => onHandleIncrease("peopleLimit")}>
              <i className="fas fa-plus"></i>
            </StyledPlusButton>
          </PeopleLimitWrapper>
        </InputWrapper>
        <CommunityConFirmButton
          marginRight="0"
          event={onCalendarInfoSubmit}
          content="수정"
        />
      </CreateCalendarBlock>
    </>
  );
};

export default CreateCalendar;
