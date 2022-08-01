import { useState, useEffect } from "react";
import styled from "styled-components";

const TopButtonStyled = styled.button`
  position: fixed; 
  opacity: 0; 
  bottom: 50px; 
  right: 50px;
  z-index: -10; 
  width: 6rem; 
  height: 6rem;
  border-radius: 100%;
  border: 0 none;
  background: #FFF;
  color: #BDCFF2;
  border: 2px solid #BDCFF2;
  font-size: 25px;
  font-weight: bold;
  letter-spacing: -0.06em;
  box-shadow: 1px 1px 6px 3px rgba(0,0,0,0.3);
  cursor: pointer;
  transition: all 0.4s linear;
  &.active{
    z-index: 10; 
   opacity: 1;
  }
  &:hover, &:focus, &:active{
    outline: 0 none; 
  }
`
const TopButton = () => {
  const [ScrollY, setScrollY] = useState(0);
  const [ButtonStatus, setButtonStatus] = useState(false); // 버튼 상태

  const onToggleTopButton = () => {
    setScrollY(window.pageYOffset);
    ScrollY > 100? setButtonStatus(true):setButtonStatus(false);
  };

  const onHandleTop = () => {
    // 클릭하면 스크롤이 위로 올라가는 함수
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setScrollY(0); // ScrollY 의 값을 초기화
  };

  useEffect(() => {
    const watch = () => {
      window.addEventListener("scroll", onToggleTopButton);
    };
    watch();
    return () => {
      window.removeEventListener("scroll", onToggleTopButton);
    };
  });

  return (
    <div>
      <TopButtonStyled
        className={ButtonStatus ? "active" : ""} // 버튼 노출 여부
        onClick={onHandleTop} // 버튼 클릭시 함수 호출
      >
        <i className="fas fa-arrow-up"></i>
      </TopButtonStyled>
    </div>
  );
};

export default TopButton;
