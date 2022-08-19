import styled from "styled-components";
import { useState } from "react";
import { client } from "../../utils/client";
import { useNavigate } from "react-router-dom";
import { SuccessAlert } from "../../utils/sweetAlert";
import { setRoomSession } from "../../store/actions/room";
import { useDispatch } from "react-redux";
import ModalCloseButton from "../../components/common/buttons/ModalCloseButton";
import UserProfile from "../../components/room/UserProfile";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { CommunityConFirmButton } from "../../components/common/buttons/CommunityConfirmButton";

const ButtonWrapper = styled.div`
  margin-top: 15px;
  float: right;
`;

const CreateRoomBlock = styled.div`
  height: 510px;
`;

const InputBlock = styled.div`
  display: block;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const InputLeftWrap = styled.div`
  display: inline-block;
  margin-right: 30px;
  margin-left: ${(props) => props.marginLeft || "0px"};
  width: 60px;
  font-size: 16px;
  font-weight: bold;
  text-align: left;
`;

const InputRightWrap = styled.div`
  display: inline-block;
  height: 30px;
  line-height: 30px;
  padding: 17px 0;
`;

const InputForm = styled.input`
  background-color: ${(props) => props.background};
  height: 30px;
  width: ${(props) => props.width};
  border: 1px solid #919191;
  border-radius: 5px;
  padding: 2px 10px;

  outline: none;

  &::placeholder {
    font-size: 13px;
    color: #b1b1b1;
  }

  &:focus {
    box-shadow: 0px 0px 5px #707070;
  }
`;

const SelectBox = styled.select`
  background-color: white;
  height: 36px;
  width: 180px;
  border: 1px solid #919191;
  border-radius: 5px;
  padding: 0 10px;
  text-align: center;
  font-size: 15px;

  outline: none;

  &::placeholder {
    font-size: 13px;
    color: #b1b1b1;
  }

  &:focus {
    box-shadow: 0px 0px 5px #707070;
  }
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
  margin: 0 20px;
  font-size: 20px;
  font-weight: bold;
  color: #2b2b2b;
`;

const AgesWrapper = styled.div`
  display: inline-block;
  line-height: 28px;
  width: 84px;
  color: black;
  background-color: #ffffff;
  border-radius: 4px;
  border: 2px solid #919191;
  text-align: center;
  font-size: 15px;

  & input:checked + span {
    background-color: #cedaf0;
  }
  & span {
    cursor: pointer;
    display: block;
    padding: 2px 16px;
  }

  &: hover {
    background-color: #dce5f5;
  }
`;

const CheckBoxStyled = styled.input`
  display: none;
  cursor: pointer;
`;

const ProfileWrapper = styled.div`
  margin: 30px 0px;
`;

const PasswordCheckBox = styled.input`
  margin-left: 10px;
`;

const PasswordText = styled.span`
  margin-left: 5px;
  font-size: 13px;
  font-weight: bold;
  color: #707070;
`;

const CreateRoom = ({ close }) => {
  const user = useSelector((state) => state.user);
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
        `방 이름을 입력해 주세요. '${roomInfo.placetheme}에서 같이 마셔요~' 는 어때요?`
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

  const [secretRoom, setSecretRoom] = useState(false);

  useEffect(() => {
    setRoomInfo({ ...roomInfo, roompw: "" });
  }, [secretRoom]);

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

  const initState = () => {
    setRoomInfo({
      roomname: "",
      peoplelimit: 2,
      placetheme: "술집",
      roompw: "",
      categoryId: "",
    });

    setAgeCheckedItems(["N", "N", "N", "N", "N", "N"]);

    setIsCheckedAges(false);
  };

  return (
    <>
      <CreateRoomBlock>
        <ProfileWrapper>
          <UserProfile user={user} borderColor="white" />
        </ProfileWrapper>
        <ModalCloseButton
          close={() => {
            initState();
            close();
          }}
        />
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
              width="508px"
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

          <InputRightWrap>
            <InputLeftWrap marginLeft="80px">관심사</InputLeftWrap>
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
          <InputLeftWrap>연령대</InputLeftWrap>
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
          <InputLeftWrap>인원</InputLeftWrap>

          <InputRightWrap>
            <PeopleLimitWrapper>
              <StyledButton onClick={() => onHandleDecrease()}>
                <i className="fas fa-minus"></i>
              </StyledButton>
              <StyledAmountWrapper>{roomInfo.peoplelimit}</StyledAmountWrapper>
              <StyledButton onClick={() => onHandleIncrease()}>
                <i className="fas fa-plus"></i>
              </StyledButton>
            </PeopleLimitWrapper>
          </InputRightWrap>
        </InputBlock>

        <InputBlock>
          <InputLeftWrap>비밀번호</InputLeftWrap>
          <InputRightWrap>
            <InputForm
              type="password"
              value={roomInfo.roompw}
              name="roompw"
              onChange={onRoomInfoInput}
              disabled={!secretRoom}
              background={secretRoom ? "" : "#828282"}
            />
          </InputRightWrap>
          <PasswordCheckBox
            type="checkbox"
            checked={secretRoom}
            onChange={() => {
              setSecretRoom(!secretRoom);
            }}
          />
          <PasswordText>비밀방</PasswordText>

          <ButtonWrapper>
            <CommunityConFirmButton
              background="#5d81c9"
              color="#fff"
              borderColor="#5d81c9"
              hoverBackground="#4866a1"
              hoverBorderColor="#4866a1"
              event={onRoomInfoSubmit}
              content="생성하기"
            />
          </ButtonWrapper>
        </InputBlock>
      </CreateRoomBlock>
    </>
  );
};

export default CreateRoom;
