import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Header from "../../components/Header";

const Wallpaper = styled.div`
  background-color: #black;
  width: 100vw;
  height: 100vh;
  display: 12rem;
  justify-content: center;
  align-items: center;
`;

const JoinForm = styled.div`
  background-color: #131317;
  width: 40vw;
  height: 100vh;
  display: table;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
  align-items: center;
  border-radius: 40px;
`;

const InputContainer = styled.div`
  display: flex;
  width: 500px;
  justify-content: center;
  flex-direction: column;
  margin: 14px;
  align-items: flex-start;
`;

const UserInput = styled.input`
  position: relative;
  height: 64px;
  width: 280px;
  top: 7px;
  font-size: 18px;
  background-color: #b1a5c8;
  outline: none;
  border: 1px solid black;
  margin: 0px;
  color: white;
  border-radius: 20px;
`;

const DuplicationCheckButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid black;
  background-color: #fff;
  margin: 14px;
  font-size: 4px;
  color: #535353;
  cursor: pointer;
`;

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

  20%,
  24%,
  55% {
    text-shadow: none;
    box-shadow: none;
  }
`;

const JoinButton = styled.button`
  font-size: 1rem;
  font-weight: 200;
  font-style: italic;
  color: #fff;
  padding: 1rem 1.2rem 1.1rem;
  border: 0.4rem solid #131317;
  border-radius: 2rem;
  text-transform: uppercase;
  background-color: #131317;
  cursor: pointer;
  animation: ${NeonSignAnimation} 10000s infinite alternate;
`;


const Join = () => {
    const [state, setState] = useState({
        userId: "",
        // certificationNumber: "",
        password: "",
        passwordCheck: "",
        userName: "",
        userBirth: "",
    });

    const userIdInput = useRef();
    const passwordInput = useRef();
    const passwordCheckInput = useRef();
    const userNameInput = useRef();
    const userBirthInput = useRef();

    const onHandleInput = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
      };
    
    const onHandleSubmit = () => {
    // if (state.userId.length === 0) {
    //     userIdInput.current.focus();
    //     return;
    // }
    // if (state.password.length === 0) {
    //     passwordInput.current.focus();
    //     return;
    // }
    // if (state.passwordCheck.length === 0) {
    //     passwordCheckInput.current.focus();
    //     return;
    //     }
    // if (state.userName.length === 0) {
    //     userNameInput.current.focus();
    //     return;
    // }
    // if (state.userBirth.length === 0) {
    //     userBirthInput.current.focus();
    //     return;
    // }
    alert("중복확인이랑 최종제출을 하나의 함수로 가능? action.type 으로 설정 가능한가?");
  };
  return (
    <div>
      <Header />
      <Wallpaper>
        <JoinForm>
            <InputContainer>
                <UserInput
                type="userId"
                value={state.userId}
                ref={userIdInput}
                name="userId"
                onChange={onHandleInput}
                placeholder="이메일을 입력하세요"
                />
                <DuplicationCheckButton onClick={onHandleSubmit}>중복확인</DuplicationCheckButton>
            </InputContainer>
            <InputContainer>
                <UserInput
                type="password"
                value={state.password}
                ref={passwordInput}
                name="password"
                onChange={onHandleInput}
                placeholder="비밀번호를 입력하세요"
                />
            </InputContainer>
            <InputContainer>
                <UserInput
                type="passwordCheck"
                value={state.passwordCheck}
                ref={passwordCheckInput}
                name="passwordCheck"
                onChange={onHandleInput}
                placeholder="비밀번호 확인"
                />
            </InputContainer>
            <InputContainer>
                <UserInput
                type="userName"
                value={state.userName}
                ref={userNameInput}
                name="userName"
                onChange={onHandleInput}
                placeholder="이름"
                />
            </InputContainer>
            {/* 생년월일(연도(인풋, 4자)-월(드롭박스)-일(인풋)) */}
            <InputContainer>
                <UserInput
                type="userBirth"
                value={state.userBirth}
                ref={userBirthInput}
                name="userBirth"
                onChange={onHandleInput}
                placeholder="생년월일"
                />
            </InputContainer>
            <InputContainer>
                <JoinButton onClick={onHandleSubmit}>JOIN</JoinButton>
                <Link to="/">
                  <JoinButton>MAIN</JoinButton>
                </Link>
            </InputContainer>
        </JoinForm>
      </Wallpaper>
    </div>
  );
};

export default Join;