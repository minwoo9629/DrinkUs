import styled from "styled-components";
import GameButton from "./GameButton";

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

const StyeldRoomGameButtonWrapper = styled.div`
  height: 90%;
  background-color: cornflowerblue;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const RoomGame = ({
  gameDisplay,
  randomDrink,
  recommendTopics,
  recommendToasts,
  bombGame,
}) => {
  return (
    <StyledRoomGameContainer display={gameDisplay}>
      <StyledRoomGameComponent>
        <StyeldRoomGameTittle>
          <span>게임설정</span>
        </StyeldRoomGameTittle>
        <StyeldRoomGameButtonWrapper>
          <div style={{ color: "white" }}>
            <GameButton onClick={randomDrink} text={"랜덤 마시기"} />
          </div>
          <div style={{ color: "white" }}>
            <GameButton onClick={bombGame} text={"폭탄 돌리기"} />
          </div>
          <div style={{ color: "white" }}>
            <GameButton onClick={recommendTopics} text={"대화주제 추천"} />
          </div>
          <div style={{ color: "white" }}>
            <GameButton onClick={recommendToasts} text={"건배사 추천"} />
          </div>
        </StyeldRoomGameButtonWrapper>
      </StyledRoomGameComponent>
    </StyledRoomGameContainer>
  );
};

export default RoomGame;
