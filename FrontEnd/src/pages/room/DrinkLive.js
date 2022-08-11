import { GoToButton } from "../../components/common/buttons/GoToButton";
import { useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header";
import { Wrapper } from "../../components/styled/Wrapper";
import styled from "styled-components";
import { useState } from "react";
import { client } from "../../utils/client";
import { useEffect } from "react";
import LiveListItem from '../../components/room/LiveListItem'
import { BaseFlexWrapper } from "../../components/styled/Wrapper";
import Modal from "../../components/modals/Modal";


const Banner = styled.div `
  height: 270px;
  width: 1500px;
  background-color: #EAF1FF;
`

const RecommendLetter = styled.p `
  color: white;
`

const GlobalStyle = styled.div`
  body {
    margin: 0;
  }
`;

const RecommendWrapper = styled(BaseFlexWrapper)`
  background-color: black;
  width: 100vw;
  min-height: 400px;
  align-items: ${({ alignItems }) => alignItems};
`


const DrinkLive = () => {

  const navigate = useNavigate();
  
  // 나이대 요청
  const [ageList, setAgeList] = useState([]);

  const onMakeAgeList = async () => {
    const result = await client
    .get('/rooms/recommend/ages')
    .then((response) => response)
    setAgeList([...result.data]);
    return result.data
  }

  // 카테고리 요청
  const [categoryList, setCategoryList] = useState([]);

  const onCategoryList = async () => {
    const result = await client
    .get('/rooms/recommend/category')
    .then((response) => response)
    setCategoryList([...result.data]);
    return result.data
  }

  // 최근생성 요청
  const [currentList, setCurrentList] = useState([]);

  const onCurrentList = async () => {
    const result = await client
    .get('/rooms/recommend/current')
    .then((response) => response)
    setCurrentList([...result.data]);
    return result.data
  }

  // 호출
  useEffect(() => {
    onMakeAgeList();
    onCategoryList();
    onCurrentList();    
  },[])
  
  return (
  <>
    <Header/>
    <Wrapper>
      <Banner>배너입니다.
      </Banner>
        <GoToButton onClick={() => navigate("/createroom")} color={"cornflowerblue"}>방 만들기</GoToButton>
        <GoToButton onClick={() => navigate("/rooms")} color={"#EAF1FF"}>모든 방 보기</GoToButton>
        
    </Wrapper>
    <RecommendWrapper>
      <GlobalStyle />
      <>
        <RecommendLetter>내 나이대로 설정된 방</RecommendLetter>
        {ageList.map((content, index) => (
          <LiveListItem
          {...content}
            key={index}
          > 
          </LiveListItem>
        ))}
      </>
    </RecommendWrapper>
    <RecommendWrapper>
      <RecommendLetter>내 관심사로 설정된 방</RecommendLetter>
      {categoryList.length === 0 ? (
        <RecommendLetter>관심사를 추가로 설정해 주세요</RecommendLetter>
      ):(
        <>
        {categoryList.map((content, index) => (
          <LiveListItem
          {...content}
            key={index}
          > 
          </LiveListItem>
        ))}
        </>
      )}
    </RecommendWrapper>
    <RecommendWrapper>
      <RecommendLetter>최근에 만들어진 방</RecommendLetter>
        {currentList.map((content, index) => (
          <LiveListItem
          {...content}
            key={index}
          > 
          </LiveListItem>
        ))}
    </RecommendWrapper>
  </>
  );
};

export default DrinkLive