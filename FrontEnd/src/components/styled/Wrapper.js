import styled from "styled-components";

export const Wrapper = styled.div`
  background-color: ${({ color }) => color};
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: ${({ alignItems }) => alignItems};
`;

export const RoundedWrapper = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 40px;
  flex-direction: ${(props) => props.flexDirection};
  background-color: #131317;
  align-items: center;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  position: relative;

  @media screen and (max-width: 500px) {
    width: ${(props) => props.mWidth}px;
    height: ${(props) => props.mHeight}px;
    /* width: 300px;
    height: 460px; */
  }
`;

RoundedWrapper.defaultProps = {
  flexDirection: "row",
};

Wrapper.defaultProps = {
  color: "black",
  alignItems: "center",
};
