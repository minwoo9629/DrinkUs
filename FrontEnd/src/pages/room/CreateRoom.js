import { Wrapper } from "../../components/styled/Wrapper";
import styled from "styled-components";
import FetchProfile from "../../components/room/FetchProfile";
import { useState } from "react";
import { client } from "../../utils/client";
import { useNavigate } from "react-router-dom";
import { SuccessAlert } from "../../utils/sweetAlert";
import { BackButton } from "../../components/common/buttons/BackButton";
import { setRoomSession } from "../../store/actions/room";
import { useDispatch } from "react-redux";

const CreateRoomBlock = styled.div`
  width: 800px;
  margin-bottom: 20px;
  color: white;
  background-color: #6f92bf;
  border-radius: 30px;
  padding: 30px;
`;

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
`;

const InputForm = styled.input`
  background-color: white;
  width: 95%;
  height: 30px;
  line-height: 30px;
  border: 1px solid #bdcff2;
  border-radius: 10px;
`;

const SelectBox = styled.select`
  width: 200px;
  background-color: white;
  border: 3px solid #bdcff2;
  height: 36px;
  border-radius: 20px;
  font-size: 16px;
`;

const PeopleLimitWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  padding: 8px;
`;

const StyledButton = styled.button`
  adding: 4px;
  border: none;
  background-color: transparent;
  font-size: 16px;
  color: white;
  cursor: pointer;
`;

const StyledAmountWrapper = styled.div`
  width: 28px;
  height: 28px;
  border: 3px solid #bdcff2;
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
    background-color: #bdcff2;
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

const CreateRoom = () => {
  // Room 입장을 위한 세션설정
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // 방 입장 세션 정보
  const onHandleEnterRoom = (roomId) => {
    const sessionData = {
      sessionName: `Session${roomId}`,
      roomId,
    };
    dispatch(setRoomSession(sessionData));
    navigate("/room/detail");
  };

  const [roomInfo, setRoomInfo] = useState({
    roomname: "",
    peoplelimit: 2,
    placetheme: "술집",
    roompw: "",
    categoryId: "",
  });

  const onRoomInfoInput = (e) => {
    setRoomInfo({ ...roomInfo, [e.target.name]: e.target.value });
  };

  const onRoomInfoSubmit = (e) => {
    e.preventDefault();
    // 이름 유효 체크
    if (roomInfo.roomname.length === 0) {
      console.log(roomInfo.placetheme);
      alert(
        `방 이름을 입력해 주세요. '${roomInfo.placetheme}에서 같이 마셔요~' 는 어때요?`,
      );
    }

    client
      .post("rooms", {
        roomName: roomInfo.roomname,
        roomAdminId: null,
        roomPw: roomInfo.roompw,
        placeTheme: roomInfo.placetheme,
        peopleLimit: roomInfo.peoplelimit,
        ages: ageCheckedItems,
        categoryId: roomInfo.categoryId,
      })
      .then(function (response) {
        console.log(response.data.message);
        SuccessAlert("방이 생성되었습니다!");
        // setRoomIdState(response.data)
        onHandleEnterRoom(response.data);
      })
      .catch(function (error) {
        console.log(error);
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

  const onHandleIncrease = () => {
    const amount =
      roomInfo["peoplelimit"] + 1 > 8 ? 8 : roomInfo["peoplelimit"] + 1;
    setRoomInfo({ ...roomInfo, ["peoplelimit"]: amount });
  };

  const onHandleDecrease = () => {
    const amount =
      roomInfo["peoplelimit"] - 1 < 2 ? 2 : roomInfo["peoplelimit"] - 1;
    setRoomInfo({ ...roomInfo, ["peoplelimit"]: amount });
  };

  return (
    <>
      <BackButton />
      <Wrapper>
        <CreateRoomBlock>
          <div>
            <FetchProfile />
            <InputBlock>
              <InputLeftWrap>방 이름</InputLeftWrap>
              <InputRightWrap>
                <InputForm
                  type="text"
                  value={roomInfo.roomname}
                  name="roomname"
                  placeholder="방 이름을 입력하세요."
                  onChange={onRoomInfoInput}
                  required
                />
              </InputRightWrap>
            </InputBlock>
            <InputBlock>
              <InputLeftWrap>장소</InputLeftWrap>
              <InputRightWrap>
                <SelectBox
                  type="selectbox"
                  value={roomInfo.placetheme}
                  name="placetheme"
                  onChange={onRoomInfoInput}
                >
                  <option>술집</option>
                  <option>집</option>
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
              </InputRightWrap>
            </InputBlock>
            <InputBlock>
              <InputLeftWrap>인원</InputLeftWrap>

              <InputRightWrap>
                <PeopleLimitWrapper>
                  <StyledButton onClick={() => onHandleDecrease()}>
                    <i className="fas fa-minus"></i>
                  </StyledButton>
                  <StyledAmountWrapper>
                    {roomInfo.peoplelimit}
                  </StyledAmountWrapper>
                  <StyledButton onClick={() => onHandleIncrease()}>
                    <i className="fas fa-plus"></i>
                  </StyledButton>
                </PeopleLimitWrapper>
              </InputRightWrap>
            </InputBlock>
            <InputBlock>
              <InputLeftWrap>관심사</InputLeftWrap>
              <InputRightWrap>
                <SelectBox
                  type="selectbox"
                  name="categoryId"
                  onChange={onRoomInfoInput}
                >
                  <option value="null">관심사 없음</option>
                  <option value="1">스포츠</option>
                  <option value="2">음악</option>
                  <option value="3">게임/오락</option>
                  <option value="4">문화</option>
                  <option value="5">기타</option>
                </SelectBox>
              </InputRightWrap>
            </InputBlock>
            <InputBlock>
              <InputLeftWrap>방 연령대</InputLeftWrap>
              <InputRightWrap>
                <AgesWrapper>
                  <label>
                    <CheckBoxStyled
                      type="checkbox"
                      id="0"
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
                      onChange={onAgeCheckbox}
                    />
                    <span>70대↑</span>
                  </label>
                </AgesWrapper>
              </InputRightWrap>
            </InputBlock>
            <InputBlock>
              <InputLeftWrap>비밀번호</InputLeftWrap>
              <InputRightWrap>
                <InputForm
                  type="integer"
                  value={roomInfo.roompw}
                  name="roompw"
                  placeholder="비밀번호를 입력하면 비밀방으로 설정됩니다."
                  onChange={onRoomInfoInput}
                />
              </InputRightWrap>
            </InputBlock>
            <InputBlock>
              <CreateButton onClick={onRoomInfoSubmit}>생성하기</CreateButton>
            </InputBlock>
          </div>
        </CreateRoomBlock>
      </Wrapper>
    </>
  );
};

export default CreateRoom;
