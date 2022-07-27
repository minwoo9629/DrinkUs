import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUserProfile } from "../../store/actions/user";
import { Wrapper, RoundedWrapper } from "../../components/styled/Wrapper";
import styled from "styled-components";
import { BackButton } from "../../components/common/BackButton";
import { FailAlert, SuccessAlert } from "../../lib/sweetAlert";
import { client } from "../../api/client";
export const LoginFormWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const LoginForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const InputWrapper = styled.div`
  justify-content: space-between;
  width: 380px;
  height: 64px;
  border-radius: 36px;
  border: 1px solid black;
  background-color: #676775;
  margin: 14px;
  position: relative;
  @media screen and (max-width: 500px) {
    width: 250px;
    height: 42px;
  }
`;
export const LoginInput = styled.input`
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

export const LoginButton = styled.button`
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

const LinkWrapper = styled.div`
  display: flex;
  width: 300px;
  margin: 14px 14px 20px 14px;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 500px) {
    width: 200px;
    height: 42px;
    & a {
      font-size: 14px;
      font-weight: 100;
    }
    & span {
      font-size: 14px;
    }
  }
`;

const SocialWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  width: 120px;
  align-items: center;
  @media screen and (max-width: 500px) {
    margin-top: 20px;
  }
`;
const SocialButton = styled.img`
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

  const onHandleSubmit = async (event) => {
    event.preventDefault();
    // 로딩스피너띄우고
    if (state.userId.length === 0) {
      FailAlert("ID 또는 PW가 일치하지 않습니다");
      userIdInput.current.focus();
      return;
    }
    if (state.password.length === 0) {
      passwordInput.current.focus();
      return;
    }

    const data = {
      userName: state.userId,
      userPw: state.password,
    };

    const response = await client
      .post(`/users/login`, data)
      .then((response) => response)
      .catch((error) => error.response);

    if (response.status === 400) {
      FailAlert(response.data.message);
      return;
    }
    const accessToken = response.headers["authorization"];
    sessionStorage.setItem("ACCESS_TOKEN", accessToken);

    // 로딩스피너끄고
    dispatch(getUserProfile());
    SuccessAlert("로그인되었습니다", navigate);
  };
  return (
    <>
      <BackButton />
      <Wrapper>
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
                  autoComplete="off"
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
                  autoComplete="off"
                />
              </InputWrapper>
              <LoginButton type="submit">로그인</LoginButton>
            </LoginForm>
            <LinkWrapper>
              <Link to={"/findId"} style={{ color: "cornflowerblue" }}>
                아이디 찾기
              </Link>
              <Link to={"/findPassword"} style={{ color: "cornflowerblue" }}>
                비밀번호 찾기
              </Link>
              <Link to={"/signup"} style={{ color: "cornflowerblue" }}>
                회원가입
              </Link>
            </LinkWrapper>
            <SocialWrapper>
              <a href="">
                <SocialButton src="assets/kakao_icon.png" color="yellow" />
              </a>
              <a href="http://localhost:8080/oauth2/authorization/google">
                <SocialButton src="assets/google_icon.png" color="white" />
              </a>
            </SocialWrapper>
          </LoginFormWrapper>
        </RoundedWrapper>
      </Wrapper>
    </>
  );
};

export default Login;
