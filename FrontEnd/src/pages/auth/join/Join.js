import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Header from "../../../components/layout/Header";
import { client } from "../../../utils/client";

const neon_text_color = "#2d00b4";
const NeonSignAnimation = keyframes`
0%,
  19%,
  21%,
  23%,
  25%,
  54%,
  56%,
  100% {
    text-shadow: -0.2rem -0.2rem 1rem #fff, 0.2rem 0.2rem 1rem #fff,
      0 0 2rem ${neon_text_color}, 0 0 4rem ${neon_text_color},
      0 0 6rem ${neon_text_color}, 0 0 8rem ${neon_text_color},
      0 0 10rem ${neon_text_color};
  }

  20%,
  24%,
`;
import {
  sendConfirmEmail,
  confirmEmail,
  doubleCheckEmail,
} from "../../../api/JoinAPI";
import { FailAlert, EmptyAlert, SuccessAlert } from "../../../utils/sweetAlert";

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
  border-radius: 13px;
  padding: 10px;
  height: 750px;
  background: rgb(56, 56, 56);
  background: linear-gradient(
    146deg,
    rgba(56, 56, 56, 0.9248074229691877) 0%,
    rgba(20, 20, 20, 1) 61%
  );
  width: 450px;
`;

const JoinWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const JoinForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  width: 320px;
  height: 45px;
  border-radius: 2px;
  border: none;
  background: rgb(230, 230, 230);
  margin: 5px 10px;
  position: relative;
  padding-left: 15px;

  input:focus {
    box-shadow: 0px 0px 6px #5983ff;
  }
`;

const Input = styled.input`
  width: 320px;
  height: 45px;
  font-size: 14px;
  background-color: transparent;
  border-radius: 2px;
  outline: none;
  border: none;
  color: #181818;
  margin-left: -15px;
  padding-left: 15px;

  &::placeholder {
    font-size: 14px;
    color: #b1b1b1;
  }
`;

const InputTag = styled.div`
  display: block;
  color: white;
  margin-left: 15px;
  margin-top: 10px;
  font-size: 13px;
  font-weight: bold;
`;

const InputDiv = styled.div`
  text-align: left;
`;

const ChekWrapper = styled.div`
  justify-content: right;
  align-items: center;
`;

const CheckButton = styled.button`
  width: 120px;
  height: 35px;
  border-radius: 10px;
  border: 1px solid black;
  background-color: #fff;
  color: #535353;
  margin: 0 10px;
`;

const ConfirmButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid black;
  background-color: #fff;
  color: #535353;
`;

const ButtonWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  width: 380px;
  align-items: center;
`;

const LinkWrapper = styled.div`
  display: flex;
  color: #fff;
  background-color: #131317;
  font-size: 23px;
  margin: 0 40px;
  text-transform: uppercase;
  animation: ${NeonSignAnimation} 1.5s infinite alternate;
  box-shadow: none;
  font-size: 25px;
  font-weight: bold;
`;

const DisabledLink = styled.div`
  display: flex;
  color: #757575;
  background-color: #131317;
  font-size: 23px;
  margin: 0 40px;
  box-shadow: none;
  font-size: 25px;
  font-weight: bold;
`;

const Guide = styled.div`
  font-size: 12px;
  color: #00b0ff;
  margin-left: 10px;
`;

const SendText = styled.a`
  margin-left: 10px;
  text-decoration: underline;
  font-size: 13px;
  color: white;

  &:hover {
    transition: all 0.1s linear;
    color: #dbdbdb;
    cursor: pointer;
  }
`;

const Timer = styled.div`
  margin-left: 10px;
  font-size: 13px;
  color: white;
`;

