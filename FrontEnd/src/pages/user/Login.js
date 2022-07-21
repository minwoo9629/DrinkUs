import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logIn } from "../../store/actions/user";
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
  display: flex;
  justify-content: center;
  border-radius: 40px;
  height: 700px;
  background-color: #131317;
  width: 450px;
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
  width: 300px;
  margin: 14px 14px 20px 14px;
  justify-content: space-between;
`;

const SocialWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  width: 120px;
`;
const SocialButton = styled.img`
  padding: 8px;
  border-radius: 100%;
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

const KaKaoSocialButton = styled(SocialButton)`
  background-color: yellow;
`;

const GoogleSocialButton = styled(SocialButton)`
  background-color: white;
`;

const Login = () => {
  const [state, setState] = useState({
    userId: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userIdInput = useRef();
  const passwordInput = useRef();

  const onHandleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onHandleSubmit = (event) => {
    event.preventDefault();
    if (state.userId.length === 0) {
      userIdInput.current.focus();
      return;
    }
    if (state.password.length === 0) {
      passwordInput.current.focus();
      return;
    }

    const data = {
      userId: state.userId,
      password: state.password,
    };
    dispatch(logIn(data));
    navigate("/");
  };
  return (
    <>
      <Wrapper>
        <NeonLoginWrapper>
          <LoginWrapper>
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
              <InputWrapper>
                <i className="fas fa-lock"></i>
                <LoginInput
                  type="password"
                  value={state.password}
                  ref={passwordInput}
                  name="password"
                  onChange={onHandleInput}
                  placeholder="Password"
                />
              </InputWrapper>
              <LoginButton type="submit">로그인</LoginButton>
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
            <SocialWrapper>
              <KaKaoSocialButton src="assets/kakao_icon.png" />
              <GoogleSocialButton src="assets/google_icon.png" />
            </SocialWrapper>
          </LoginWrapper>
        </NeonLoginWrapper>
      </Wrapper>
    </>
  );
};

export default Login;
