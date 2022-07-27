import { useState } from "react";
import { Link} from "react-router-dom";
import styled from "styled-components";
import Header from "../../components/Header";
import axios from "axios";

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

const JoinForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const GuideLine = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  color: white;
`;

const InputWrapper = styled.div`
  justify-content: space-between;
  width: 320px;
  height: 64px;
  border-radius: 36px;
  border: 1px solid black;
  background-color: #676775;
  margin: 14px;
  position: relative;
`;

const JoinInput = styled.input`
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


const Join = () => {
  const [state, setState] = useState({
    userId: "",
    userPw: "",
    userPwCheck: "",
    userName: "",
    userBday: "",

    idMsg: "",
    pwMsg: "",
    pwCheckMsg: "",
    nameMsg: "",
    bdayMsg: "",

    idValid: "",
    pwValid: "",
    pwCheckValid: "",
    bdayValid: "",
  });

  const onHandleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    // 이메일 유효성 체크
    const idRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        const idCurrent = state.userId
        if (!idRegex.test(idCurrent)) {
          setState({...state, idMsg: "유효하지 않은 이메일 형식입니다"});
          setState({ ...state, idValid: "false" });
          alert("유효하지 않은 이메일 형식입니다")
        } else {
          setState({ ...state, idMsg: "이메일OK" });
          setState({ ...state, idValid: "true" });
          console.log('이메일 통과O')
        }
    
    // 비밀번호 유효성 체크
    const pwRegex =
      // /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W)(?=\\S+$).{8,20}$/
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/i
        const pwCurrent = state.userPw
        if (!pwRegex.test(pwCurrent)) {
          setState({...state, pwMsg: "비밀번호는 영문 대,소문자와 숫자,특수기호가 적어도 1개 이상씩 포함된 8자~20자의 비밀번호여야 합니다."});
          setState({ ...state, pwValid: "false" });
          alert("비밀번호는 영문 대,소문자와 숫자,특수기호가 적어도 1개 이상씩 포함된 8자~20자의 비밀번호여야 합니다.")
          console.log("비밀번호 통과X")
        } else {
          setState({ ...state, idMsg: "비밀번호OK" });
          setState({ ...state, idValid: "true" });
          alert("비밀번호 OK")
          console.log('비밀번호 통과O')
        }
    // 비밀번호 중복 체크
    const pwCheck = state.userPwCheck
    if (pwCheck !== state.userPw) {
      alert("비밀번호가 일치하지 않습니다")
      console.log("비밀번호 일치X")
    }

    // axios 요청
    axios.post("http://localhost:8080/users/join", {
      userId: state.userId,
      userPw: state.userPw,
      userName: state.userName,
      userBday: state.userBday
    }).then(function (response) {
      if(response.data.code === 200) {
        console.log("회원가입 완료")
      } else {
        console.log("회원가입 실패")
      }
    }).catch(function(error) {
      console.log(error);
    })
  }

  return (
    <div>
      <Header />
      <Wrapper>
        <NeonLoginWrapper>
          <JoinWrapper>
            {/* 제출 폼 */}
            <JoinForm>
              <GuideLine>이메일</GuideLine>
              <InputWrapper>
                <JoinInput
                  type="userId"
                  value={state.userId}
                  name="userId"
                  onChange={onHandleInput}
                />
              </InputWrapper>
              <GuideLine>비밀번호</GuideLine>
              <InputWrapper>
                <JoinInput
                  type="userpw"
                  value={state.userPw}
                  name="userPw"
                  onChange={onHandleInput}
                />
              </InputWrapper>
              <GuideLine>비밀번호 확인</GuideLine>
              <InputWrapper>
                <JoinInput
                  type="pwCheck"
                  value={state.userPwCheck}
                  name="userPwCheck"
                  onChange={onHandleInput}
                />
              </InputWrapper>
              <GuideLine>이름</GuideLine>
              <InputWrapper>
                <JoinInput
                  type="userName"
                  value={state.userName}
                  name="userName"
                  onChange={onHandleInput}
                />
              </InputWrapper>
              <GuideLine>생년월일</GuideLine>
              <JoinInput
               type="date"
               value={state.userBday}
               name="userBday"
               min="1900-01-01"
               max="2003-12-31"
               onChange={onHandleInput}
               />
            <Button onClick={onHandleSubmit}>JOIN</Button>
            <Link to="/"> 
              <Button>MAIN</Button>
            </Link>
            </JoinForm>
          </JoinWrapper>
        </NeonLoginWrapper>
      </Wrapper>
    </div>
  );
};

export default Join;

// import { useState } from "react";
// import { Link } from "react-router-dom";
// // import styled, { keyframes } from "styled-components";
// import styled from "styled-components";
// import Header from "../../components/Header";

// // import axios from 'axios';


// // alert창 빼고 포커싱+문구
// // 생일 입력 max 값 수정
// // 회원가입 로직 짤 것 (api, axios 요청)
// const Wrapper = styled.div`
//   background-color: black;
//   width: 100vw;
//   height: 100vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `

// const NeonLoginWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   border-radius: 40px;
//   height: 700px;
//   background-color: #131317;
//   width: 450px;
// `;

// const JoinWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   flex-direction: column;
//   align-items: center;
// `;

// const JoinForm = styled.form`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
// `;

// const InputWrapper = styled.div`
//   justify-content: space-between;
//   width: 320px;
//   height: 64px;
//   border-radius: 36px;
//   border: 1px solid black;
//   background-color: #605d9f;
//   margin: 14px;
//   position: relative;
// `;

// const GuideLine = styled.div`
//   display: flex;
//   justify-content: center;
//   flex-direction: column;
//   color: white;
// `;

