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
    // 받아온 정보
    boardId: "",
    createrId: "",
    boardContent: "",
    // 보낼 정보
    boardArticle: "",
    boardComment: "",
    // 댓글 창 여닫을 때 필요한 값
    isComment: false,
  })
  

  // 입력
  const onHandleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  // 글 전체 조회
    // client
    //   .get(`/daily`, {
    //     params: {
    //       page: "",
    //     }
    //   })
    //   .then(function (response) {
    //     console.log(response);
    //     console.log(response.request.response)
    //     // setState({...state,
    //     //   boardContent: response.data.boardContent,
    //     //   createrId: response.data.createrid
    //     // })
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    //   console.log(this.response)
  
  useEffect(() => {
    client
      .get(`/daily`, {
        params: {
          page: "",
        }
      })
      .then(function (response) {
        console.log(response);
        console.log(response.request.response)
        // setState({...state,
        //   boardContent: response.data.boardContent,
        //   createrId: response.data.createrid
        // })
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [])
      
      
  // 글 작성
  const onArticleSubmit = (e) => {
    e.preventDefault();
    client
    .post(`/daily`, {
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
    .put(`/daily/{board_id}`, {
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
    .delete(`/daily/{board_id}`, {
      boardContent: state.boardArticle,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
    

  // 댓글 창 여닫기
  const onHandleComment = (e) => {
    if(!state.isComment){
      setState({...state, isComment: !state.isComment, boardComment:""})
    }else{
      setState({...state, isComment: !state.isComment, boardComment:""})
    }
  }

  // 댓글 작성
  const onCommentSubmit = (e) => {
    e.preventDefault();
    client
    .post(`/daily/comment/201`, {
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
      .put(`/daily/201`, {
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
      .delete(`/daily/{board_id}`, {
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
              name="boardArticle"
              onChange={onHandleInput}
            />
            <DailyArticlePostButton onClick={onArticleSubmit}>
              글쓰기
            </DailyArticlePostButton>
          </DailyWrapper>
          <div>
            <DailyWrapper>
              <DailyBoard>
                <ProfileWrapper>
                  <ProfileImg></ProfileImg>
                </ProfileWrapper>
                <DailyContent>{state.boardContent}</DailyContent>
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
                    {state.isComment === true? "댓글취소": "댓글달기"}
                  </DailyBoardEditButton>
                </DailyContent>
              </DailyBoard>
            </DailyWrapper>
            <DailyWrapper style = {{display: state.isComment === false ? "none" : "block"}}>
            <DailyCommentInput
                placeholder="댓글칸"
                type="string"
                value={state.boardComment}
                name="boardComment"
                onChange={onHandleInput}
              />
            <DailyCommentPostButton onClick={onCommentSubmit}>
              댓글 달기
            </DailyCommentPostButton>
          </DailyWrapper>
          </div>
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
        </BaseFlexColWrapper>
      </Wrapper>
    </>
  )
}

export default Daily;