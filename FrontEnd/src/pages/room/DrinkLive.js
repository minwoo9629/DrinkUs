import { useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { client } from "../../utils/client";
import LiveListItem from "../../components/room/LiveListItem";
import Banner from "../../components/room/Banner";
import { useSelector } from "react-redux";
import { LiveButton } from "../../components/common/buttons/LiveButton";
import { FailAlert } from "../../utils/sweetAlert";

// 버튼, 배너
const LiveWrapper = styled.div`
  display: flex;
  background-color: black;
  justify-content: center;
  width: 100vw;
`;

const LiveButtonWrapper = styled.div`
  width: 1200px;
  height: 110px;
`;

const LiButton = styled.button`
  background-color: transparent;
  cursor: pointer;
  color: cornflowerblue;
`;

// 추천방
const RecommendWrapper = styled.div`
  display: flex;
  background-color: black;
  justify-content: center;
  width: 100vw;
`;

const RecommendInnerWrapper = styled.div`
  display: flex;
  min-height: 260px;
  margin-top: 20px;
  margin-bottom: 50px;
  width: 1200px;
  background-color: ${(props) => props.backgroundcolor};
`;

const RecommendLetter = styled.p`
  font-size: ${(props) => props.size};
  background-color: black;
  color: ${(props) => props.color};
  margin-top: ${(props) => props.margintop};
  margin-bottom: ${(props) => props.marginbottom};
  background-color: ${(props) => props.backgroundcolor};
`;

const LetterWrapper = styled.div`
  display: flex;
  background-color: black;
  justify-content: center;
  margin: ${(props) => props.margin};
  width: 100vw;
`;

const LetterInnerWrapper = styled.div`
  display: flex;
  width: ${(props) => props.width};
  margin-bottom: ${(props) => props.marginbottom};
`;

const DrinkLive = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.data);
  // 나이대 요청
  const [ageList, setAgeList] = useState([]);

  useEffect(() => {
    if (user.userBirthday === null) {
      FailAlert("생년월일 설정해주세요!!");
      navigate("/edit/profile");
    }
    onMakeAgeList();
    onCategoryList();
    onCurrentList();
  }, []);

  const onMakeAgeList = async () => {
    const result = await client
      .get("/rooms/recommend/ages")
      .then((response) => response);
    setAgeList([...result.data]);
  };

  // 카테고리 요청
  const [categoryList, setCategoryList] = useState([]);

  const onCategoryList = async () => {
    const result = await client
      .get("/rooms/recommend/category")
      .then((response) => response);
    setCategoryList([...result.data]);
  };

  // 최근생성 요청
  const [currentList, setCurrentList] = useState([]);

  const onCurrentList = async () => {
    const result = await client
      .get("/rooms/recommend/current")
      .then((response) => response);
    setCurrentList([...result.data]);
  };

  return (
    <>
      <Header />
      <LiveWrapper>
        <LiveButtonWrapper>
          <LiveButton
            onClick={() => navigate("/createroom")}
            color={"cornflowerblue"}
          >
            방 만들기
          </LiveButton>
          <LiveButton onClick={() => navigate("/rooms")} color={"#EAF1FF"}>
            모든 방 보기
          </LiveButton>
        </LiveButtonWrapper>
      </LiveWrapper>
      <LiveWrapper>
        <Banner></Banner>
      </LiveWrapper>
      <LetterWrapper>
        <LetterInnerWrapper width={"1200px"} marginbottom={"20px"}>
          <RecommendLetter size={"24px"} color={"#EAF1FF"}>
            내 나이대로 설정된 방
          </RecommendLetter>
        </LetterInnerWrapper>
      </LetterWrapper>
      <RecommendWrapper>
        <RecommendInnerWrapper>
          {ageList.length === 0 ? (
            <RecommendLetter color={"#EAF1FF"}>
              내 나이대로 설정된 방이 없어요.
            </RecommendLetter>
          ) : (
            <>
              {ageList.map((content, index) => (
                <>
                  <LiveListItem {...content} key={index}></LiveListItem>
                </>
              ))}
            </>
          )}
        </RecommendInnerWrapper>
      </RecommendWrapper>
      <LetterWrapper>
        <LetterInnerWrapper width={"1200px"} marginbottom={"20px"}>
          <RecommendLetter size={"24px"} color={"#EAF1FF"}>
            내 관심사로 설정된 방
          </RecommendLetter>
        </LetterInnerWrapper>
      </LetterWrapper>
      <RecommendWrapper>
        <RecommendInnerWrapper>
          {categoryList.length === 0 ? (
            <RecommendLetter color={"#EAF1FF"}>
              관심사를 추가로 설정해 주세요
              <LiButton onClick={() => navigate("/user/edit/profile")}>
                관심사 설정하기
              </LiButton>
            </RecommendLetter>
          ) : (
            <>
              {categoryList.map((content, index) => (
                <LiveListItem {...content} key={index}></LiveListItem>
              ))}
            </>
          )}
        </RecommendInnerWrapper>
      </RecommendWrapper>
      <LetterWrapper>
        <LetterInnerWrapper width={"1200px"} marginbottom={"20px"}>
          <RecommendLetter size={"24px"} color={"#EAF1FF"}>
            최근에 만들어진 방
          </RecommendLetter>
        </LetterInnerWrapper>
      </LetterWrapper>
      <RecommendWrapper>
        <RecommendInnerWrapper>
          {currentList.length === 0 ? (
            <RecommendLetter color={"#EAF1FF"}>
              최근에 만들어진 방이 없어요.
              <LiButton onClick={() => navigate("/createroom")}>
                방을 만들어볼까요?
              </LiButton>
            </RecommendLetter>
          ) : (
            <>
              {currentList.map((content, index) => (
                <LiveListItem {...content} key={index}></LiveListItem>
              ))}
            </>
          )}
        </RecommendInnerWrapper>
      </RecommendWrapper>
    </>
  );
};

export default DrinkLive;
