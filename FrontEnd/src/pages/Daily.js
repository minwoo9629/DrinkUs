import React, { useState, useEffect, useCallback } from "react"
import styled from "styled-components";
import { BaseFlexColWrapper } from "../components/styled/Wrapper";
import Header from "../components/layout/Header";
import { useNavigate } from "react-router-dom";
import { CalendarButton } from "../components/common/buttons/CalendarButton";
import {
  postDailyArticle,
} from "../api/DailyAPI";
import { useInView } from "react-intersection-observer"
import DailyListItem from "../components/daily/DailyListItem";
import { client } from "../utils/client";

// 전체 배경
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  background-color: white;
`

// 글쓰기 인풋 div
const DailyArticleInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 10vh;
  border-radius: 16px;
  border: 4px #6f92bf;
  background-color: white;
  position: relative;
`

// 글, 댓글 개별 div
const DailyListWrapper = styled.div`
  justify-content: space-between;
  width: 80vw;
  height: 20vh;
  border-radius: 16px;
  border: 4px #6f92bf;
  background-color: white;
  margin: 14px;
  position: relative;
`

// // 작성된 글 감쌀 div
// const DailyArticleWrapper = styled.div`
//   justify-content: space-between;
//   width: 72vw;
//   height: 8vh;
//   border-radius: 4px;
//   border: solid #eaf1ff;
//   background-color: white;
//   margin: 4px;
//   position: relative;
//   display: flex;
// `

// 프사 감쌀 div
const ProfileWrapper = styled.div`
  display: column;
  margin: 8px;
`;


// 프사
const ProfileImg = styled.div`
  padding: 8px;
  border-radius: 24px;
  width: 24px;
  height: 24px;
  background-color: #6f92bf;
`;

const DailyContent = styled.div`
  display: column;
  justify-content: center;
  align-items: center;
`

// 글쓰기 인풋
const DailyArticleInput = styled.input`
  justify-content: space-between;
  width: 64vw;
  height: 100%;
  border-radius: 1px;
  border: solid #6F92BF 0.1em;
  background-color: #EAF1FF;
  position: relative;
  padding-left: 20px;
`

// 댓글 인풋 감쌀 div
const DailyCommentInputWrapper = styled.div`
  justify-content: space-between;
  width: 64vw;
  height: 10vh;
  border-radius: 4px;
  border: #6f92bf;
  background-color: #eaf1ff;
  margin: 4px;
  position: relative;
`

// 댓글 인풋
const DailyCommentInput = styled.input`
  justify-content: space-between;
  width: 64vw;
  height: 8vh;
  border-radius: 4px;
  border: #6f92bf;
  background-color: #eaf1ff;
  margin: 4px;
  position: relative;
`

// 글쓰기 버튼
const DailyArticlePostButton = styled.button`
  padding: 12px 24px;
  border-radius: 1px;
  height: 100%;
  background-color: #bdcff2;
  border: solid #bdcff2 0.1em;
  color: white;
  margin-left: 10px;
  font-size: 16px;
`

// 글, 댓글 수정 삭제 버튼
const DailyBoardEditButton = styled.button`
  padding: 4px 8px;
  background-color: white;
  color: gray;
  font-size: 8px;
  margin: 4px;
  border: 1px white;
`

// 댓글 달기 버튼
const DailyCommentPostButton = styled.button`
  padding: 12px 24px;
  border-radius: 3px;
  background-color: #bdcff2;
  color: white;
  font-size: 16px;
  margin: 4px;
  border: 1px #eaf1ff;
`


const DailyBoardComment = styled.div`
  justify-content: space-between;
  width: 64vw;
  height: 8vh;
  border-radius: 4px;
  border: solid #eaf1ff;
  background-color: white;
  margin: 4px;
  margin-left: 10%;
  margin-right: 10%;
  position: relative;
  display: flex;
`

const TopMenuWrap = styled.div`
width: 100%;
display: flex;
align-items: center;
margin: 40px;
`;


const DailyWrapper = styled.div`
  width: 100%;
`

const Daily = () => {
  const [state, setState] = useState({
    // 보낼 정보
    boardArticle: "",
    boardComment: "",
    // 댓글 창 여닫을 때 필요한 값
    isComment: false,
  })
  const [items, setItems] = useState([])
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [ref, inView] = useInView()
  const navigate = useNavigate();

  // 전체 글 fetch
  const getItems = useCallback(async () => {
    setLoading(true)
    await client.get(`/daily?page=${page}&size=10`).then((res) => {
      console.log(res.data.content);
      setItems(prevState => [...prevState, ...res.data.content])
    })
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false)
  }, [page])

  // useEffect를 이용하여 전체 게시글 fetch 하기
  useEffect(() => {
    getItems()
  }, [getItems])

  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (inView && !loading) {
      setPage(prevState => prevState + 1)
    }
  }, [inView, loading])

  // 입력
  const onHandleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  // 글 작성
  const onArticlePost = async (e) => {
    const data = {
      boardContent: state.boardArticle
    };
    const response = await postDailyArticle(data);
    if (response.status === 200) {
      setState({ ...state, boardArticle: "" })
    }
    window.location.replace("/daily")
  };
  return (
    <>
      <Header />
      <Wrapper>
        <BaseFlexColWrapper>
          <TopMenuWrap>
            <CalendarButton onClick={() => navigate("/calendar")} color={"#ffffff"} textColor={"#6F92BF"}>월간</CalendarButton>
            <CalendarButton onClick={() => navigate("/daily")} color={"#bdcff2"} textColor={"#fff"}>일간</CalendarButton>
          </TopMenuWrap>
          <DailyArticleInputWrapper>
            <DailyArticleInput
              placeholder="글을 작성하세요"
              type="string"
              value={state.boardArticle}
              name="boardArticle"
              onChange={onHandleInput}
            />
            <DailyArticlePostButton onClick={onArticlePost}>
              글쓰기
            </DailyArticlePostButton>
          </DailyArticleInputWrapper>
          <DailyWrapper>
            {items.map((item, idx) => (
              <React.Fragment key={idx}>
                {items.length - 1 == idx ?
                  <>
                    <div ref={ref}>
                      <DailyListItem {...item} key={item.boardId}>
                      {item.boardContent}
                      {item.boardId}
                      {item.createrId}
                      </DailyListItem>
                    </div>

                  </>
                  :
                  <>
                    <DailyListItem {...item} key={item.boardId}>
                      {item.boardContent}
                      {item.boardId}
                      {item.createrId}
                    </DailyListItem>
                  </>
                }
              </React.Fragment>
            )
            )
            }
          </DailyWrapper>
        </BaseFlexColWrapper>
      </Wrapper>
    </>
  )
}

export default Daily;