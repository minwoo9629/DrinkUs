import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../../store/actions/user";
import {
  Wrapper,
  RoundedWrapper,
  BaseFlexColWrapper,
  InputWrapper,
} from "../../components/styled/Wrapper";
import { BaseForm } from "../../components/common/Forms/Form";
import styled from "styled-components";
import { BackButton } from "../../components/common/buttons/BackButton";
import { FailAlert, SuccessAlert } from "../../utils/sweetAlert";
import { client } from "../../utils/client";
import { AuthInput } from "../../components/common/inputs/AuthInput";
import { AuthButton } from "../../components/common/buttons/AuthButton";
import { SocialButton } from "../../components/common/buttons/SocialButton";
import { BaseLink } from "../../components/Link/BaseLink";
import { AUTH_CONSTANT } from "../../constants/AuthConstant";
import { login } from "../../api/AuthAPI";

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

    const response = await login(data);
    if (response.status === 400) {
      FailAlert(response.data.message);
      return;
    }
    const accessToken = response.headers["accesstoken"];
    const refreshToken = response.headers["refreshtoken"];
    sessionStorage.setItem("ACCESS_TOKEN", accessToken);
    sessionStorage.setItem("REFRESH_TOKEN", refreshToken);

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
          <BaseFlexColWrapper>
            <BaseForm onSubmit={onHandleSubmit}>
              <InputWrapper>
                <i className="fas fa-envelope"></i>
                <AuthInput
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
                <AuthInput
                  type="password"
                  value={state.password}
                  ref={passwordInput}
                  name="password"
                  onChange={onHandleInput}
                  placeholder="Password"
                  autoComplete="off"
                />
              </InputWrapper>
              <AuthButton type="submit">로그인</AuthButton>
            </BaseForm>
            <LinkWrapper>
              {AUTH_CONSTANT.map((item, idx) => (
                <BaseLink key={idx} to={item.link} color={"cornflowerblue"}>
                  {item.linkName}
                </BaseLink>
              ))}
            </LinkWrapper>
            <SocialWrapper>
              <a href="">
                <SocialButton src="assets/kakao_icon.png" color="yellow" />
              </a>
              <a href="http://localhost:8080/oauth2/authorization/google">
                <SocialButton src="assets/google_icon.png" color="white" />
              </a>
            </SocialWrapper>
          </BaseFlexColWrapper>
        </RoundedWrapper>
      </Wrapper>
    </>
  );
};

export default Login;
