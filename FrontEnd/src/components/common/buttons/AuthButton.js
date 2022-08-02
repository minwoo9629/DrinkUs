import styled from "styled-components";

export const AuthButton = styled.button`
  width: 380px;
  height: 64px;
  border-radius: 36px;
  border: 1px solid black;
  background-color: #bdcff2;
  margin: 14px;
  font-size: 20px;
  color: #535353;
  cursor: pointer;
  @media screen and (max-width: 500px) {
    width: 250px;
    height: 42px;
    font-size: 14px;
  }
`;