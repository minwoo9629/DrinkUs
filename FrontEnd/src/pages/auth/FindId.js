import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LoginFormWrapper,
  LoginForm,
  InputWrapper,
  LoginInput,
  LoginButton,
} from "./Login";
import { Wrapper, RoundedWrapper } from "../../components/styled/Wrapper";
import axios from "axios";
import { BackButton } from "../../components/common/BackButton";
import { EmptyAlert, FailAlert } from "../../lib/sweetAlert";
import styled from "styled-components";

const GoToHome = styled.button`
  padding: 12px 24px;
  border-radius: 11px;
  background-color: #bdcff2;
  color: white;
  font-size: 18px;
  margin-top: 40px;
  border: 3px solid gray;
  cursor: pointer;
`;
const FindId = () => {
  const [state, setState] = useState({
    userName: "",
    dateOfBirth: "",
    type: "find",
    idList: [],
  });
  const navigate = useNavigate();

  const onHandleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onHandleSubmit = async (event) => {
    event.preventDefault();
    if (state.userName.length === 0 || state.dateOfBirth.length === 0) {
      EmptyAlert("이름 또는 생년월일을 입력해주세요");
      return;
    }

    const BASE_URL = "http:localhost:8080";
    const response = await axios
      .post(`${BASE_URL}/users/id`, {
        userId: state.userName,
        dateOfBirth: state.dateOfBirth,
      })
      .then((response) => response);

    if (response.status === 200) {
      setState({ ...state, type: "result" });
    } else {
      FailAlert("등록된 ID가 존재하지 않습니다");
    }
  };

  return (
    <Wrapper>
      {state.type === "find" ? (
        <>
          <BackButton />
          <RoundedWrapper
            width={"450"}
            height={"700"}
            mWidth={"300"}
            mHeight={"460"}
          >
            <LoginFormWrapper>
              <LoginForm onSubmit={onHandleSubmit}>
                <InputWrapper>
                  <i className="fas fa-user"></i>
                  <LoginInput
                    value={state.userName}
                    name="userName"
                    onChange={onHandleInput}
                    placeholder="이름"
                  />
                </InputWrapper>
                <InputWrapper>
                  <i className="fas fa-calendar-alt"></i>
                  <LoginInput
                    value={state.dateOfBirth}
                    name="dateOfBirth"
                    onChange={onHandleInput}
                    placeholder="생년월일 (ex:20000101)"
                  />
                </InputWrapper>
                <LoginButton type="submit">아이디 찾기</LoginButton>
              </LoginForm>
            </LoginFormWrapper>
          </RoundedWrapper>
        </>
      ) : (
        <>
          <RoundedWrapper
            width={"840"}
            height={"400"}
            mWidth={"300"}
            mHeight={"200"}
            flexDirection={"column"}
          >
            <h2 style={{ color: "white", marginTop: "20px" }}>
              로 검색된 아이디입니다.
            </h2>
            <GoToHome onClick={() => navigate("/")}>홈으로</GoToHome>
          </RoundedWrapper>
        </>
      )}
    </Wrapper>
  );
};

export default FindId;
