import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
const Wrapper = styled.div`
  background-color: black;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NeonLoginWrapper = styled.div`
  /* box-shadow: 0 0 0.2rem #fff, 0 0 0.2rem #fff, 0 0 2rem #bc13fe,
    0 0 0.8rem #bc13fe, 0 0 2.8rem #bc13fe, inset 0 0 1.3rem; */
  display: flex;
  justify-content: center;
  border-radius: 40px;
  height: 700px;
  background-color: #131317;
  width: 450px;
  /* border: 1px solid whitesmoke; */
`;
const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

  align-items: center;
`;

const LoginForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  justify-content: space-between;
  width: 380px;
  height: 64px;
  border-radius: 36px;
  border: 1px solid black;
  background-color: #676775;
  margin: 14px;
  position: relative;
`;
const LoginInput = styled.input`
  position: relative;
  height: 30px;
  width: 280px;
  top: 7px;
  font-size: 18px;
  background-color: transparent;
  outline: none;
  border: none;
  margin: 0px;
  color: white;
`;

const LoginButton = styled.button`
  width: 380px;
  height: 64px;
  border-radius: 36px;
  border: 1px solid black;
  background-color: #bdcff2;
  margin: 14px;
  font-size: 20px;
  color: #535353;
  cursor: pointer;
`;

const LinkWrapper = styled.div`
  display: flex;
  width: 360px;
  margin: 14px;
  justify-content: space-between;
`;

const Login = () => {
  const [state, setState] = useState({
    userId: "",
    password: "",
  });

  const userIdInput = useRef();
  const passwordInput = useRef();

  const onHandleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onHandleSubmit = () => {
    if (state.userId.length === 0) {
      userIdInput.current.focus();
      return;
    }
    if (state.password.length === 0) {
      passwordInput.current.focus();
      return;
    }
    alert("로그인 요청 로직 작성하기");
  };
  return (
    <>
      <Wrapper>
        <NeonLoginWrapper>
          <LoginWrapper>
            <LoginForm>
              <InputWrapper>
                <i class="fas fa-envelope"></i>
                <LoginInput
                  value={state.userId}
                  ref={userIdInput}
                  name="userId"
                  onChange={onHandleInput}
                  placeholder="Email ID"
                />
              </InputWrapper>
              <InputWrapper>
                <i class="fas fa-lock"></i>
                <LoginInput
                  type="password"
                  value={state.password}
                  ref={passwordInput}
                  name="password"
                  onChange={onHandleInput}
                  placeholder="Password"
                />
              </InputWrapper>
              <LoginButton onClick={onHandleSubmit}>로그인</LoginButton>
            </LoginForm>
            <LinkWrapper>
              <Link to={"/"} style={{ color: "cornflowerblue" }}>
                아이디 찾기
              </Link>
              <span style={{ color: "cornflowerblue" }}>|</span>
              <Link to={"/findPassword"} style={{ color: "cornflowerblue" }}>
                비밀번호 찾기
              </Link>
              <span style={{ color: "cornflowerblue" }}>|</span>
              <Link to={"/signup"} style={{ color: "cornflowerblue" }}>
                회원가입
              </Link>
            </LinkWrapper>
            <img src="assets/kakao_login.png" />
          </LoginWrapper>
        </NeonLoginWrapper>
      </Wrapper>
    </>
  );
};

export default Login;
