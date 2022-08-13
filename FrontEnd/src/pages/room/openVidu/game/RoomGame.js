import styled from "styled-components";

const StyledRoomGameContainer = styled.div`
  width: 100%;
  height: 100%;
  display: ${(props) => props.display};
  color: white;
`;

const StyledRoomGameComponent = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  border-radius: 20px;
  box-shadow: 10px 10px 15px 6px rgba(0, 0, 0, 0.3);
`;

const StyeldRoomGameTittle = styled.div`
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

const RoomGame = ({ gameDisplay }) => {
  return (
    <StyledRoomGameContainer display={gameDisplay}>
      <StyledRoomGameComponent>
        <StyeldRoomGameTittle>
          <span>게임설정</span>
        </StyeldRoomGameTittle>
        <div style={{ color: "white" }}>방연령대 표시하기</div>
        <div style={{ color: "white" }}>관심사 표시하기</div>
        <div style={{ color: "white" }}>인원 표시하기</div>
        <div style={{ color: "white" }}>비밀번호</div>
      </StyledRoomGameComponent>
    </StyledRoomGameContainer>
  );
};

export default RoomGame;
