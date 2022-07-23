import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const DrinkUsHeader = styled.div`
  position: fixed;
  display: flex;
  padding: 40px 4rem;
  justify-content: center;
  background-color: transparent;
  margin: auto;
  width: calc(100% - 11rem);
`;

const HeaderMenu = styled.ul`
  display: flex;
  width: calc(${(props) => props.width}% - 11rem);
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
              <NavLink to={"/users/{user_no}"}>{user.data.nickName}님</NavLink>
            </li>
            <li>
              {/* api 문서 나오면 주소 일치시켜야 해 */}
              <NavLink to={"/alarm"}><i class="far fa-heart"></i></NavLink>
            </li>
            <li>
              {/* api 문서 나오면 주소 일치시켜야 해 */}
              <NavLink to={"/friend"}><i class="fa-solid fa-user-group"></i></NavLink>
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
