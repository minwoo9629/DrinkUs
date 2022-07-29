import styled from "styled-components";

export const SocialButton = styled.img`
  padding: 8px;
  border-radius: 100%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  background-color: ${({ color }) => color};
  @media screen and (max-width: 500px) {
    width: 20px;
    height: 20px;
  }
`;