import Header from "../../components/Header";
import { Link } from "react-router-dom";
import styled from "styled-components";

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

const Button = styled.button`
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

const JoinAgree = () => {
  console.log('개인정보동의창');
  return (
    <div>
      <Header/>
      <JoinForm>
        <UserInput
        placeholder="동의받을곳!"
        />
        <Link to="/"></Link>
          <Button>회원가입선택 페이지 넘어가게 하기 일단은 메인으로</Button>
      </JoinForm>
    </div>
  )
};

export default JoinAgree;