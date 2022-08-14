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

const RoomSetting = ({ settingDisplay, roomSettingTitle }) => {
  const [roomInfoState, setRoomInfoState] = useState({});
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
          <span>{roomInfoState.placeTheme}</span>
        </StyeldRoomSettingTittle>
        <div style={{ color: "white" }}>
          <p>{roomInfoState.ages20}</p>
          <p>{roomInfoState.ages30}</p>
          <p>{roomInfoState.ages40}</p>
          <p>{roomInfoState.ages50}</p>
          <p>{roomInfoState.ages60}</p>
          <p>{roomInfoState.ages70}</p>
        </div>
        <div style={{ color: "white" }}>
          {roomInfoState.category.categoryName}
        </div>
      </StyledRoomSettingComponent>
    </StyledRoomSettingContainer>
  );
};

export default RoomSetting;

RoomSetting.defaultProps = {
  roomSettingTitle: "펍에서 칵테일",
};
