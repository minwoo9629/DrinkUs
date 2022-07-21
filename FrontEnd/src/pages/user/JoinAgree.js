import Header from "../../components/Header";
import { Link } from "react-router-dom";
import styled from "styled-components";

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
  font-size: 30px;
`;

const AgreeWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const ButtonWrapper = styled.div`
margin-top: 30px;
display: flex;
justify-content: space-between;
width: 120px;
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

const JoinAgree = () => {

  return (
    <div>
      <Header/>
      <Wrapper>
        <NeonLoginWrapper>
          <AgreeWrapper> 이용정보 동의 받을 곳
          </AgreeWrapper>
          <ButtonWrapper>
            <Link to="/join/type">
              <Button>NEXT</Button>
            </Link>
            <Link to="/">
              <Button>MAIN</Button>
            </Link>
          </ButtonWrapper>
        </NeonLoginWrapper>
      </Wrapper>
    </div>
  )
};

export default JoinAgree;