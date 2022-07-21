import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const DrinkUsHeader = styled.div`
  position: fixed;
  display: flex;
  padding: 40px 6rem;
  justify-content: center;
  background-color: transparent;
  margin: auto;
  width: calc(100% - 11rem);
  max-width: 1350px;
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
      <HeaderMenu width={75} justify={"space-between"}>
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
              <NavLink to={"/logout"}>로그아웃</NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to={"/login"}>로그인</NavLink>
            </li>

            <li>
              <NavLink to={"/join"}>회원가입</NavLink>
            </li>
          </>
        )}
      </HeaderMenu>
    </DrinkUsHeader>
  );
};

export default Header;
