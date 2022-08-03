import Header from "../../components/layout/Header";
import { Wrapper } from "../../components/styled/Wrapper";
import styled from "styled-components";
import Category from "../../components/createroom/Category";
import FetchProfile from "../../components/createroom/FetchProfile";
import PeopleLimit from "../../components/createroom/PeopleLimit";
import PlaceTheme from "../../components/createroom/PlaceTheme";
import RoomAge from "../../components/createroom/RoomAge";
import RoomName from "../../components/createroom/RoomName";
import RoomPw from "../../components/createroom/RoomPw";
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

const CreateRoom = () => {
  
  const [roomInfo, setRoomInfo] = useState({
    roomname: '',
    peoplelimit: '',
    placetheme: '',
    roompw: '',
    category: '',
  });

  const onRoomInfoInput = (e) => {
    setRoomInfo({ ...roomInfo, [e.target.name]: e.target.value });
    console.log(roomInfo)
  };

  const onRoomInfoSubmit = (e) => {
    e.preventDefault();
    client
      .post("https://i7b306.p.ssafy.io/rooms", {
        roomName: roomInfo.roomname,
        roomPw: roomInfo.roompw,
        placeTheme: roomInfo.placetheme,
        PeopleLimit: roomInfo.peoplelimit,
        ages: CheckedAges.roomage,
        category: roomInfo.category
      })
      .then(function (response) {
        console.log(response.data.message);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Age 관련 체크 로직
  const [ageCheckedItems, setAgeCheckedItems] = useState(['N','N','N','N','N']);

  const onCheckedAgeItemHandler = (id, isChecked) => {
    const newageCheckedItems = [...ageCheckedItems];
    newageCheckedItems[id] = (isChecked? 'Y':'N');
    setAgeCheckedItems([...newageCheckedItems]);
  }
  // console.log(ageCheckedItems)

  const [CheckedAges, setIsCheckedAges] = useState(false);
  

  const onAgeCheckbox = ({target}) => {
    setIsCheckedAges(!CheckedAges);
    onCheckedAgeItemHandler(target.id, target.checked)
    // console.log(ageCheckedItems)
  };


  return (
    <>
      <Header/>
<<<<<<< HEAD
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
              rules={[{ required: true, message: '방 이름을 입력하세요.'}]} 
              onChange={onRoomInfoInput} 
              />
            </div>
            <div>
              장소 선택
              <SelectBox 
                type="selectbox"
                value={roomInfo.placetheme}
                name="placetheme" 
                onChange={onRoomInfoInput}>
                <option>야구장</option>
                <option>펍</option>
                <option>편의점</option>
                <option>한강공원</option>
              </SelectBox>
            </div>
            <div>
              인원
              <InputForm 
                type="integer"
                value={roomInfo.peoplelimit}
                name="peoplelimit"
                rules={[{ required: true, message: '최대인원을 입력하세요.'}]}
                onChange={onRoomInfoInput}
              />
            </div>
            <div>
              관심사 선택
              <SelectBox 
                type="selectbox"
                value={roomInfo.category}
                name="category" 
                onChange={onRoomInfoInput}>
                <option>스포츠</option>
                <option>음악</option>
                <option>게임/오락</option>
                <option>문화</option>
                <option>기타</option>
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
                  value={CheckedAges.roomage}
                  name="roomage"
                  onChange={onAgeCheckbox}
                />
                40대
                <CheckBoxForm
                  type="checkbox"
                  id = "2"
                  value={CheckedAges.roomage}
                  name="roomage"
                  onChange={onAgeCheckbox}
                />
                50대
                <CheckBoxForm
                  type="checkbox"
                  id = "3"
                  value={CheckedAges.roomage}
                  name="roomage"
                  onChange={onAgeCheckbox}
                />
                60대
                <CheckBoxForm
                  type="checkbox"
                  id = "4"
                  value={CheckedAges.roomage}
                  name="roomage"
                  onChange={onAgeCheckbox}
                />
                70대 이상
                <CheckBoxForm
                  type="checkbox"
                  id = "5"
                  value={CheckedAges.roomage}
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
                onChange={onRoomInfoInput}
              />
            </div>
            <CreateButton onClick={onRoomInfoSubmit}>생성하기</CreateButton>
          </div>
          </LetterColorChange>
      </Wrapper>
=======
      <div>
        방 생성 페이지입니다.
        POST 요청을 보내서 방을 만들어야 해.
        테스트용 코드
      </div>
>>>>>>> 27c67acc8d7f969b6b18bce591ad5a9d3b1c269a
    </>
  );
};

export default CreateRoom