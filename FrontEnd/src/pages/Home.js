import styled, { keyframes } from "styled-components";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import HomeSlide from "../components/mainpage/HomeSlide";
import TopButton from "../components/common/buttons/TopButton";
import { BaseFlexWrapper, BaseFlexColWrapper } from "../components/styled/Wrapper";

const neon_text_color = "#5904de";
const neon_border_color = "#08f";
const NeonSignAnimation = keyframes`
0%,
  19%,
  21%,
  23%,
  25%,
  54%,
  56%,
  100% {
    text-shadow: -0.2rem -0.2rem 1rem #fff, 0.2rem 0.2rem 1rem #fff,
      0 0 2rem ${neon_text_color}, 0 0 4rem ${neon_text_color},
      0 0 6rem ${neon_text_color}, 0 0 8rem ${neon_text_color},
      0 0 10rem ${neon_text_color};

    box-shadow: 0 0 0.5rem #fff, inset 0 0 0.5rem #fff,
      0 0 2rem ${neon_border_color}, inset 0 0 2rem ${neon_border_color},
      0 0 4rem ${neon_border_color}, inset 0 0 4rem ${neon_border_color};
  }

  20%,
  24%,
  55% {
    text-shadow: none;
    box-shadow: none;
  }
`;

const NeonSignTitle = styled.h1`
  font-size: 5rem;
  font-weight: 200;
  font-style: italic;
  color: #fff;
  padding: 5rem 6rem 5.5rem;
  border: 0.4rem solid #fff;
  border-radius: 2rem;
  text-transform: uppercase;
  font-family: "Monoton";
  animation: ${NeonSignAnimation} 1.5s infinite alternate;
  @media screen and (max-width: 960px) {
    font-size: 4rem;
    padding: 4rem 5rem 4.5rem;
  }
  @media screen and (max-width: 720px) {
    font-size: 3rem;
    padding: 3rem 4rem 3.5rem;
  }
  @media screen and (max-width: 580px) {
    font-size: 2rem;
    padding: 3rem 4rem 3rem;
  }
`;

const ContentWrapper = styled(BaseFlexWrapper)`
  background: ${(props) => props.background};
  height: ${(props) => props.height};
  width: 100vw;
`;

const Letter = styled.p`
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.weight};
  // font-family: "맑은고딕","Malgun Gothic",serif;
  // font-family: "Black Han Sans";
  // font-family: "돋움",Dotum,"돋움체",DotumChe;
  font-family: 'EarlyFontDiary';
`

const Home = () => {
  return (
    <>
      <Header />
      <ContentWrapper background={"#000"} height={"100vh"}>
        <NeonSignTitle>OPEN DRINKUS</NeonSignTitle>
      </ContentWrapper>
      <ContentWrapper height={"20vh"}/>
      <ContentWrapper background={"#FFF"} height={"70vh"}>
        <img src={process.env.PUBLIC_URL + '/assets/room.png'} width="30%" height="55%"/>
        <BaseFlexColWrapper>
          <Letter size={"2rem"} weight={"bold"}>
            화상 채팅방
          </Letter>
          <Letter size={"1.3rem"}>
            화상 채팅방을 통해 새로운 사람을 만날 수 있어요<br/>
            우리끼리만 만나고 싶다면 비밀번호를 설정할 수 있어요
          </Letter>
        </BaseFlexColWrapper>
      </ContentWrapper>
      <ContentWrapper background={"#FFF"} height={"70vh"}>
        <img src={process.env.PUBLIC_URL + '/assets/community.png'} width="30%" height="55%"/>
        <BaseFlexColWrapper>
          <Letter size={"2rem"} weight={"bold"}>
            커뮤니티
          </Letter>
          <Letter size={"1.3rem"}>
            술약속을 잡을 수 있는 월간 커뮤니티와<br/>
            자유롭게 대화할 수 있는 일간 커뮤니티가 있어요
          </Letter>
        </BaseFlexColWrapper>
      </ContentWrapper>
      <ContentWrapper background={"#FFF"} height={"70vh"}>
        <img src={process.env.PUBLIC_URL + '/assets/filter.png'} width="30%" height="55%"/>
        <BaseFlexColWrapper>
          <Letter size={"2rem"} weight={"bold"}>
            관심사
          </Letter>
          <Letter size={"1.3rem"}>
            내 관심사를 설정하고, 다른 사람의 관심사를 볼 수 있어요<br/>
            관심있는 방을 필터로 찾을 수 있어요
          </Letter>
        </BaseFlexColWrapper>
      </ContentWrapper>
      <ContentWrapper height={"20vh"}/>
      <HomeSlide />
      <Footer />
      <TopButton />
    </>
  );
};

export default Home;
