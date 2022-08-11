import { Link } from "react-router-dom";
import styled from "styled-components";

const NotFoundWrapper = styled.div`
  overflow: hidden;
  background-color: #e0fff2;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NotFoundImageWrapper = styled.div`
  min-width: 300px;
  width: 50%;
  height: 90%;
  max-width: 800px;
  max-height: 800px;
  position: relative;
`;

const NotFoundImage = styled.img`
  border-radius: 40px;
  object-fit: fill;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

const MainLink = styled(Link)`
  position: absolute;
  font-size: 30px;
  -webkit-text-decoration: none;
  text-decoration: none;
  color: black;
  top: 36px;
  left: 5%;
  font-weight: 700;
  @media screen and (max-width: 1320px) {
    left: 3%;
    font-size: 28px;
  }
  @media screen and (max-width: 1280px) {
    font-size: 27px;
  }
  @media screen and (max-width: 1180px) {
    font-size: 24px;
  }
  @media screen and (max-width: 1000px) {
    font-size: 20px;
  }
  @media screen and (max-width: 790px) {
    font-size: 16px;
  }
  @media screen and (max-width: 710px) {
    font-size: 14px;
  }
`;
const NotFound = () => {
  return (
    <NotFoundWrapper>
      <NotFoundImageWrapper>
        <NotFoundImage src="/assets/NotFound/NotFound.png" />
        <MainLink to="/">메인으로 돌아갈까요?</MainLink>
      </NotFoundImageWrapper>
    </NotFoundWrapper>
  );
};

export default NotFound;