const Join = () => {
  const [second, setSecond] = useState(300);
  const [state, setState] = useState({
    // 회원가입 인풋
    userName: "",
    authToken: "",
    userPw: "",
    userPwCheck: "",
    userFullname: "",
    userBirthday: "",

    enabled: false,

    // 안내 문구
    email: {
      valid: false,
      guide: " 이메일을 입력해주세요.",
    },
    emailConfirm: {
      valid: false,
      guide: " 인증되지 않은 이메일입니다.",
    },
    certification: {
      valid: false,
      guide: " 인증 코드를 입력해주세요.",
    },
    password: {
      valid: false,
      guide: " 비밀번호는 8자 이상 20자이내여야 합니다.",
    },
    passwordCheck: {
      valid: false,
      guide: " 비밀번호가 일치하지 않습니다.",
    },
    userNameCheck: {
      valid: false,
      guide: " 이름은 필수값입니다.",
    },
    userBirthdayCheck: {
      valid: false,
      guide: " 생년월일은 필수값입니다.",
    },
  });

  useEffect(() => {
    if (
      state.email.valid &&
      state.certification.valid &&
      state.password.valid &&
      state.passwordCheck.valid &&
      state.userNameCheck.valid &&
      state.userBirthdayCheck.valid
    ) {
      setState({
        ...state,
        enabled: true,
      });
    } else {
      setState({
        ...state,
        enabled: false,
      });
    }
  }, [
    state.email.valid,
    state.certification.valid,
    state.password.valid,
    state.passwordCheck.valid,
    state.userNameCheck.valid,
    state.userBirthdayCheck.valid,
  ]);

  const navigate = useNavigate();

  const onHandleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    // 회원가입 client 요청
    client
      .post("/users/join", {
        userName: state.userName,
        userPw: state.userPw,
        userFullname: state.userFullname,
        userBirthday: state.userBirthday,
      })
      .then(function (response) {
        SuccessAlert("DRINKUS에 오신걸 환영합니다");
        navigate("/login");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // 비밀번호 유효성 체크
  const userPwRegex =
    // /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W)(?=\\S+$).{8,20}$/
    /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/i;
  const userPwCurrent = () => {
    if (!userPwRegex.test(state.userPw)) {
      if (state.userPw.length < 8 && state.userPw.length > 20) {
        setState({
          ...state,
          password: {
            valid: false,
            guide: " 비밀번호는 9자 이상 20자 이내여야 합니다.",
          },
        });
      } else {
        setState({
          ...state,
          password: {
            valid: false,
            guide:
              " 영문자와 숫자, 특수문자가 적어도 1개 이상 포함되어있어야 합니다.",
          },
        });
      }
    } else {
      setState({
        ...state,
        password: {
          valid: true,
          guide: " 유효한 비밀번호입니다.",
        },
      });
    }
  };

  const nameCkeck = () => {
    if (!state.userFullname) {
      setState({
        ...state,
        userNameCheck: { valid: false, guide: " 이름은 필수값입니다." },
      });
    } else {
      setState({ ...state, userNameCheck: { valid: true } });
    }
  };

  var birthDayRegex = /^[0-9]*$/;
  const birthCheck = () => {
    const today = new Date();
    if (!state.userBirthday) {
      setState({
        ...state,
        userBirthdayCheck: { valid: false, guide: " 생년월일은 필수값입니다." },
      });
    } else if (!birthDayRegex.test(state.userBirthday)) {
      setState({
        ...state,
        userBirthdayCheck: { valid: false, guide: " 숫자만 포함해주세요." },
      });
    } else if (state.userBirthday.length != 8) {
      setState({
        ...state,
        userBirthdayCheck: {
          valid: false,
          guide: " 다음과 같은 형식으로 입력해주세요: 19971101",
        },
      });
    } else if (today.getFullYear() - state.userBirthday.substring(0, 4) < 20) {
      setState({
        ...state,
        userBirthdayCheck: {
          valid: false,
          guide: " 20살 이하는 가입할 수 없습니다.",
        },
      });
    } else if (
      state.userBirthday.substring(4, 6) < 0 ||
      state.userBirthday.substring(4, 6) > 12 ||
      state.userBirthday.substring(6, 8) < 0 ||
      state.userBirthday.substring(6, 8) > 31
    ) {
      setState({
        ...state,
        userBirthdayCheck: {
          valid: false,
          guide: " 유효한 날짜를 입력해주세요.",
        },
      });
    } else {
      setState({ ...state, userBirthdayCheck: { valid: true } });
    }
  };

  // 비밀번호 확인 체크
  const userPwCheck = () => {
    if (state.userPw != state.userPwCheck) {
      setState({
        ...state,
        passwordCheck: {
          valid: false,
          guide: " 비밀번호가 일치하지 않습니다.",
        },
      });
    } else {
      setState({ ...state, passwordCheck: { valid: true } });
    }
  };

  // 이메일 인증번호 전송
  const onSendEmail = async (e) => {
    const data = {
      userName: state.userName,
    };
    const response = await sendConfirmEmail(data);
    if (response.status === 200) {
      let s = 300;
      setSecond(300);
      let highestIntervalId = setInterval(";");
      for (let i = 0; i < highestIntervalId; i++) {
        clearInterval(i);
      }
      SuccessAlert("입력하신 이메일로 인증번호가 발송됐습니다.");
      const interval = setInterval(() => {
        if (s === 0) clearInterval(interval);
        setSecond(s);
        s--;
      }, 1000);
    } else if (response.status === 400) {
      FailAlert("유효한 이메일을 입력해주세요.");
    }
  };

  // 인증번호 확인
  const onConfirmEmail = async (e) => {
    const data = {
      userName: state.userName,
      authToken: state.authToken,
    };

    if (data.authToken.length == 0) {
      setState({
        ...state,
        certification: {
          valid: false,
          guide: " 인증 코드를 입력해주세요.",
        },
      });
    }

    const response = await confirmEmail(data);
    if (response.status === 200) {
      setState({
        ...state,
        certification: { valid: true, guide: "인증이 완료되었습니다." },
      });
    } else {
      setState({
        ...state,
        certification: {
          valid: false,
          guide: " 유효하지 않거나 만료된 인증 코드입니다.",
        },
      });
    }
  };

  // 중복확인
  const onDoubleCheck = async (e) => {
    if (state.userName.length == 0) {
      setState({
        ...state,
        email: { valid: false, guide: " 이메일을 입력해주세요." },
      });
      return;
    }

    const data = {
      userName: state.userName,
    };
    const response = await doubleCheckEmail(data);

    if (response.status === 200) {
      setState({
        ...state,
        email: { valid: true, guide: " 사용 가능한 이메일입니다." },
      });
    } else if (response.status === 400) {
      const msg = response.data.attributes
        ? response.data.attributes.userName
        : response.data.message;
      setState({
        ...state,
        email: {
          valid: false,
          guide: msg,
        },
      });
    }
  };

  return (
    <div>
      <Header />
      <Wrapper>
        <NeonLoginWrapper>
          <JoinWrapper>
            {/* 제출 폼 */}
            <JoinForm>
              <InputDiv>
                <InputTag>이메일</InputTag>
                <InputWrapper>
                  <Input
                    type="email"
                    value={state.userName}
                    name="userName"
                    placeholder="example@naver.com"
                    onChange={onHandleInput}
                    onBlur={() => {
                      onDoubleCheck();
                    }}
                  ></Input>
                </InputWrapper>

                <Guide
                  style={
                    state.email.valid
                      ? { color: "#00b0ff" }
                      : { color: "#d62929" }
                  }
                >
                  {state.email.valid ? (
                    <i class="fa fa-check"></i>
                  ) : (
                    <i class="fa fa-times"></i>
                  )}
                  {state.email.guide}
                </Guide>
                {state.certification.valid ? (
                  <></>
                ) : (
                  <>
                    <Guide
                      style={
                        state.emailConfirm.valid
                          ? { color: "#00b0ff" }
                          : { color: "#d62929" }
                      }
                    >
                      {state.emailConfirm.valid ? (
                        <i class="fa fa-check"></i>
                      ) : (
                        <i class="fa fa-times"></i>
                      )}
                      {state.emailConfirm.guide}
                    </Guide>
                  </>
                )}
              </InputDiv>
              <InputDiv>
                <InputTag>인증번호</InputTag>
                <InputWrapper>
                  <Input
                    type="string"
                    value={state.authToken}
                    name="authToken"
                    onChange={onHandleInput}
                    onBlur={() => {
                      onConfirmEmail();
                    }}
                  />
                </InputWrapper>
                {state.emailConfirm.valid ? (
                  <></>
                ) : (
                  <>
                    <Guide
                      style={
                        state.certification.valid
                          ? { color: "#00b0ff" }
                          : { color: "#d62929" }
                      }
                    >
                      {state.certification.valid ? (
                        <i class="fa fa-check"></i>
                      ) : (
                        <i class="fa fa-times"></i>
                      )}
                      {state.certification.guide}
                    </Guide>
                    <SendText onClick={onSendEmail}>인증번호 전송</SendText>
                    {state.certification.valid ? (
                      <></>
                    ) : (
                      <>
                        <Timer>
                          {Math.ceil((second + 1) / 60) - 1}:
                          {(second % 60 < 10 ? "0" : "") + (second % 60)}
                        </Timer>
                      </>
                    )}
                  </>
                )}
              </InputDiv>
              <InputDiv>
                <InputTag>비밀번호</InputTag>
                <InputWrapper>
                  <Input
                    type="password"
                    value={state.userPw}
                    name="userPw"
                    onChange={onHandleInput}
                    onBlur={() => {
                      userPwCurrent();
                    }}
                  />
                </InputWrapper>

                {state.password.valid ? (
                  <></>
                ) : (
                  <>
                    <Guide
                      style={
                        state.password.valid
                          ? { color: "#00b0ff" }
                          : { color: "#d62929" }
                      }
                    >
                      {state.password.valid ? (
                        <i class="fa fa-check"></i>
                      ) : (
                        <i class="fa fa-times"></i>
                      )}
                      {state.password.guide}
                    </Guide>
                  </>
                )}
              </InputDiv>
              <InputDiv>
                <InputTag>비밀번호 확인</InputTag>
                <InputWrapper>
                  <Input
                    type="password"
                    value={state.userPwCheck}
                    name="userPwCheck"
                    onChange={onHandleInput}
                    onBlur={() => {
                      userPwCheck();
                    }}
                  />
                </InputWrapper>
                {state.passwordCheck.valid ? (
                  <></>
                ) : (
                  <>
                    <Guide
                      style={
                        state.passwordCheck.valid
                          ? { color: "#00b0ff" }
                          : { color: "#d62929" }
                      }
                    >
                      {state.passwordCheck.valid ? (
                        <i class="fa fa-check"></i>
                      ) : (
                        <i class="fa fa-times"></i>
                      )}
                      {state.passwordCheck.guide}
                    </Guide>
                  </>
                )}
              </InputDiv>
              <InputDiv>
                <InputTag>이름</InputTag>
                <InputWrapper>
                  <Input
                    type="userFullname"
                    value={state.userFullname}
                    name="userFullname"
                    onChange={onHandleInput}
                    onBlur={() => {
                      nameCkeck();
                    }}
                  />
                </InputWrapper>{" "}
                {state.userNameCheck.valid ? (
                  <></>
                ) : (
                  <>
                    <Guide
                      style={
                        state.userNameCheck.valid
                          ? { color: "#00b0ff" }
                          : { color: "#d62929" }
                      }
                    >
                      {state.userNameCheck.valid ? (
                        <i class="fa fa-check"></i>
                      ) : (
                        <i class="fa fa-times"></i>
                      )}
                      {state.userNameCheck.guide}
                    </Guide>
                  </>
                )}
              </InputDiv>
              <InputDiv>
                <InputTag>생년월일</InputTag>
                <InputWrapper>
                  <Input
                    type="text"
                    value={state.userBirthday}
                    name="userBirthday"
                    onChange={onHandleInput}
                    placeholder="19991212"
                    onBlur={() => {
                      birthCheck();
                    }}
                  />
                </InputWrapper>{" "}
                {state.userBirthdayCheck.valid ? (
                  <></>
                ) : (
                  <>
                    <Guide
                      style={
                        state.userBirthdayCheck.valid
                          ? { color: "#00b0ff" }
                          : { color: "#d62929" }
                      }
                    >
                      {state.userBirthdayCheck.valid ? (
                        <i class="fa fa-check"></i>
                      ) : (
                        <i class="fa fa-times"></i>
                      )}
                      {state.userBirthdayCheck.guide}
                    </Guide>
                  </>
                )}
              </InputDiv>
            </JoinForm>
            <ButtonWrapper>
              <Link to="/join/type" style={{ textDecoration: "none" }}>
                {state.enabled ? (
                  <LinkWrapper onClick={onHandleSubmit}>가입하기</LinkWrapper>
                ) : (
                  <></>
                )}
              </Link>
              {!state.enabled ? <DisabledLink>가입하기</DisabledLink> : <></>}
            </ButtonWrapper>
          </JoinWrapper>
        </NeonLoginWrapper>
      </Wrapper>
    </div>
  );
};
export default Join;
