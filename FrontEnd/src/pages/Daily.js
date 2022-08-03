import { useState } from "react";
import styled from "styled-components";
import { BaseFlexColWrapper } from "../components/styled/Wrapper";
import { client } from "../utils/client";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  background-color: white;
`

const DailyWrapper = styled.div`
  justify-content: space-between;
  width: 80vw;
  height: 8vh;
  border-radius: 16px;
  border: 4px #6f92bf;
  background-color: white;
  margin: 14px;
  position: relative;
`

const DailyInput = styled.input`
  justify-content: space-between;
  width: 64vw;
  height: 8vh;
  border-radius: 4px;
  border: #6f92bf;
  background-color: #eaf1ff;
  margin: 4px;
  position: relative;
`

const DailyArticleButton = styled.button`
  padding: 12px 24px;
  border-radius: 3px;
  background-color: #bdcff2;
  color: white;
  font-size: 16px;
  margin: 4px;
  border: 1px #eaf1ff;
`

const DailyCommentButton = styled.button`
  padding: 12px 24px;
  border-radius: 3px;
  background-color: #bdcff2;
  color: white;
  font-size: 16px;
  margin: 4px;
  border: 1px #eaf1ff;
`

const DailyBoard = styled.div`
  justify-content: space-between;
  width: 64vw;
  height: 8vh;
  border-radius: 4px;
  border: solid #eaf1ff;
  background-color: white;
  margin: 4px;
  position: relative;
`

const DailyBoardComment = styled.div`
  justify-content: space-between;
  width: 56vw;
  height: 8vh;
  border-radius: 4px;
  border: solid #eaf1ff;
  background-color: white;
  margin: 4px;
  margin-left: auto;
  position: relative;
`

const Daily = () => {
  // 상태 저장
  const [state, setState] = useState({
    boardArticle: "",
    boardComment: "",
  })

  // 입력
  const onHandleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  // 글 추가
  const onArticleSubmit = (e) => {
    e.preventDefault();
    client
      .post("https://i7b306.p.ssafy.io/daily", {
        boardContent: state.boardArticle,
      })
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
  };

  // 글 수정
  const onArticleEdit = (e) => {
    e.preventDefault();
    client
      .put("http://i7b306.p.ssafy.io/daily", {
        boardContent: state.boardArticle,
      })
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
  };


  // 댓글 추가
  const onCommentSubmit = (e) => {
    e.preventDefault();
    client
      .post("https://i7b306.p.ssafy.io/daily/comment/{parent_id}", {
        boardContent: state.boardComment,
      })
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
  };

  // 댓글 수정
  const onCommentEdit = (e) => {
    e.preventDefault();
    client
      .put("http://i7b306.p.ssafy.io/daily/comment/{parent_id}", {
        boardContent: state.boardComment,
      })
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <Wrapper>
        <BaseFlexColWrapper>
          <DailyWrapper>
            <DailyInput
              placeholder="글을 작성하세요"
              type="string"
              value={state.boardContent}
              name="dailyArticleInput"
              onChange={onHandleInput}
            />
            <DailyArticleButton onClick={onArticleSubmit}>
              글쓰기
            </DailyArticleButton>
          </DailyWrapper>
          <DailyWrapper>
            <DailyBoard>
              글
            </DailyBoard>
          </DailyWrapper>
          <DailyWrapper>
            <DailyInput
                placeholder="댓글칸"
                type="string"
                value={state.boardContent}
                name="dailyCommnetInput"
                onChange={onHandleInput}
              />
            <DailyBoardComment>
              댓글
            </DailyBoardComment>
            <DailyCommentButton onClick={onCommentSubmit}>
              답글 달기
            </DailyCommentButton>
          </DailyWrapper>
          <DailyWrapper>
            <DailyBoard>
              글
            </DailyBoard>
          </DailyWrapper>
          <DailyWrapper>
            <DailyBoardComment>
              댓글
            </DailyBoardComment>
          </DailyWrapper>
        </BaseFlexColWrapper>
      </Wrapper>
    </>
  )
}

export default Daily;