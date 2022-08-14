import styled from "styled-components";

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
  return (
    <StyledRoomSettingContainer display={settingDisplay}>
      <StyledRoomSettingComponent>
        <StyeldRoomSettingTittle>
          <span>{roomSettingTitle}</span>
        </StyeldRoomSettingTittle>
        <div style={{ color: "white" }}>방연령대 표시하기</div>
        <div style={{ color: "white" }}>관심사 표시하기</div>
        <div style={{ color: "white" }}>인원 표시하기</div>
        <div style={{ color: "white" }}>비밀번호</div>
      </StyledRoomSettingComponent>
    </StyledRoomSettingContainer>
  );
};

export default RoomSetting;

RoomSetting.defaultProps = {
  roomSettingTitle: "펍에서 칵테일",
};
