import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Header from "../../../components/layout/Header";
import { client } from "../../../utils/client";
import { AuthInput } from "../../../components/common/inputs/AuthInput";
import {
  sendConfirmEmail,
  confirmEmail,
  doubleCheckEmail
  } from "../../../api/JoinAPI";
import { FailAlert, EmptyAlert, SuccessAlert } from "../../../utils/sweetAlert";


const neon_text_color = "#5904de";
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
`


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
  display: block;
  justify-content: space-between;
  align-items: center;
  width: 320px;
  height: 64px;
  border-radius: 36px;
  border: 1px solid black;
  background-color: #676775;
  margin: 10px;
  position: relative;
`;

const JoinInput = styled.input`
  position: relative;
  height: 30px;
  width: 200px;
  top: 7px;
  font-size: 18px;
  background-color: transparent;
  outline: none;
  border: none;
  margin: 0px;
  color: white;
`;

const ChekWrapper = styled.div`
  justify-content: right;
  align-items: center;
`

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

const Button = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid black;
  background-color: #fff;
  margin: 14px;
  font-size: 4px;
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
  font-style: italic;
  text-transform: uppercase;
  animation: ${NeonSignAnimation} 1.5s infinite alternate;
  box-shadow: none;
`;

const Join = () => {
  const [state, setState] = useState({
    // 회원가입 인풋
    userName: "",
    authToken: "",
    userPw: "",
    userPwCheck: "",
    userFullname: "",
    userBirthday: "",

    // 유효 문구
    nameMsg: "",
    confirmMsg: "",
    nameDoubleMsg: "",
    userPwMsg: "",
    userPwCheckMsg: "",

    // 유효 여부
    nameValid: "",
    confirmValid: false, // 인증번호 유효
    userPwValid: false,
    userPwCheckValid: false,
    doubleCheckValid: false,
  });
  // disabled 설정하기 위한 변수
  const enabled = (state.confirmValid === true) && (state.userPwValid === true) && (state.userPwCheckValid === true) && (state.doubleCheckValid === true)

  const navigate = useNavigate();

  const onHandleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    // 이메일 유효성 체크
    const idRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const idCurrent = state.userName;
    if (!idRegex.test(idCurrent)) {
      setState({ ...state, nameMsg: "유효하지 않은 이메일 형식입니다" });
      setState({ ...state, nameValid: false });
      FailAlert("유효하지 않은 이메일 형식입니다");
    } else {
      setState({ ...state, nameMsg: "이메일OK" });
      setState({ ...state, nameValid: true });
      console.log("이메일 통과O");
    }

    // 비밀번호 유효성 체크
    const userPwRegex =
      // /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W)(?=\\S+$).{8,20}$/
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/i;
    const userPwCurrent = state.userPw;
    if (!userPwRegex.test(userPwCurrent)) {
      setState({
        ...state,
        userPwMsg:
          "비밀번호는 영문자와 숫자,특수기호가 적어도 1개 이상씩 포함된 8자~20자의 비밀번호여야 합니다.",
      });
      // setState({ ...state, userPwValid: false });
      FailAlert(
        "비밀번호는 영문자와 숫자,특수기호가 적어도 1개 이상씩 포함된 8자~20자의 비밀번호여야 합니다."
      );
      console.log("비밀번호 통과X");
    } else {
      setState({ ...state, userPwMsg: "비밀번호OK" });
      setState({ ...state, userPwValid: true });
      console.log("비밀번호 통과O");
    }

    // 중복확인 체크
    if (state.doubleCheckValid === false) {
      FailAlert("이메일 중복확인을 진행해 주세요")
    }

    // 이메일 인증 체크
    if (state.confirmValid === false) {
      FailAlert("이메일 인증을 진행해 주세요")
    }

    // 비밀번호 확인 체크
    const userPwCheck = state.userPwCheck;
    if (userPwCheck !== state.userPw) {
      // setState({ ...state, userPwCheckValid: false });
      FailAlert("비밀번호가 일치하지 않습니다");
    } else {
      setState({ ...state, userPwCheckValid: true });
    }

    // 이름 유효 체크
    if (state.userFullname.length === 0) {
      FailAlert("이름은 필수 입력 항목입니다");
    }

    // 생년월일 유효 체크  나중에 8자리 됐을 때 20살 이상인지 체크하는거 추가하자
    if (state.userBirthday.length === 0) {
      FailAlert("생년월일은 필수 입력 항목입니다");
    }

    // 회원가입 client 요청
    client
      .post("/users/join", {
        userName: state.userName,
        userPw: state.userPw,
        userFullname: state.userFullname,
        userBirthday: state.userBirthday,
      })
      .then(function (response) {
        console.log(response.data.message);
        SuccessAlert("DRINKUS에 오신걸 환영합니다")
        navigate("/login");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // 이메일 인증번호 전송
  const onSendEmail = async (e) => {
    const data = {
      userName: state.userName
    };
    const response = await sendConfirmEmail(data);
    if (response.status === 200) {
      EmptyAlert("입력하신 이메일로 인증번호가 발송됐습니다. 5분안에 인증을 진행해주세요.")
    }
  };

  // 인증번호 확인
  const onConfirmEmail = async (e) => {
    const data = {
      userName: state.userName,
      authToken: state.authToken
    };
    const response = await confirmEmail(data);
    if (response.status === 200)
      {setState({...state, confirmValid: true});
      SuccessAlert("유효한 인증번호입니다");
    }else{FailAlert("인증 코드가 만료되었거나 비정상 접근입니다. 인증을 다시 진행해 주세요.")}
  };

  // 중복확인
  const onDoubleCheck = async (e) => {
    const data = {
      userName: state.userName
    };
    const response = await doubleCheckEmail(data);
    if (response.status === 200) {
      setState({ ...state, doubleCheckValid: true });
      EmptyAlert("유효한 이메일입니다. 이메일 인증을 진행해 주세요")
    }
    if (response.status === 400) {
      FailAlert("중복된 회원이거나 유효하지 않은 이메일 형식입니다")
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
              <InputWrapper>
              <i className="fas fa-envelope"></i>
                <AuthInput
                  type="email"
                  value={state.userName}
                  name="userName"
                  placeholder="Email ID"
                  onChange={onHandleInput}
                />
              </InputWrapper>
              <ChekWrapper>
              <CheckButton onClick={onDoubleCheck}>
                  중복확인
                </CheckButton>
                <CheckButton onClick={onSendEmail}>
                  이메일 인증
                </CheckButton>
              </ChekWrapper>
              <InputWrapper>
              <i className="fas fa-lock"></i>
                <AuthInput
                  type="string"
                  value={state.authToken}
                  name="authToken"
                  placeholder="인증번호"
                  onChange={onHandleInput}
                />
                <ConfirmButton onClick={onConfirmEmail}>
                  확인
                </ConfirmButton>
              </InputWrapper>
              <InputWrapper>
              <i className="fas fa-lock"></i>
                <AuthInput
                  type="password"
                  value={state.userPw}
                  placeholder="Password"
                  name="userPw"
                  onChange={onHandleInput}
                />
              </InputWrapper>
              <InputWrapper>
              <i className="fas fa-lock"></i>
                <AuthInput
                  type="password"
                  value={state.userPwCheck}
                  placeholder="Password 확인"
                  name="userPwCheck"
                  onChange={onHandleInput}
                />
              </InputWrapper>
              <InputWrapper>
              <i className="fas fa-user"></i>
                <AuthInput
                  type="userFullname"
                  value={state.userFullname}
                  name="userFullname"
                  placeholder="이름"
                  onChange={onHandleInput}
                />
              </InputWrapper>
              <InputWrapper>
              <i className="fas fa-user"></i>
                <AuthInput
                  type="userBirthday"
                  value={state.userBirthday}
                  name="userBirthday"
                  onChange={onHandleInput}
                  placeholder="생년월일 ex)19991212"
                />
              </InputWrapper>
            </JoinForm>
            {/* 모든 유효성 검사 후 버튼 활성화 */}
            <ButtonWrapper>
            <Link to="/" style={{textDecoration:"none"}}>
                <LinkWrapper>MAIN</LinkWrapper>
              </Link>
              <Link to="/join/type" style={{textDecoration:"none"}}>
                <LinkWrapper
                  disabled={
                    // !(state.nameValid &&
                    // state.confirmValid &&
                    // state.userPwValid &&
                    // state.userPwCheckValid)
                    !enabled
                  }
                  onClick={onHandleSubmit}
                >
                  JOIN
                </LinkWrapper>
              </Link>
            </ButtonWrapper>
          </JoinWrapper>
        </NeonLoginWrapper>
      </Wrapper>
    </div>
  );
};
export default Join;
