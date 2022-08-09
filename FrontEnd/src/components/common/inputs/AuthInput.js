import styled from "styled-components";

export const AuthInput = styled.input`
  position: relative;
  height: 30px;
  width: 180px;
  top: 7px;
  font-size: 18px;
  background-color: transparent;
  outline: none;
  border: none;
  margin: 0px;
  color: white;
  @media screen and (max-width: 500px) {
    width: 160px;
    height: 42px;
    font-size: 16px;
    top: 0px;
    left: 5px;
    &::placeholder {
      font-size: 14px;
    }
  }
  &::placeholder {
    color: white;
  }
`;