// const EmailInput = styled.input`
// position: relative;
// height: 30px;
// width: 280px;
// top: 7px;
// font-size: 18px;
// background-color: transparent;
// outline: none;
// border: none;
// margin: 0px;
// color: white;
// `;

// const PasswordInput = styled.input`
// position: relative;
// height: 30px;
// width: 280px;
// top: 7px;
// font-size: 18px;
// background-color: transparent;
// outline: none;
// border: none;
// margin: 0px;
// color: white;
// `;

// const DuplicationCheckButton = styled.button`
//   width: 40px;
//   height: 40px;
//   border-radius: 10px;
//   border: 1px solid black;
//   background-color: #fff;
//   margin: 14px;
//   font-size: 4px;
//   color: #535353;
//   cursor: pointer;
// `;

// const ButtonWrapper = styled.div`
// margin-top: 30px;
// /* display: flex; */
// justify-content: space-between;
// width: 120px;
// flex-direction: column;
// `;

// const JoinButton = styled.button`
//   font-size: 1rem;
//   font-weight: 200;
//   color: #fff;
//   padding: 1rem 1.2rem 1.1rem;
//   border: 0.4rem solid #131317;
//   border-radius: 2rem;
//   text-transform: uppercase;
//   background-color: #605d9f;
//   flex-direction: column;
//   cursor: pointer;
// `;

// const Join = () => {
//   const [state, setState] = useState({
//       userId: "",
//       password: "",
//       passwordCheck: "",
//       userName: "",
//       userBirth: "",

//       idMsg: "",
//       pwMsg: "",
//       pwCheckMsg: "",

//       idValid: "",
//       pwValid: "",
//       pwCheckValid: ""
//     });

//   // const userIdInput = useRef();
//   // const passwordInput = useRef();
//   // const passwordCheckInput = useRef();
//   // const userNameInput = useRef();
//   // const userBirthInput = useRef();

//   const onHandleInput = (e) => {
//       setState({ ...state, [e.target.name]: e.target.value });
//     };

//   const onHandleSubmit = (e) => {
//     setState({ ...state, [e.target.name]: e.target.value });
//   // 이메일 유효성 체크
//   const emailRegex =
//       /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
//     const emailCurrent = e.target.value
//     state.userId(emailCurrent)

//     if (!emailRegex.test(emailCurrent)) {
//       state.idMsg('이메일 형식이 틀렸어요! 다시 확인해주세요 ㅜ ㅜ')
//       state.idValid(false)
//     } else {
//       state.idMessage('올바른 이메일 형식이에요 : )')
//       state.idValid(true)
//     }
//   }
//   if (state.userId.length === 0) {
//     // userIdInput.current.focus();
//     alert("비밀번호 입력하세요")
//     return;
//   }
//   if (state.password.length === 0) {
//       // passwordInput.current.focus();
//       alert("비밀번호 입력하세요")
//       return;
//   }
//   if (state.passwordCheck !== state.password) {
//       // passwordCheckInput.current.focus();
//       alert("비밀번호가 일치하지 않습니다")
//       return;
//       }
//   if (state.userName.length === 0) {
//       // userNameInput.current.focus();
//       alert("이름 입력하세요")
//       return;
//   }
//   if (state.userBirth.length === 0) {
//       // userBirthInput.current.focus();
//       alert("생일 입력하세요")
//       return;
//   }
//   alert("드링커스에 오신걸 환영합니다 -- 이름도 띄워줄까?");
  
//    return (
//      <div>
//        <Header />
//        <Wrapper>
//          <NeonLoginWrapper>
//              <JoinWrapper>
//                 <JoinForm onSubmit={onHandleSubmit}>
//                   <GuideLine>이메일을 입력</GuideLine>
//                   <InputWrapper>
//                     <EmailInput
//                       type="userId"
//                       value={state.userId}
//                       // ref={userIdInput}
//                       name="userId"
//                       onChange={onHandleInput}
//                     />
//                     <DuplicationCheckButton onClick={onHandleSubmit}>중복확인</DuplicationCheckButton>
//                   </InputWrapper>
//                   <GuideLine>비밀번호 입력</GuideLine>
//                   <InputWrapper>
//                     <PasswordInput
//                       type="password"
//                       value={state.password}
//                       // ref={passwordInput}
//                       name="password"
//                       onChange={onHandleInput}
//                   />
//                   </InputWrapper>
//                   <GuideLine>비밀번호 확인</GuideLine>
//                   <InputWrapper>
//                     <PasswordInput
//                       type="password"
//                       value={state.passwordCheck}
//                       // ref={passwordCheckInput}
//                       name="passwordCheck"
//                       onChange={onHandleInput}
//                     />
//                   </InputWrapper>
//                   <GuideLine>이름 입력</GuideLine>
//                   <InputWrapper>
//                     <EmailInput
//                       type="userName"
//                       value={state.userName}
//                       // ref={userNameInput}
//                       name="userName"
//                       onChange={onHandleInput}
//                     />
//                   </InputWrapper>
//                   <GuideLine>생년월일</GuideLine>
//                   <input type="date" value="2000-01-01" min="1900-01-01" max="2003-01-01" />
//                 </JoinForm>
//              </JoinWrapper>
//              <ButtonWrapper>
//                  <JoinButton onClick={onHandleSubmit}>JOIN</JoinButton>
//                  <Link to="/">
//                   <JoinButton>뒤로가기로 바꿀예정</JoinButton>
//                  </Link>
//              </ButtonWrapper>
//          </NeonLoginWrapper>
//        </Wrapper>
//      </div>
//    );
//  };

//  export default Join;