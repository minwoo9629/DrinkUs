import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {LoginFormWrapper, LoginForm, InputWrapper, LoginInput, LoginButton} from "./Login"
import {Wrapper, RoundedWrapper} from "../../components/styled/Wrapper"
import axios from "axios"

const FindPassword = () => {
  const [state, setState] = useState("");
  const userIdInput = useRef();
  const navigate = useNavigate();

  const onHandleInput = (e)=>{
    setState(e.target.value)
  };

  const onHandleSubmit = async (event) =>{
    event.preventDefault();
    if(state.length === 0){
      alert("ID 입력해~")
      return;
    }

    const BASE_URL = "http:localhost:8080"
    // const response = await axios.get(`${BASE_URL}/users/pw`,{userId: state})
    // const response = await axios.post(`${BASE_URL}/users/pw`,{userId: state})
    const response = await axios.get("https://jsonplaceholder.typicode.com/users/1").then(response => response)
    // const response = await axios.get("https://jsonplaceholder.typicode.com/users/1", {userId: state}).then(response => response)
    if(response.status === 200){
      alert("이메일 존재해요")
      let currentTime = new Date();
      currentTime.setMinutes(currentTime.getMinutes() + 5)
      document.cookie = `userId=${state}; path=/; expires=${currentTime}`;
      document.cookie = `userId=iphone@naver.com; path=/; expires=${currentTime}`;
      document.cookie = `userNickName=꼬부기`;
      document.cookie = `accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`;
      navigate("/result")
      // 입력한 id 값 쿠키에 저장하고
      // 결과 페이지
    }
  }

  return (
    <Wrapper>
        <RoundedWrapper  width={"450"} height={"700"} mWidth={"300"} mHeight={"460"}>
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
      </Wrapper>
  );
};

export default FindPassword;
