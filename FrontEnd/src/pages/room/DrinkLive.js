import { useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header";
import styled from "styled-components";
import { useState } from "react";
import { client } from "../../utils/client";
import { useEffect } from "react";
import LiveListItem from '../../components/room/LiveListItem'

const LiveWrapper = styled.div`
  display: flex;
  background-color: black;
  justify-content: center;
  width: 100vw;
`

const LiveButtonWrapper = styled.div`
  width: 1000px;
  height: 110px;
`

const LiveButton = styled.button`
  width: 160px;
  height: 48px;
  margin-right: 20px;
  border-radius: 30px;
  background-color: #EAF1FF;
  color: #676775;
  font-size: 18px;
  margin-top: 40px;
  line-height: 3px;
  border: 3px solid #BDCFF2;
  box-shadow: inset 0px 0px 4px 4px rgba(189, 207, 242, 0.5);
  cursor: pointer;
`

const Banner = styled.div `
  height: 270px;
  width: 1000px;
  border-radius: 30px;
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

const RecommendWrapper = styled.div`
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
    <LiveWrapper>
      <LiveButtonWrapper>
      <LiveButton onClick={() => navigate("/createroom")} color={"cornflowerblue"}>방 만들기</LiveButton>
      <LiveButton onClick={() => navigate("/rooms")} color={"#EAF1FF"}>모든 방 보기</LiveButton>
    </LiveButtonWrapper>
    </LiveWrapper>
    <LiveWrapper>
      <Banner>
      </Banner>
    </LiveWrapper>
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