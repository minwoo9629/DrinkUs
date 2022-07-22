import Header from "../../components/Header";
import styled from "styled-components";
import { Link } from "react-router-dom";

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
              <Button>카카오로 시작하기</Button>
              <Button>구글로 시작하기</Button>
              <Button>네이버로 시작하기</Button>
          </JoinForm>
        </NeonLoginWrapper>
      </Wrapper>

    </div>
  )
}

export default JoinType;