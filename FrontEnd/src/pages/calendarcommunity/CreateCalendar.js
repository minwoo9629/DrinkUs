import { useState } from "react";
import styled from "styled-components";
import Header from "../../components/layout/Header";
import FetchProfile from "../../components/room/FetchProfile";
import { Wrapper } from "../../components/styled/Wrapper";
import { client } from "../../utils/client";
import moment from "moment";
import { FailAlert, SuccessAlert } from "../../utils/sweetAlert";
import { useNavigate } from "react-router-dom";

const CreateButton = styled.button `
  color: #6f92bf;
  width: 80px;
  height: 30px;
`

const InputForm = styled.input`
  background-color: white;
  width: 800px;
  height: 100px;
`

const DateInputForm = styled.input`
  background-color: white;
  width: 200px;
  height: 50px;
`

const CheckBoxForm = styled.input`
  background-color: white;
  width: 30px;
  height: 30px;
`

const SelectBox = styled.select`
 width: 200px;
 background-color: white;
 border: 3px solid #BDCFF2;
 height: 56px;
 border-radius: 20px;
 font-size: 16px;
`

const StyledAmountWrapper = styled.div`
  background-color: gray;
  width: 50px;
  height: 50px;
  border: 1px solid #6f92bf;
  border-radius: 100%;
  margin: 0px 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`

const StyledButton = styled.button`
  border: none;
  background-color: white;
  font-size: 16px;
  cursor: pointer;
`

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
`

const CreateCalendar = () => {

  const navigate = useNavigate();

  const [calendarInfo, setCalendarInfo] = useState({
    calendarContent: '',
    peopleLimit: 2,
    place: '술집',
  });

  const onCalendarInfoInput = (e) => {
    setCalendarInfo({...calendarInfo, [e.target.name]: e.target.value} )
  };

  const onCalendarInfoSubmit = (e) => {
    e.preventDefault();
    // 내용 유효 체크
    if (calendarInfo.calendarContent.length === 0) {
      alert(`방 설명을 써 주세요. '${calendarInfo.place}에서 만날 사람~' 은 어때요?`);
      return;
    }

    if (dateState.year + dateState.month + dateState.day + dateState.hour + dateState.minute <= moment().format('YYYYMMDDHHmm')) {
      alert('이미 지나간 시간을 입력하셨어요!')
      return;
    }

    client
      .post("calendar", {
        calendarContent: calendarInfo.calendarContent,
        calendarDatetime: dateState.year + dateState.month + dateState.day + dateState.hour + dateState.minute,
        peopleLimit: calendarInfo.peopleLimit,
        place: calendarInfo.place,
        ages: ageCheckedItems,
      })
      .then(function (response) {
        SuccessAlert('글쓰기 성공!')
        // 상세 페이지 read 만들면 그쪽으로 이동하기
        navigate("/");
      })
      .catch(function (error) {
        FailAlert(`시간 형식을 맞춰주세요!
        ex) ${moment().format('YYYY')}년${moment().format('MM')}월${moment().format('DD')}일${moment().format('HH')}시${moment().format('mm')}분`)
      })
  };

  // Age 관련 체크 로직
  const [ageCheckedItems, setAgeCheckedItems] = useState(['N','N','N','N','N','N']);

  const onCheckedAgeItemHandler = (id, isChecked) => {
    const newageCheckedItems = [...ageCheckedItems];
    newageCheckedItems[id] = (isChecked? 'Y':'N');
    setAgeCheckedItems([...newageCheckedItems]);
  }

  const [CheckedAges, setIsCheckedAges] = useState(false);
  

  const onAgeCheckbox = ({target}) => {
    setIsCheckedAges(!CheckedAges);
    onCheckedAgeItemHandler(target.id, target.checked)
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
    year: '',
    month: '',
    day: '',
    hour: '',
    minute: ''
  });

  const onDaterInfoInput = (e) => {
    setDateState({...dateState, [e.target.name]: e.target.value})
  };

  return (
    <>
      <Header/>
      <Wrapper color={'#fff'}>
        <div>
          <FetchProfile/>
          <div>
            <InputForm
              type="text"
              value={calendarInfo.calendarContent}
              name="calendarContent"
              placeholder="방 설명을 써주세요"
              onChange={onCalendarInfoInput}
              required>
            </InputForm>
          </div>
          <div>
            <DateInputForm
              value={dateState.year}
              name="year"
              placeholder="ex)2022"
              onChange={onDaterInfoInput}
              required>
            </DateInputForm>년
            <DateInputForm
              value={dateState.month}
              name="month"
              placeholder="ex)08"
              onChange={onDaterInfoInput}
              required>
            </DateInputForm>월
            <DateInputForm
              value={dateState.day}
              name="day"
              placeholder="ex)09"
              onChange={onDaterInfoInput}
              required>
            </DateInputForm>일
          </div>
          <div>
            <DateInputForm
              value={dateState.hour}
              name="hour"
              placeholder="ex)22"
              onChange={onDaterInfoInput}
              required>
            </DateInputForm>시
            <DateInputForm
              value={dateState.minute}
              name="minute"
              placeholder="ex)30"
              onChange={onDaterInfoInput}
              required>
            </DateInputForm>분
          </div>
          <div>
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
              {/* <option>야구장</option>
              <option>축구장</option>
              <option>페스티벌</option>
              <option>클럽</option>
              <option>엘리니아</option>
              <option>편의점</option>
              <option>한강공원</option>
              <option>미술관</option>
              <option>영화관</option>
              <option>협곡</option>
              <option>독서실</option> */}
            </SelectBox>
            에서 만나요!
          </div>
          <div>
            20대
            <CheckBoxForm
              type="checkbox"
              id = "0"
              name="ages"
              onChange={onAgeCheckbox}
            />
            30대
            <CheckBoxForm
              type="checkbox"
              id = "1"
              name="ages"
              onChange={onAgeCheckbox}
            />
            40대
            <CheckBoxForm
              type="checkbox"
              id = "2"
              name="ages"
              onChange={onAgeCheckbox}
            />
            50대
            <CheckBoxForm
              type="checkbox"
              id = "3"
              name="ages"
              onChange={onAgeCheckbox}
            />
            60대
            <CheckBoxForm
              type="checkbox"
              id = "4"
              name="ages"
              onChange={onAgeCheckbox}
            />
            70대 이상
            <CheckBoxForm
              type="checkbox"
              id = "5"
              name="ages"
              onChange={onAgeCheckbox}
            />
          </div>
          <div>
            <RowWrapper>
            <StyledButton onClick={() => onHandleDecrease("peopleLimit")}>
              <i className="fas fa-minus"></i>
            </StyledButton>
            <StyledAmountWrapper>{calendarInfo.peopleLimit}</StyledAmountWrapper>
            <StyledButton onClick={() => onHandleIncrease("peopleLimit")}>
                <i className="fas fa-plus"></i>
            </StyledButton>
            </RowWrapper>
            {/* <InputForm
              type="integer"
              value={calendarInfo.peopleLimit}
              name="peopleLimit"
              placeholder="최대인원을 입력하세요."
              onChange={onCalendarInfoInput}
              required
            >
            </InputForm> */}
          </div>
          <div>
            <CreateButton
              onClick={onCalendarInfoSubmit}
            >
              생성하기
            </CreateButton>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default CreateCalendar