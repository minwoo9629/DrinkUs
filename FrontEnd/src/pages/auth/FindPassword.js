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

import { client } from "../../api/client";

const GoToButton = styled.button`
  padding: 12px 24px;
  border-radius: 11px;
  background-color: #bdcff2;
  color: white;
  font-size: 18px;
  margin-top: 40px;
  border: 3px solid gray;
  cursor: pointer;
`;

const FindPassword = () => {
  const [state, setState] = useState({
    userId: "",
    type: "find",
  });
  const userIdInput = useRef();
  const navigate = useNavigate();

  const onHandleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onHandleSubmit = async (event) => {
    event.preventDefault();
    if (state.length === 0) {
      EmptyAlert("아이디를 입력해주세요");
      return;
    }

    // 비밀번호 찾기 Axios 요청 로직
    const data = {
      userName: state.userId,
    };

    const response = await client
      .post(`/users/pw`, data)
      .then((response) => response)
      .catch((error) => error.response);

    if (response.status === 200) {
      setState({ ...state, type: "result" });
    } else {
      FailAlert(response.data.message);
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
                  <i className="fas fa-envelope"></i>
                  <LoginInput
                    value={state.userId}
                    ref={userIdInput}
                    name="userId"
                    onChange={onHandleInput}
                    placeholder="Email ID"
                  />
                </InputWrapper>
                <LoginButton type="submit">비밀번호 찾기</LoginButton>
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
              {state.userId}로 임시비밀번호가 전송되었습니다.
            </h2>
            <GoToButton onClick={() => navigate("/login")}>로그인</GoToButton>
          </RoundedWrapper>
        </>
      )}
    </Wrapper>
  );
};

export default FindPassword;
