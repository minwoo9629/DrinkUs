import { useState, useEffect } from "react";
import "./TopButton.css";

const TopButton = () => {
  const [ScrollY, setScrollY] = useState(0);
  const [ButtonStatus, setButtonStatus] = useState(false); // 버튼 상태

  const onToggleTopButton = () => {
    setScrollY(window.pageYOffset);
    if (ScrollY > 100) {
      // 100 이상이면 버튼이 보이게
      setButtonStatus(true);
    } else {
      // 100 이하면 버튼이 사라지게
      setButtonStatus(false);
    }
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
    <div className="wrap">
      <button
        className={ButtonStatus ? "topButton active" : "topButton"} // 버튼 노출 여부
        onClick={onHandleTop} // 버튼 클릭시 함수 호출
      >
        <i className="fas fa-arrow-up"></i>
      </button>
    </div>
  );
};

export default TopButton;
