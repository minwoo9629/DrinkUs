import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  BASIC_MENU,
  LOGINED_MENU,
  UNLOGINED_MENU,
} from "../../constants/HeaderConstant";
import { logOut } from "../../store/actions/user";
import { SuccessAlert } from "../../utils/sweetAlert";
import { BaseFlexWrapper } from "../styled/Wrapper";

const DrinkUsHeader = styled(BaseFlexWrapper)`
  position: ${({ position }) => position};
  padding: 40px 100px;
  background-color: ${(props) => props.color};
  width: 100%;
  box-sizing: border-box;
  opacity: ${(props) => props.opacity};
  transition: opacity 0.5s, background-color 0.5s linear;
  &.active {
    transition: opacity 0.5s, background-color 0.5s linear;
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
  display: flex;
  justify-content: ${({ justify }) => justify};
  width: ${({ width }) => `${width}%`};
`;

const HeaderMenuLink = styled(NavLink)`
  text-decoration: none;
  color: lightpink;
  font-family: "Black Han Sans";
  font-size: 20px;
  transition: color 0.5s linear;
  &.light {
    color: #bdcff2;
  }
  &.active {
    color: #5904de;
    transition: color 0.5s linear;
  }
`;

const LogOutButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
  color: lightpink;
  font-family: "Black Han Sans";
  font-size: 20px;
  transition: color 0.5s linear;
  &.light {
    color: #bdcff2;
  }
  &.active {
    color: #5904de;
    transition: color 0.5s linear;
  }
`;

const Header = ({ position }) => {
  const navigate = useNavigate();

  const [ScrollY, setHeaderColor] = useState(0);
  const [HeaderStatus, setHeaderStatus] = useState(false);
  const dispatch = useDispatch();
  const onHandleLogout = () => {
    dispatch(logOut());
    sessionStorage.removeItem("ACCESS_TOKEN");
    SuccessAlert("로그아웃되었습니다.");
    navigate("/");
  };
  const handleColor = () => {
    setHeaderColor(window.pageYOffset);
    ScrollY > 640 ? setHeaderStatus(true) : setHeaderStatus(false);
  };

  useEffect(() => {
    const watch = () => {
      window.addEventListener("scroll", handleColor);
    };
    handleColor();
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
      position={position}
    >
      <HeaderMenu width={100} justify={"space-between"}>
        <HeaderMenuLinkWrapper width={"60"} justify={"space-between"}>
          {BASIC_MENU.map((item, idx) => (
            <HeaderMenuLink
              key={idx}
              to={item.link}
              className={HeaderStatus ? "" : "light"}
            >
              {item.menuName}
            </HeaderMenuLink>
          ))}
        </HeaderMenuLinkWrapper>
        <HeaderMenuLinkWrapper
          width={user.isLogin ? "30" : "40"}
          justify={"space-around"}
        >
          {user.isLogin ? (
            <>
              <HeaderMenuLink
                to={"/user/edit/profile"}
                className={HeaderStatus ? "" : "light"}
              >
                {user.data.userNickname}님
              </HeaderMenuLink>
              {LOGINED_MENU.map((item, idx) => (
                <HeaderMenuLink
                  key={idx}
                  to={item.link}
                  className={HeaderStatus ? "" : "light"}
                >
                  <i className={item.className} />
                </HeaderMenuLink>
              ))}
              <LogOutButton
                onClick={onHandleLogout}
                className={HeaderStatus ? "" : "light"}
              >
                로그아웃
              </LogOutButton>
            </>
          ) : (
            <>
              {UNLOGINED_MENU.map((item, idx) => (
                <HeaderMenuLink
                  key={idx}
                  to={item.link}
                  className={HeaderStatus ? "" : "light"}
                >
                  {item.menuName}
                </HeaderMenuLink>
              ))}
            </>
          )}
        </HeaderMenuLinkWrapper>
      </HeaderMenu>
    </DrinkUsHeader>
  );
};

export default Header;

DrinkUsHeader.defaultProps = {
  position: "static",
};
