import { useState } from "react";
import styled from "styled-components";
import FetchProfile from "../../../components/room/FetchProfile";
import { client } from "../../../utils/client";
import moment from "moment";
import { FailAlert, SuccessAlert } from "../../../utils/sweetAlert";
import ModalCloseButton from "../../../components/common/buttons/ModalCloseButton";

const CreateCalendarBlock = styled.div`
  margin: auto 100px;
  color: black;
`;

const CreateHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const InputBlock = styled.div`
  display: block;
  margin: auto;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 60px;
  margin: auto;
  width: 90%;
`;

const InputLeftWrap = styled.div`
  float: left;
  margin-left: 2%;
  width: 18%;
  height: 30px;
  line-height: 30px;
  padding: 17px 0;
  font-size: 18px;
  text-align: left;
`;

const InputRightWrap = styled.div`
  justify-content: center;
  align-items: center;
  margin: auto;
  width: 100%;
  height: 30px;
`;

const CreateButton = styled.button`
  float: right;
  margin-right: 4%;
  background-color: #eaf1ff;
  color: #676775;
  width: 120px;
  height: 50px;
  font-size: 20px;
  font-weight: bold;
  border: 4px solid #bdcff2;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;

const InputForm = styled.input`
  background-color: white;
  width: 90%;
  height: 30px;
  line-height: 30px;
  border: 1px solid #bdcff2;
  border-radius: 10px;
  padding: 20px;
  margin:  20px 0;
`;

const InputDateBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
  width: 90%;
  height: 60px;
`;

const DateInput = styled.div`
  margin-left: ${({ ml }) => ml};
  margin-right: 4px;
  background-color: white;
  padding: 0 50px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #676775;
  border-radius: 10px;
  text-align: center;
`;

const DateInputForm = styled.input`
  margin-left: ${({ ml }) => ml};
  margin-right: 4px;
  background-color: white;
  width: 15%;
  height: 30px;
  line-height: 30px;
  border: 1px solid #bdcff2;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  text-align: center;
`;

const SelectBox = styled.select`
  width: 200px;
  background-color: white;
  border: 3px solid #bdcff2;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  height: 36px;
  border-radius: 20px;
  font-size: 16px;
  margin: auto 10px;
  text-align: center;
`;

const InputAgesBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const AgesWrapper = styled.div`
  display: inline-block;
  height: 28px;
  width: 12%;
  color: black;
  margin: auto;
  background-color: #ffffff;
  border: 1px solid #bdcff2;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  text-align: center;
  overflow: hidden;

  & input:checked + span {
    background-color: #bdcff2;
    border: 1px solid #bdcff2;
  }
  & span {
    cursor: pointer;
    display: block;
    padding: 2px 16px;
  }
`;

const CheckBoxStyled = styled.input`
  display: none;
  cursor: pointer;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin: 20px;
`
const SelectBoxBlock = styled.div`
  width: 70%;
`

const PeopleLimitWrapper = styled.div`
  display: flex;
  width: 30%;
  color: #000000;
  text-align: center;
  align-items: center;
  justify-content: center;
`;

const StyledAmountWrapper = styled.div`
  width: 50px;
  height: 50px;
  border: 3px solid #bdcff2;
  border-radius: 50%;
  font-size: 16px;
  margin: 0px 18px;
  background-color: white;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

const StyledMinusButton = styled.button`
  border: none;
  background-color: transparent;
  font-size: 16px;
  color: white;
  cursor: pointer;
`;

const StyledPlusButton = styled.button`
  border: none;
  background-color: transparent;
  font-size: 16px;
  color: white;
  cursor: pointer;
  margin-right: 10px;
