import styled, { keyframes } from "styled-components";
import Header from "../components/Header";
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
  font-size: 6rem;
  font-weight: 200;
  font-style: italic;
  color: #fff;
  padding: 5rem 6rem 5.5rem;
  border: 0.4rem solid #fff;
  border-radius: 2rem;
  text-transform: uppercase;
  font-family: "Monoton";
  animation: ${NeonSignAnimation} 1.5s infinite alternate;
`;

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #000;
  height: 90vh;
  width: 100vw;
`;
const Home = () => {
  return (
    <div>
      <Header />
      <Wrapper>
        <NeonSignTitle>OPEN DRINKUS</NeonSignTitle>
      </Wrapper>
    </div>
  );
};

export default Home;
