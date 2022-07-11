import { Link } from "react-router-dom";
import styled from "styled-components";

const DrinkUsHeader = styled.div`
  display: flex;
  padding: 40px 100px;
  justify-content: center;
  background-color: black;
  margin: auto;
  max-width: 1200px;
`;

const Logo = styled.div`
  width: 25%;
`;
const HeaderMenu = styled.ul`
  display: flex;
  width: ${(props) => props.width}%;
  justify-content: ${(props) => props.justify};
`;
const Header = () => {
  return (
    <DrinkUsHeader>
      <Logo>
        <Link to="/">DrinkUs</Link>
      </Logo>
      <HeaderMenu width={50} justify={"space-between"}>
        <li>
          <Link to={"/live"}>술Live</Link>
        </li>

        <li>
          <Link to={"/community"}>커뮤니티</Link>
        </li>
        <li>
          <Link to={"/notice"}>공지사항</Link>
        </li>
      </HeaderMenu>
      <HeaderMenu width={25} justify={"end"}>
        <li>
          <Link to={"/login"}>로그인</Link>
        </li>

        <li>
          <Link to={"/signUp"}>회원가입</Link>
        </li>
      </HeaderMenu>
    </DrinkUsHeader>
  );
};

export default Header;
