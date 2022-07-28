import Header from "../../components/Header";
import styled from "styled-components";
import { Link } from "react-router-dom";

// 소셜 로그인 종류 보고 api 문서 페이지에서 url 걸어주기
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

const JoinForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Button = styled.button`
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
`;

const socialLogin = (e) =>{
  window.location.replace(`http://localhost:8080/oauth2/authorization/${e.target.name}?redirect_uri=http://localhost:3000/`)
}

const JoinType = () => {

  return (
    <div>
      <Header />
      <Wrapper>
        <NeonLoginWrapper>
          <JoinForm>
            <h2>회원가입 종류 선택</h2>
            <Link to="/join">
              <Button>로컬 회원가입</Button>
            </Link>
              <Button name="kakao" onClick={socialLogin}>카카오로 시작하기</Button>
              <Button onClick={() => window.open(`http://localhost:8080/oauth2/authorization/kakao?redirect_uri=http://localhost:3000/`)}>카카오 소셜</Button>
              <Button name="google" onClick={socialLogin}>구글로 시작하기</Button>
              <Button name="naver" onClick={socialLogin}>네이버로 시작하기</Button>
          </JoinForm>
        </NeonLoginWrapper>
      </Wrapper>

    </div>
  )
}

export default JoinType;