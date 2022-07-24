import { useRef, useState } from "react";
import { Link } from "react-router-dom";
// import styled, { keyframes } from "styled-components";
import styled from "styled-components";
import Header from "../../components/Header";

const Wrapper = styled.div`
  background-color: black;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

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

const JoinForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  justify-content: space-between;
  width: 320px;
  height: 64px;
  border-radius: 36px;
  border: 1px solid black;
  background-color: #605d9f;
  margin: 14px;
  position: relative;
`;

const GuideLine = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  color: white;
`;

const EmailInput = styled.input`
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

const PasswordInput = styled.input`
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

const ButtonWrapper = styled.div`
margin-top: 30px;
/* display: flex; */
justify-content: space-between;
width: 120px;
flex-direction: column;
`;

const JoinButton = styled.button`
  font-size: 1rem;
  font-weight: 200;
  color: #fff;
  padding: 1rem 1.2rem 1.1rem;
  border: 0.4rem solid #131317;
  border-radius: 2rem;
  text-transform: uppercase;
  background-color: #605d9f;
  flex-direction: column;
  cursor: pointer;
`;

const Join = () => {
  const [state, setState] = useState({
      userId: "",
      certificationNumber: "",
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
  if (state.userId.length === 0) {
      userIdInput.current.focus();
      alert("id 입력하세요")
      return;
  }
  if (state.password.length === 0) {
      passwordInput.current.focus();
      alert("비밀번호 입력하세요")
      return;
  }
  if (state.passwordCheck !== state.password) {
      passwordCheckInput.current.focus();
      alert("비밀번호가 일치하지 않습니다")
      return;
      }
  if (state.userName.length === 0) {
      userNameInput.current.focus();
      alert("이름 입력하세요")
      return;
  }
  if (state.userBirth.length === 0) {
      userBirthInput.current.focus();
      alert("생일 입력하세요")
      return;
  }
  alert("드링커스에 오신걸 환영합니다 -- 이름도 띄워줄까?");
  };
   return (
     <div>
       <Header />
       <Wrapper>
         <NeonLoginWrapper>
             <JoinWrapper>
                <JoinForm onSubmit={onHandleSubmit}>
                  <GuideLine>이메일을 입력</GuideLine>
                  <InputWrapper>
                    <EmailInput
                      type="userId"
                      value={state.userId}
                      ref={userIdInput}
                      name="userId"
                      onChange={onHandleInput}
                    />
                    <DuplicationCheckButton onClick={onHandleSubmit}>중복확인</DuplicationCheckButton>
                  </InputWrapper>
                  <GuideLine>비밀번호 입력</GuideLine>
                  <InputWrapper>
                    <PasswordInput
                      type="password"
                      value={state.password}
                      ref={passwordInput}
                      name="password"
                      onChange={onHandleInput}
                  />
                  </InputWrapper>
                  <GuideLine>비밀번호 확인</GuideLine>
                  <InputWrapper>
                    <PasswordInput
                      type="password"
                      value={state.passwordCheck}
                      ref={passwordCheckInput}
                      name="passwordCheck"
                      onChange={onHandleInput}
                    />
                  </InputWrapper>
                  <GuideLine>이름 입력</GuideLine>
                  <InputWrapper>
                    <EmailInput
                      type="userName"
                      value={state.userName}
                      ref={userNameInput}
                      name="userName"
                      onChange={onHandleInput}
                    />
                  </InputWrapper>
                  <GuideLine>생년월일</GuideLine>
                    <form>
                      <p><input type="date" value="2000-01-01" min="1900-01-01" max="2003-01-01" /></p>
                    </form>
                </JoinForm>
             </JoinWrapper>
             <ButtonWrapper>
                 <JoinButton onClick={onHandleSubmit}>JOIN</JoinButton>
                 <Link to="/">
                  <JoinButton>뒤로가기로 바꿀예정</JoinButton>
                 </Link>
             </ButtonWrapper>
         </NeonLoginWrapper>
       </Wrapper>
     </div>
   );
 };

 export default Join;