`;

const CreateCalendar = ({ calendarDate, close, successHandler }) => {
  const [calendarInfo, setCalendarInfo] = useState({
    calendarContent: "",
    peopleLimit: 2,
    place: "술집",
  });

  const onCalendarInfoInput = (e) => {
    setCalendarInfo({ ...calendarInfo, [e.target.name]: e.target.value });
  };

  const onCalendarInfoSubmit = (e) => {
    e.preventDefault();

    // 방 설명 유효성 체크
    if (calendarInfo.calendarContent.length === 0) {
      alert(
        `방 설명을 써 주세요. '${calendarInfo.place}에서 만날 사람~' 은 어때요?`,
      );
      return;
    }

    client
      .post("calendar", {
        calendarContent: calendarInfo.calendarContent,
        calendarDatetime:
          calendarDate.y +
          (calendarDate.m < 10 ? "0" + calendarDate.m : calendarDate.m) +
          (calendarDate.d < 10 ? "0" + calendarDate.d : calendarDate.d) +
          (dateState.hour < 10 ? "0" + dateState.hour : dateState.hour) +
          (dateState.minute < 10 ? "0" + dateState.minute : dateState.minute),
        peopleLimit: calendarInfo.peopleLimit,
        place: calendarInfo.place,
        ages: ageCheckedItems,
      })
      .then(function (response) {
        SuccessAlert("글쓰기 성공!");
        successHandler();
        close();
      })
      .catch(function (error) {
        console.log("0" + calendarDate.m);
        console.log("error: ", error);
        FailAlert("실패!");
      });
  };

  // Age 관련 체크 로직
  const [ageCheckedItems, setAgeCheckedItems] = useState([
    "N",
    "N",
    "N",
    "N",
    "N",
    "N",
  ]);

  const onCheckedAgeItemHandler = (id, isChecked) => {
    const newageCheckedItems = [...ageCheckedItems];
    newageCheckedItems[id] = isChecked ? "Y" : "N";
    setAgeCheckedItems([...newageCheckedItems]);
  };

  const [CheckedAges, setIsCheckedAges] = useState(false);

  const onAgeCheckbox = ({ target }) => {
    setIsCheckedAges(!CheckedAges);
    onCheckedAgeItemHandler(target.id, target.checked);
  };

  // 인원 플러스 마이너스 버튼
  const onHandleIncrease = (type) => {
    const amount = calendarInfo[type] + 1 > 8 ? 8 : calendarInfo[type] + 1;
    setCalendarInfo({ ...calendarInfo, [type]: amount });
  };

  const onHandleDecrease = (type) => {
    const amount = calendarInfo[type] - 1 < 2 ? 2 : calendarInfo[type] - 1;
    setCalendarInfo({ ...calendarInfo, [type]: amount });
  };

  // 날짜 형식
  const [dateState, setDateState] = useState({
    year: "",
    month: "",
    day: "",
    hour: "",
    minute: "",
  });

  const onDaterInfoInput = (e) => {
    setDateState({ ...dateState, [e.target.name]: e.target.value });
  };

  return (
    <>
      <CreateCalendarBlock>
        <ModalCloseButton close={close} />
        {/* 프로필 + 생성버튼 부분 */}
        <CreateHeader>
          <FetchProfile />
          <CreateButton onClick={onCalendarInfoSubmit}>생성하기</CreateButton>
        </CreateHeader>
        {/* 방 설명 */}
        <InputForm
          type="text"
          value={calendarInfo.calendarContent}
          name="calendarContent"
          placeholder="방 설명을 써주세요"
          onChange={onCalendarInfoInput}
          required
        ></InputForm>
        {/* 연령대 선택 */}
        <InputAgesBlock>
          <AgesWrapper>
            <label>
              <CheckBoxStyled
                type="checkbox"
                id="0"
                name="ages"
                value={CheckedAges.roomage}
                onChange={onAgeCheckbox}
              />
              <span>20대</span>
            </label>
          </AgesWrapper>
          <AgesWrapper>
            <label>
              <CheckBoxStyled
                type="checkbox"
                id="1"
                name="ages"
                onChange={onAgeCheckbox}
              />
              <span>30대</span>
            </label>
          </AgesWrapper>
          <AgesWrapper>
            <label>
              <CheckBoxStyled
                type="checkbox"
                id="2"
                name="ages"
                onChange={onAgeCheckbox}
              />
              <span>40대</span>
            </label>
          </AgesWrapper>
          <AgesWrapper>
            <label>
              <CheckBoxStyled
                type="checkbox"
                id="3"
                name="ages"
                onChange={onAgeCheckbox}
              />
              <span>50대</span>
            </label>
          </AgesWrapper>
          <AgesWrapper>
            <label>
              <CheckBoxStyled
                type="checkbox"
                id="4"
                name="ages"
                onChange={onAgeCheckbox}
              />
              <span>60대</span>
            </label>
          </AgesWrapper>
          <AgesWrapper>
            <label>
              <CheckBoxStyled
                type="checkbox"
                id="5"
                name="ages"
                onChange={onAgeCheckbox}
              />
              <span>70대</span>
            </label>
          </AgesWrapper>
        </InputAgesBlock>
        {/* 일자 선택 */}
        <InputDateBlock>
          <DateInput>{calendarDate.y}년 {calendarDate.m}월 {calendarDate.d}일</DateInput>
          <DateInputForm
            type="number"
            ml={"20px"}
            value={dateState.hour}
            name="hour"
            placeholder="ex)22"
            onChange={onDaterInfoInput}
            required
          ></DateInputForm>
          시
          <DateInputForm
            type="number"
            ml={"20px"}
            value={dateState.minute}
            name="minute"
            placeholder="ex)30"
            onChange={onDaterInfoInput}
            required
          ></DateInputForm>
          분
        </InputDateBlock>
        {/* 장소 선택 */}
        <InputWrapper>
          <SelectBoxBlock>
            <SelectBox
              type="selectbox"
              value={calendarInfo.place}
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
          </SelectBoxBlock>
          {/* 인원수 선택 */}
          <PeopleLimitWrapper>
            <StyledMinusButton onClick={() => onHandleDecrease("peopleLimit")}>
              <i className="fas fa-minus"></i>
            </StyledMinusButton>
            <StyledAmountWrapper>
              {calendarInfo.peopleLimit}
            </StyledAmountWrapper>
            <StyledPlusButton onClick={() => onHandleIncrease("peopleLimit")}>
              <i className="fas fa-plus"></i>
            </StyledPlusButton>
            명
          </PeopleLimitWrapper>
        </InputWrapper>
      </CreateCalendarBlock>
    </>
  );
};

export default CreateCalendar;
