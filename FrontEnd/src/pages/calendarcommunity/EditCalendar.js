import { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/layout/Header";
import FetchProfile from "../../components/room/FetchProfile";
import { Wrapper } from "../../components/styled/Wrapper";
import { client } from "../../utils/client";
import moment from "moment";
import { FailAlert, SuccessAlert } from "../../utils/sweetAlert";
import { useNavigate } from "react-router-dom";

// 스타일
const CreateCalendarBlock = styled.div`
  width: 800px;
  margin-bottom: 20px;
  color: white;
  background-color: #6F92BF;
  border-radius: 30px;
  padding: 30px;
`

const InputBlock = styled.div`
  display: block;
  line-height: 1;
  margin-top: 5px;
  margin-bottom: 5px;
  height: 60px;
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
  float: left;
  width: 80%;
  height: 30px;
  line-height: 30px;
  padding: 17px 0;
`;

const CreateButton = styled.button `
  float: right;
  margin-right: 4%;
  background-color: #EAF1FF;
  color: #676775;
  width: 120px;
  height: 50px;
  font-size: 20px;
  font-weight: bold;
  border: 4px solid #BDCFF2;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0,0,0,0.25);
`

const InputForm = styled.input`
  background-color: white;
  width: 95%;
  height: 30px;
  line-height: 30px;
  border: 1px solid #BDCFF2;
  border-radius: 10px;
`

const DateInputForm = styled.input`
  margin-left: ${({ ml }) => ml};
  margin-right: 4px;
  background-color: white;
  width: 10%;
  height: 30px;
  line-height: 30px;
  border: 1px solid #BDCFF2;
  border-radius: 10px;
  text-align: center;
`

const SelectBox = styled.select`
  width: 200px;
  background-color: white;
  border: 3px solid #BDCFF2;
  height: 36px;
  border-radius: 20px;
  font-size: 16px;
  margin-right: 4px;
`

const AgesWrapper = styled.div`
  display: inline-block;
  height: 28px;
  line-height: 28px;
  width: 80px;
  color: black;
  margin: 4px 12px 4px 4px;
  background-color: #ffffff;
  border-radius: 4px;
  border: 3px solid #eaf1ff;
  text-align: center;
  overflow: hidden;

  & input:checked + span {
    background-color: #BDCFF2;
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

const StyledAmountWrapper = styled.div`
  width: 28px;
  height: 28px;
  border: 3px solid #BDCFF2;
  border-radius: 10px;
  font-size: 16px;
  margin: 0px 18px;
  background-color: white;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

const StyledButton = styled.button`
  adding: 4px;
  border: none;
  background-color: transparent;
  font-size: 16px;
  color: white;
  cursor: pointer;
`;

const PeopleLimitWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  padding: 8px;
`;

const EditCalendar = () => {

  const navigate = useNavigate();
  const calendar_id = window.location.pathname.split('/')[2];

  // 기본값 요청
  const onEditBasicData = async () => {
    const result = await client
      .get(`calendar/${calendar_id}`)
      .then((response) => response)
      setCalendarInfo({...result.data})
    return result
  }

  useEffect(()=>{
    onEditBasicData();
  },[])

  const [calendarInfo, setCalendarInfo] = useState({
    calendarContent: '',
    peopleLimit: 2,
    place: '',
  });

  const onCalendarInfoInput = (e) => {
    setCalendarInfo({...calendarInfo, [e.target.name]: e.target.value} )
  };

  const onCalendarInfoSubmit = (e) => {
    e.preventDefault();
    // 방 설명 유효성 체크
    if (calendarInfo.calendarContent === []) {
      alert(`방 설명을 써 주세요. '${calendarInfo.place}에서 만날 사람~' 은 어때요?`);
      return;
    }
    // x월, x일, x시, x분 => 0x월, 0x일, 0x시, 0x분
    // 방 시간 초과 유효성 체크
    if (dateState.year + dateState.month + dateState.day + dateState.hour + dateState.minute <= moment().format('YYYYMMDDHHmm')) {
      alert('시간 형식을 맞춰주세요!')
      return;
    }
    
    // api 요청
    client
      .put(`calendar/${calendar_id}`, {
        calendarContent: calendarInfo.calendarContent,
        calendarDatetime: dateState.year + dateState.month + dateState.day + dateState.hour + dateState.minute,
        peopleLimit: calendarInfo.peopleLimit,
        place: calendarInfo.place,
        ages: ageCheckedItems,
      })
      .then(function (response){
        SuccessAlert('수정 성공!')
        navigate("/calendar");
      })
      // .catch(function (error) {
      //   FailAlert(`시간 형식을 맞춰주세요!
      //   ex) ${moment().format('YYYY')}년${moment().format('MM')}월${moment().format('DD')}일${moment().format('HH')}시${moment().format('mm')}분`)
      // })
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
        <CreateCalendarBlock>
          <FetchProfile/>
          <InputBlock>
            <InputLeftWrap>방 설명</InputLeftWrap>
            <InputRightWrap>
              <InputForm
                type="text"
                value={calendarInfo.calendarContent}
                name="calendarContent"
                onChange={onCalendarInfoInput}
                required>
              </InputForm>
            </InputRightWrap>
          </InputBlock>
          <InputBlock>
            <InputLeftWrap>일시</InputLeftWrap>
            <InputRightWrap>
              <DateInputForm
                value={dateState.year}
                name="year"
                placeholder="ex)2022"
                onChange={onDaterInfoInput}
                required>
              </DateInputForm>년
              <DateInputForm
                ml={'20px'}
                value={dateState.month}
                name="month"
                placeholder="ex)08"
                onChange={onDaterInfoInput}
                required>
              </DateInputForm>월
              <DateInputForm
                ml={'20px'}
                value={dateState.day}
                name="day"
                placeholder="ex)09"
                onChange={onDaterInfoInput}
                required>
              </DateInputForm>일
              <DateInputForm
                ml={'20px'}
                value={dateState.hour}
                name="hour"
                placeholder="ex)22"
                onChange={onDaterInfoInput}
                required>
              </DateInputForm>시
              <DateInputForm
                ml={'20px'}
                value={dateState.minute}
                name="minute"
                placeholder="ex)30"
                onChange={onDaterInfoInput}
                required>
              </DateInputForm>분
            </InputRightWrap>
          </InputBlock>
          <InputBlock>
            <InputLeftWrap>장소</InputLeftWrap>
            <InputRightWrap>
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
            </InputRightWrap>
          </InputBlock>
          <InputBlock>
            <InputLeftWrap>연령대</InputLeftWrap>
            <InputRightWrap>
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
                  <span>70대↑</span>
                </label>
              </AgesWrapper>
            </InputRightWrap>
          </InputBlock>
          <InputBlock>
            <InputLeftWrap>인원</InputLeftWrap>
            <InputRightWrap>
              <PeopleLimitWrapper>
                <StyledButton onClick={() => onHandleDecrease("peopleLimit")}>
                  <i className="fas fa-minus"></i>
                </StyledButton>
                <StyledAmountWrapper>{calendarInfo.peopleLimit}</StyledAmountWrapper>
                <StyledButton onClick={() => onHandleIncrease("peopleLimit")}>
                  <i className="fas fa-plus"></i>
                </StyledButton>
              </PeopleLimitWrapper>
            </InputRightWrap>
          </InputBlock>
          <InputBlock>
            <CreateButton 
              onClick={onCalendarInfoSubmit}
            >
              수정하기
            </CreateButton>
          </InputBlock>
        </CreateCalendarBlock>
      </Wrapper>
    </>
  );
};

export default EditCalendar