import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { BASIC_MENU, LOGINED_MENU, UNLOGINED_MENU } from "../../constants/HeaderConstant";
import { BaseFlexWrapper } from "../styled/Wrapper";


const DrinkUsHeader = styled(BaseFlexWrapper)`
  position: fixed;
  padding: 40px 100px;
  background-color: ${(props) => props.color};
  width: 100%;
  box-sizing: border-box;
  opacity: ${(props) => props.opacity};
  transition: opacity 0.5s, background-color 0.5s  linear;
  &.active{
    transition: opacity 0.5s, background-color 0.5s  linear;
  }
`;

const HeaderMenu = styled(BaseFlexWrapper)`
  width: 100%;
  max-width: 1140px;
  gap: 120px;
  box-sizing: border-box;
  justify-content: ${(props) => props.justify};
  @media screen and (max-width: 960px) {
    gap: 60px;
  }
`;

const HeaderMenuLinkWrapper = styled.div`
  display:flex;
  justify-content: ${({justify})=>justify};
  width: ${({width})=> `${width}%`};
`


const HeaderMenuLink = styled(NavLink)`
  text-decoration: none;
  color: lightpink;
  font-family: "Black Han Sans";
  font-size: 20px;
  transition: color 0.5s linear;
  &.light {
    color: #bdcff2;
  }
  &.active{
    color: #5904DE;
    transition: color 0.5s linear;
  }
`;


const Header = () => {
  const [ScrollY, setHeaderColor] = useState(0);
  const [HeaderStatus, setHeaderStatus] = useState(false);

  const handleColor = () => {
    setHeaderColor(window.pageYOffset);
    ScrollY > 640? setHeaderStatus(true):setHeaderStatus(false);
  };

  useEffect(() => {
    const watch = () => {
      window.addEventListener("scroll", handleColor);
    };
    watch();
    return () => {
      window.removeEventListener("scroll", handleColor);
    };
  });

  const user = useSelector((state) => state.user);
  return (
    <DrinkUsHeader
      color={HeaderStatus ? "white" : "black"}
      opacity={HeaderStatus ? "0.9" : "0.7"}
    >
      <HeaderMenu width={100} justify={"space-between"}>
        <HeaderMenuLinkWrapper width={"60"} justify={"space-between"}>
        {BASIC_MENU.map((item, idx)=>(
          <HeaderMenuLink key={idx} to={item.link} className={HeaderStatus ? "" : "light"}>
            {item.menuName}
          </HeaderMenuLink>
        ))}
        </HeaderMenuLinkWrapper>
        <HeaderMenuLinkWrapper width={user.isLogin? "30": "40"} justify={"space-around"}>
          {user.isLogin ? (
            <>
              <HeaderMenuLink
                to={"/user/edit"}
                className={HeaderStatus ? "" : "light"}
              >
                {user.data.userNickname}님
              </HeaderMenuLink>
              {LOGINED_MENU.map((item, idx)=>(
                <HeaderMenuLink
                  key={idx}
                  to={item.link}
                  className={HeaderStatus ? "" : "light"}
                >
                  {item.menuName? item.menuName: <i className={item.className}/>}
                </HeaderMenuLink>
              ))}
            </>
        ) : (
          <>
          {UNLOGINED_MENU.map((item, idx)=>(
            <li key={idx}>
            <HeaderMenuLink  to={item.link} className={HeaderStatus ? "" : "light"}>
              {item.menuName}
            </HeaderMenuLink>
          </li>
          ))}
          </>
        )}
        </HeaderMenuLinkWrapper>
      </HeaderMenu>
    </DrinkUsHeader>
  );
};

export default Header;
