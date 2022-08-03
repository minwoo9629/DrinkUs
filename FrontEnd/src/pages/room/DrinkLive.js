import { GoToButton } from "../../components/common/buttons/GoToButton";
import { useNavigate } from "react-router-dom";
import { BaseFlexWrapper } from "../../components/styled/Wrapper"
import Header from "../../components/layout/Header";


const DrinkLive = () => {

  const navigate = useNavigate();
  
  return (
  <>
    <Header/>
    <BaseFlexWrapper>
    술 Live 페이지입니다.
    <GoToButton onClick={() => navigate("/createroom")} color={"cornflowerblue"}>방 만들기</GoToButton>
    <GoToButton onClick={() => navigate("/rooms")} color={"#EAF1FF"}>모든 방 보기</GoToButton>
    </BaseFlexWrapper>
  </>
  
  );
};

export default DrinkLive