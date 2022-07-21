import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
// import "./Header.css";

const DrinkUsHeader = styled.div`
  display: flex;
  padding: 40px 100px;
  justify-content: center;
  background-color: black;
  margin: auto;
  max-width: 1200px;
`;

const HeaderMenu = styled.ul`
  display: flex;
  width: ${(props) => props.width}%;
  justify-content: ${(props) => props.justify};
`;

const Header = () => {
  const user = useSelector((state) => state.user);
  return (
    <DrinkUsHeader>
      <HeaderMenu width={100} justify={"space-between"}>
        <li>
          <NavLink to="/">DrinkUs</NavLink>
        </li>
        <li>
          <NavLink to={"/live"}>술Live</NavLink>
        </li>
        <li>
          <NavLink to={"/community"}>커뮤니티</NavLink>
        </li>
        {user.isLogin ? (
          <>
            <li>
              <NavLink to={"/login"}>{user.data.nickName}님</NavLink>
            </li>

            <li>
              <NavLink to={"/signUp"}>로그아웃</NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to={"/login"}>로그인</NavLink>
            </li>

            <li>
              <NavLink to={"/signUp"}>회원가입</NavLink>
            </li>
          </>
        )}
      </HeaderMenu>
    </DrinkUsHeader>
  );
};

export default Header;
