import axios from "axios";
import { string } from "i/lib/util";
import { useState, useEffect, useRef } from "react";
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

// 각 가로 줄
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
  height: 8vh;
  border-radius: 4px;
  border: #6f92bf;
  background-color: #eaf1ff;
  margin: 4px;
  position: relative;
`

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
  /* display: ${({ isComment }) => !isComment && 'none'}; */

// 글쓰기 버튼
const DailyArticlePostButton = styled.button`
  padding: 12px 24px;
  border-radius: 3px;
  background-color: #bdcff2;
  color: white;
  font-size: 16px;
  margin: 4px;
  border: 1px #eaf1ff;
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

// 답글 달기 버튼
const DailyCommentPostButton = styled.button`
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
  width: 72vw;
  height: 8vh;
  border-radius: 4px;
  border: solid #eaf1ff;
  background-color: white;
  margin: 4px;
  position: relative;
  display: flex;
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

const Daily = () => {
  // 상태 저장
  const [state, setState] = useState({
    boardArticle: "",
    boardComment: "",
    isComment: false,
  })

  const onHandleComment = (e) => {
    // setState(isComment => !isComment)
    setState({...state, boardArticle: "1"})
    setState({...state, boardComment: "1"})
    setState({...state, isComment: true})
    console.log("댓글창 나오세요")
    console.log(state.boardArticle)
  }
  
  // 입력
  const onHandleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  // // 글 전체 조회
  // const getArticle = () => {
  //   client
  //     .get("https://i7b306.p.ssafy.io/daily?page={page}", {
  //     })
  //     .then(function (response) {
  //       console.log(response);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }

// JSONPlaceholder 글 가져오기
  
  // const constructor(props) {
  //   super(props);
  //   setState({ ...state,
  //     articleContent: articleContent,
  //     commentContent: commentContent
  //   });
  //   }
  // }

  // const fetchArticle (props) {
  //   fetch('https://jsonplaceholder.typicode.com/posts')
  //   .then(res => res.json())
  //   .then((userId) => {
  //     setState(articleContent)
  //   })
  //   .then((title) => {
  //     setState(commentContent)
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   })
  // }

  // const useFetchArticle = (e) => {
  //   const [content, setContent] = useState({
  //     userId: "",
  //     title: "",
  //   })

  //   useEffect(() => {
  //     window
  //       .fetch('https://jsonplaceholder.typicode.com/posts')
  //       .then((res) => res.json())
  //       .then((userId) => {
  //         setContent(userId);
  //       })
  //       .then((title) => {
  //         setContent(title);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //     });
    
    // const contentsList = content.map((content) => (
    //   <div key={content.id} id={content.id}>
    //     <h4>{content.title}</h4>
    //   </div>
    // ))
    // }

  // Json fetch 버튼 만듭시당~!
  const FetchButton = styled.button`
    padding: 12px 24px;
    border-radius: 3px;
    background-color: #bdcff2;
    color: white;
    font-size: 16px;
    margin: 4px;
    border: 1px #eaf1ff;
  `

  // 글 추가
  const onArticleSubmit = (e) => {
    e.preventDefault();
    client
      .post("https://i7b306.p.ssafy.io/daily", {
        boardContent: state.boardArticle,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // 글 수정
  const onArticleEdit = (e) => {
    e.preventDefault();
    client
      .put("https://i7b306.p.ssafy.io/daily/{board_id}", {
        boardContent: state.boardArticle,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // 글 삭제
  const onArticleDelete = (e) => {
    e.preventDefault();
    client
      .delete("https://i7b306.p.ssafy.io/daily/{board_id}", {
        boardContent: state.boardArticle,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // 댓글 추가
  const onCommentSubmit = (e) => {
    e.preventDefault();
    client
      .post("https://i7b306.p.ssafy.io/daily/comment/{parent_id}", {
        boardContent: state.boardComment,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // 댓글 수정
  const onCommentEdit = (e) => {
    e.preventDefault();
    client
      .put("https://i7b306.p.ssafy.io/daily/{board_id}", {
        boardContent: state.boardComment,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // 댓글 삭제
  const onCommentDelete = (e) => {
    e.preventDefault();
    client
      .delete("https://i7b306.p.ssafy.io/daily/{board_id}", {
        // boardContent: state.boardComment,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <Wrapper>
        <BaseFlexColWrapper>
          <DailyWrapper>
            <DailyArticleInput
              placeholder="글을 작성하세요"
              type="string"
              value={state.boardArticle}
              name="dailyArticleInput"
              onChange={onHandleInput}
            />
            <DailyArticlePostButton onClick={onArticleSubmit}>
              글쓰기
            </DailyArticlePostButton>
          </DailyWrapper>
          <DailyWrapper>
            <DailyBoard>
              <ProfileWrapper>
                <ProfileImg></ProfileImg>
              </ProfileWrapper>
              <DailyContent>ㅎㅇ</DailyContent>
              <DailyContent>
                <DailyBoardEditButton onClick={onArticleEdit}>
                  수정
                </DailyBoardEditButton>
                <DailyBoardEditButton onClick={onArticleDelete}>
                  삭제
                </DailyBoardEditButton>
                <DailyBoardEditButton
                  onClick={onHandleComment}
                  
                 >
                  답글달기
                </DailyBoardEditButton>
              </DailyContent>
            </DailyBoard>
          </DailyWrapper>
          <DailyWrapper>
              <DailyBoardComment>
                <ProfileWrapper>
                  <ProfileImg></ProfileImg>
                </ProfileWrapper>
                  <DailyContent>
                  </DailyContent>
                  <DailyContent>
                    <DailyBoardEditButton onClick={onCommentEdit}>
                      수정
                    </DailyBoardEditButton>
                    <DailyBoardEditButton onClick={onCommentDelete}>
                      삭제
                    </DailyBoardEditButton>
                  </DailyContent>
              </DailyBoardComment>
          </DailyWrapper>
          <DailyWrapper>
            <DailyBoard>
              <ProfileWrapper>
                <ProfileImg></ProfileImg>
              </ProfileWrapper>
            </DailyBoard>
          </DailyWrapper>
          <DailyWrapper>
            <DailyBoardComment>
              <ProfileWrapper>
                <ProfileImg></ProfileImg>
              </ProfileWrapper>
            </DailyBoardComment>
          </DailyWrapper>
          <DailyWrapper>
            <DailyCommentInput
                placeholder="댓글칸"
                type="string"
                value={state.boardContent}
                name="dailyCommnetInput"
                onChange={onHandleInput}
                style = {{display: state.isComment === false ? "display": "none"}}
              />
            <DailyCommentPostButton onClick={onCommentSubmit}>
              답글 달기
            </DailyCommentPostButton>
          </DailyWrapper>
        </BaseFlexColWrapper>
      </Wrapper>
    </>
  )
}

export default Daily;