import styled from "styled-components";

export const SocialJoinButton = styled.img`
  padding: 0px 50px;
  height: 50px;
  border-radius: 12px;
  cursor: pointer;
  background-color: ${({ color }) => color};
  @media screen and (max-width: 500px) {
    width: 20px;
    height: 20px;
  }
`;