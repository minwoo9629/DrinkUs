import { GoToButton } from "../../components/common/buttons/GoToButton";
import { useNavigate } from "react-router-dom";
import { BaseFlexWrapper } from "../../components/styled/Wrapper"
import Header from "../../components/layout/Header";
import { Wrapper } from "../../components/styled/Wrapper";
import styled from "styled-components";

const Banner = styled.div `
  height: 270px;
  width: 1500px;
  background-color: #EAF1FF;
`

const RoomBox = styled.div `
  height: 300px;
  width: 400px;
  background-color: #EAF1FF;
`

const RecommendLetter = styled.p `
  color: white;
`

const DrinkLive = () => {

  const navigate = useNavigate();
  
  return (
  <>
    <Header/>
    <Wrapper>
      <Banner>배너입니다.</Banner>
      <BaseFlexWrapper>
      <GoToButton onClick={() => navigate("/createroom")} color={"cornflowerblue"}>방 만들기</GoToButton>
      <GoToButton onClick={() => navigate("/rooms")} color={"#EAF1FF"}>모든 방 보기</GoToButton>
      </BaseFlexWrapper>
    </Wrapper>
    <Wrapper>
      <RecommendLetter>나와 나이가 비슷한 사람들이 있는 방</RecommendLetter>
      <RoomBox>방 디테일 링크</RoomBox>
    </Wrapper>
  </>
  );
};

export default DrinkLive