import styled, { keyframes } from "styled-components";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import HomeSlide from "../components/mainpage/HomeSlide";
import TopButton from "../components/common/buttons/TopButton";
import { BaseFlexWrapper } from "../components/styled/Wrapper";

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

const Mainimage = styled.div`
  width: 800px;
  height: 308px;
  top: ${(props) => props.top};
  background: #bdcff2;
  margin-bottom: 15vh;
`;

const Home = () => {
  return (
    <>
      <Header />
      <ContentWrapper background={"#000"} height={"100vh"}>
        <NeonSignTitle>OPEN DRINKUS</NeonSignTitle>
      </ContentWrapper>
      <ContentWrapper background={"#FFF"} height={"190vh"}>
        <center>
          <Mainimage top={"130vh"}></Mainimage>
          <Mainimage top={"180vh"}></Mainimage>
          <Mainimage top={"230vh"}></Mainimage>
        </center>
      </ContentWrapper>
      <HomeSlide />
      <Footer />
      <TopButton />
    </>
  );
};

export default Home;
