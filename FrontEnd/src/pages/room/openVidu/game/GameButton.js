import styled from "styled-components";

const StyledGameButton = styled.button`
  border: 1px solid #ffffff;
  background-color: #bdcff2;
  padding: 8px 20px;
  border-radius: 10px;
  cursor: pointer;
`;

const GameButton = ({ text, onClick }) => {
  return <StyledGameButton onClick={onClick}>{text}</StyledGameButton>;
};

export default GameButton;
