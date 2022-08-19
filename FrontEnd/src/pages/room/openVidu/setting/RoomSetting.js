import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { getRoomInfo } from "../../../../api/RoomAPI";
import { client } from "../../../../utils/client";

const StyledRoomSettingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: ${(props) => props.display};
  color: white;
`;

const StyledRoomSettingComponent = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  border-radius: 20px;
  box-shadow: 10px 10px 15px 6px rgba(0, 0, 0, 0.3);
`;

const StyeldRoomSettingTittle = styled.div`
  position: sticky;
  margin: auto;
  width: 80%;
  top: 40px;
  line-height: 35px;
  height: 45px;
  background: transparent;
  box-sizing: border-box;
  font-weight: bold;
  font-size: 14px;
  text-align: center;
  padding-top: 4px;
  margin-bottom: 30px;
  border-radius: 20px;
  background-color: #bdcff2;
  color: black;
`;

const StyeldTitle = styled.p`
  padding: 8px 0px;
  margin: 50px 10px 10px 10px;
  border-bottom: 1px solid #bdcff2;
  color: white;
`;
const StyledAgeListWrapper = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
`;

const StyeldAgeWrapper = styled.div`
  margin-left: 4px;
  margin-bottom: 8px;
  text-align: center;
  background-color: white;
  width: 30px;
  padding: 8px 16px;
  border-radius: 10px;
  color: black;
  &.active {
    background-color: #bdcff2;
  }
`;

const StyeldCategoryNameWrapper = styled.div`
  background-color: #bdcff2;
  text-align: center;
  margin: 0px 10px;
  padding: 12px 20px;
  border-radius: 10px;
  font-size: 15px;
  color: black;
`;

const RoomSetting = ({ settingDisplay, roomSettingTitle }) => {
  const [roomInfoState, setRoomInfoState] = useState({
    ages: [],
    categoryName: "",
    roomName: "",
  });
  const ages = ["20", "30", "40", "50", "60", "70↑"];
  const roomInfo = useSelector((state) => state.room);
  const fetchRoomData = async (roomId) => {
    const result = await getRoomInfo(roomId);
    setRoomInfoState({ ...result });
  };
  useEffect(() => {
    fetchRoomData(roomInfo.roomId);
  }, []);
  return (
    <StyledRoomSettingContainer display={settingDisplay}>
      <StyledRoomSettingComponent>
        <StyeldRoomSettingTittle>
          <span>{roomInfoState.roomName}</span>
        </StyeldRoomSettingTittle>
        <div>
          <StyeldTitle>방 연령대</StyeldTitle>
          <StyledAgeListWrapper>
            {roomInfoState.ages.map((item, idx) => (
              <StyeldAgeWrapper
                key={idx}
                className={item === "Y" ? "active" : ""}
              >
                {ages[idx]}
              </StyeldAgeWrapper>
            ))}
          </StyledAgeListWrapper>
        </div>
        <div>
          <StyeldTitle>관심사</StyeldTitle>
          <StyeldCategoryNameWrapper>
            {roomInfoState.categoryName !== null
              ? roomInfoState.categoryName
              : "등록된 관심사가 없습니다"}
          </StyeldCategoryNameWrapper>
        </div>
      </StyledRoomSettingComponent>
    </StyledRoomSettingContainer>
  );
};

export default RoomSetting;

RoomSetting.defaultProps = {
  roomSettingTitle: "펍에서 칵테일",
};
