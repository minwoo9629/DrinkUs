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

const StyeldRoomGameButtonsWrapper = styled.div`
  height: 90%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyeldGameButtonWrapper = styled.div`
  width: 90%;
  justify-content: space-between;
  padding: 8px 20px;
  align-items: center;
  display: flex;
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
        <StyeldRoomGameButtonsWrapper>
          <StyeldGameButtonWrapper>
            <div>랜덤 마시기</div>
            <GameButton onClick={randomDrink} text={"go"} />
          </StyeldGameButtonWrapper>
          <StyeldGameButtonWrapper>
            <div>폭탄 돌리기</div>
            <GameButton onClick={bombGame} text={"go"} />
          </StyeldGameButtonWrapper>
          <StyeldGameButtonWrapper>
            <div>대화주제 추천</div>
            <GameButton onClick={recommendTopics} text={"go"} />
          </StyeldGameButtonWrapper>
          <StyeldGameButtonWrapper>
            <div>건배사 추천</div>
            <GameButton onClick={recommendToasts} text={"go"} />
          </StyeldGameButtonWrapper>
        </StyeldRoomGameButtonsWrapper>
      </StyledRoomGameComponent>
    </StyledRoomGameContainer>
  );
};

export default RoomGame;
