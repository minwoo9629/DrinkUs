import Header from "../../components/layout/Header";
import { Wrapper } from "../../components/styled/Wrapper";
import styled from "styled-components";
import FetchProfile from "../../components/room/FetchProfile";
import { useState } from "react";
import { client } from "../../utils/client"


const LetterColorChange = styled.div`
  color: white;
`

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

const CreateRoom = () => {
  
  const [roomInfo, setRoomInfo] = useState({
    roomname: '',
    peoplelimit: 1,
    placetheme: '',
    roompw: '',
    categoryId: '',
  });

  const onRoomInfoInput = (e) => {
    setRoomInfo({ ...roomInfo, [e.target.name]: e.target.value });
  };

  const onRoomInfoSubmit = (e) => {
    e.preventDefault();
    // 이름 유효 체크
    if (roomInfo.roomname.length === 0) {
      alert("방 이름을 입력해 주세요.");
    }

    // 인원 유효 체크
    if (roomInfo.peoplelimit.length === 0) {
      alert("최대인원을 입력해 주세요.")
    }

    client
      .post("rooms", {
        roomName:roomInfo.roomname,
        roomAdminId:null,
        roomPw:roomInfo.roompw,
        placeTheme:roomInfo.placetheme,
        peopleLimit:roomInfo.peoplelimit,
        ages:ageCheckedItems,
        categoryId:roomInfo.categoryId
      })
      .then(function (response) {
        console.log(response.data.message);
      })
      .catch(function (error) {
        console.log(error);
      });
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
    const amount = roomInfo[type] + 1 > 8 ? 8 : roomInfo[type] + 1;
    setRoomInfo({ ...roomInfo, [type]: amount });
  };

  const onHandleDecrease = (type) => {
    const amount = roomInfo[type] - 1 < 1 ? 1 : roomInfo[type] - 1;
    setRoomInfo({ ...roomInfo, [type]: amount });
  };

  return (
    <>
      <Header/>
      <Wrapper>
        <LetterColorChange>
          방 생성 페이지입니다.
          POST 요청을 보내서 방을 만들어야 해.
          <div>
            <FetchProfile/>
            <div>
              방 이름
              <InputForm 
              type="text"
              value={roomInfo.roomname}
              name="roomname"
              placeholder="방 이름을 입력하세요."
              onChange={onRoomInfoInput}
              required
              />
            </div>
            <div>
              장소 선택
              <SelectBox 
                type="selectbox"
                value={roomInfo.placetheme}
                name="placetheme" 
                onChange={onRoomInfoInput}>
                <option>술집</option>
                <option>야구장</option>
                <option>펍</option>
                <option>편의점</option>
                <option>한강공원</option>
              </SelectBox>
            </div>
            <div>
              인원
              <RowWrapper>
              <StyledButton onClick={() => onHandleDecrease("peoplelimit")}>
                <i className="fas fa-minus"></i>
              </StyledButton>
              <StyledAmountWrapper>{roomInfo.peoplelimit}</StyledAmountWrapper>
              <StyledButton onClick={() => onHandleIncrease("peoplelimit")}>
                  <i className="fas fa-plus"></i>
              </StyledButton>
              </RowWrapper>
              {/* <InputForm 
                type="integer"
                value={roomInfo.peoplelimit}
                name="peoplelimit"
                placeholder="최대인원을 입력하세요."
                onChange={onRoomInfoInput}
                required
              /> */}
            </div>
            <div>
              관심사 선택
              <SelectBox 
                type="selectbox"
                name="categoryId" 
                onChange={onRoomInfoInput}>
                <option value="null">관심사 없음</option>
                <option value="1">스포츠</option>
                <option value="2">음악</option>
                <option value="3">게임/오락</option>
                <option value="4">문화</option>
                <option value="5">기타</option>
              </SelectBox>
            </div>
            <div>
              나이대 선택
              <div>
                20대
                <CheckBoxForm
                  type="checkbox"
                  id = "0"
                  value={CheckedAges.roomage}
                  name="roomage"
                  onChange={onAgeCheckbox}
                />
                30대
                <CheckBoxForm
                  type="checkbox"
                  id = "1"
                  name="roomage"
                  onChange={onAgeCheckbox}
                />
                40대
                <CheckBoxForm
                  type="checkbox"
                  id = "2"
                  name="roomage"
                  onChange={onAgeCheckbox}
                />
                50대
                <CheckBoxForm
                  type="checkbox"
                  id = "3"
                  name="roomage"
                  onChange={onAgeCheckbox}
                />
                60대
                <CheckBoxForm
                  type="checkbox"
                  id = "4"
                  name="roomage"
                  onChange={onAgeCheckbox}
                />
                70대 이상
                <CheckBoxForm
                  type="checkbox"
                  id = "5"
                  name="roomage"
                  onChange={onAgeCheckbox}
                />
              </div>    
            </div>
            <div>
              비밀번호
              <InputForm 
                type="integer" 
                value={roomInfo.roompw}
                name="roompw"
                placeholder="비밀번호를 입력하면 비밀방으로 설정됩니다."
                onChange={onRoomInfoInput}
              />
            </div>
            <CreateButton 
              onClick={onRoomInfoSubmit}
            >
              생성하기
            </CreateButton>
          </div>
          </LetterColorChange>
      </Wrapper>
    </>
  );
};

export default CreateRoom