import { useState, useEffect} from 'react'
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import './Header.css'

const DrinkUsHeader = styled.div`
  position: fixed;
  display: flex;
  padding: 40px 4rem;
  justify-content: center;
  background-color: ${(props) => props.color};
  margin: auto;
  width: calc(100% - 8rem);
  opacity: ${(props) => props.opacity};
`;

const HeaderMenu = styled.ul`
  display: flex;
  width: calc(${(props) => props.width}% - 11rem);
  justify-content: ${(props) => props.justify};
`;

const Header = () => {
  const [ScrollY, setHeaderColor] = useState(0);
  const [HeaderStatus, setHeaderStatus] = useState(false);

  const handleColor = () => {
    setHeaderColor(window.pageYOffset);
    if(ScrollY > 640) {
      setHeaderStatus(true);
    } else {
      setHeaderStatus(false);
    }
  }

  useEffect(() => {
    const watch = () => {
      window.addEventListener('scroll', handleColor)
    }
    watch();
    return () => {
      window.removeEventListener('scroll', handleColor)
    }
  })

  const user = useSelector((state) => state.user);
  return (
    <DrinkUsHeader color={HeaderStatus ? "white" : "black"} opacity={HeaderStatus ? "0.9" : "0.7"}>
      <HeaderMenu width={100} justify={"space-between"}>
        <li>
          <NavLink to="/" className={HeaderStatus ? "a" : "a light"}>DrinkUs</NavLink>
        </li>
        <li>
          <NavLink to={"/live"} className={HeaderStatus ? "a" : "a light"}>술Live</NavLink>
        </li>
        <li>
          <NavLink to={"/community"} className={HeaderStatus ? "a" : "a light"}>커뮤니티</NavLink>
        </li>
        {user.isLogin ? (
          <>
            <li>
              <NavLink to={"/users/{user_no}"} className={HeaderStatus ? "a" : "a light"}>{user.data.nickName}님</NavLink>
            </li>
            <li>
              {/* api 문서 나오면 주소 일치시켜야 해 */}
              <NavLink to={"/alarm"} className={HeaderStatus ? "a" : "a light"}><i class="far fa-heart"></i></NavLink>
            </li>
            <li>
              {/* api 문서 나오면 주소 일치시켜야 해 */}
              <NavLink to={"/friend"} className={HeaderStatus ? "a" : "a light"}><i class="fa-solid fa-user-group"></i></NavLink>
            </li>
            <li>
              <NavLink to={"/logout"} className={HeaderStatus ? "a" : "a light"}>로그아웃</NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to={"/login"} className={HeaderStatus ? "a" : "a light"}>로그인</NavLink>
            </li>
            <li>
              <NavLink to={"/join"} className={HeaderStatus ? "a" : "a light"}>회원가입</NavLink>
            </li>
          </>
        )}
      </HeaderMenu>
    </DrinkUsHeader>
  );
};

export default Header;
