import { useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header";
import styled from "styled-components";
import { useState, useEffect, useCallback } from "react";
import { client } from "../../utils/client";
import LiveListItem from '../../components/room/LiveListItem'
import Banner from "../../components/room/Banner";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// 버튼, 배너
const LiveWrapper = styled.div`
  display: flex;
  background-color: black;
  justify-content: center;
  width: 100vw;
`

const LiveButtonWrapper = styled.div`
  width: 1200px;
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


const LiButton = styled.button`
  background-color: transparent;
  cursor: pointer;
  color: cornflowerblue;
`;

// 추천방
const RecommendLetter = styled.div `
  background-color: black;
  color: white;
  margin-top: 30px;
`

const LetterWrapper = styled.div`
  display: flex;
  background-color: black;
  justify-content: center;
  margin: auto;
  width: 100vw;
`

const RecommendWrapper = styled.div`
  display: flex;
  background-color: black;
  justify-content: center;
  width: 100vw;
`

const RecommendInnerWrapper = styled.div`
  display: flex;
  min-height: 260px;
  margin-top: 20px;
  margin-bottom: 50px;
  width: 1200px;
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
  }

  // 카테고리 요청
  const [categoryList, setCategoryList] = useState([]);

  const onCategoryList = async () => {
    const result = await client
    .get('/rooms/recommend/category')
    .then((response) => response)
    setCategoryList([...result.data]);
  }

  // 최근생성 요청
  const [currentList, setCurrentList] = useState([]);

  const onCurrentList = async () => {
    const result = await client
    .get('/rooms/recommend/current')
    .then((response) => response)
    setCurrentList([...result.data]);
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
    <LetterWrapper>
      <RecommendLetter>내 나이대로 설정된 방</RecommendLetter>
    </LetterWrapper>
    <RecommendWrapper>
      <RecommendInnerWrapper>
        {ageList.length === 0 ? (
          <RecommendLetter>
            내 나이대로 설정된 방이 없어요.
            <LiButton onClick={()=>navigate('/user/edit/profile')}>
              생년월일 입력하러 가기
            </LiButton>
          </RecommendLetter>
        ) : (
          <>
            {ageList.map((content, index) => (
              <>
            <LiveListItem
            {...content}
              key={index}
            > 
            </LiveListItem>
            </>
            ))}
          </>
        )}
      </RecommendInnerWrapper>
    </RecommendWrapper>
    <LetterWrapper>
      <RecommendLetter>내 관심사로 설정된 방</RecommendLetter>
    </LetterWrapper>
    <RecommendWrapper>
      <RecommendInnerWrapper>
        {categoryList.length === 0 ? (
          <RecommendLetter>
            관심사를 추가로 설정해 주세요
            <LiButton onClick={()=>navigate('/user/edit/profile')}>
              관심사 설정하기
            </LiButton>
          </RecommendLetter>
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
      </RecommendInnerWrapper>
    </RecommendWrapper>
      <LetterWrapper>
        <RecommendLetter>최근에 만들어진 방</RecommendLetter>
      </LetterWrapper>
    <RecommendWrapper>
      <RecommendInnerWrapper>
        {currentList.length === 0 ? (
          <RecommendLetter>
            최근에 만들어진 방이 없어요. 
            <LiButton onClick={()=>navigate('/createroom')}>
              방을 만들어볼까요?
            </LiButton>
          </RecommendLetter>
        ) : (
          <>
          {currentList.map((content, index) => (
            <LiveListItem
            {...content}
              key={index}
            > 
            </LiveListItem>
          ))}
          </>
        )}
      </RecommendInnerWrapper>
    </RecommendWrapper>
  </>
  )
};

export default DrinkLive