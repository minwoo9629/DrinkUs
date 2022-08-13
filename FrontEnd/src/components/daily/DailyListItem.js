import styled from "styled-components";
import {
  getDailyArticle,
  deleteDailyArticle,
} from "../../api/DailyAPI";
import CommentList from "./CommentList";
import { useEffect, useState } from "react";
import { client } from "../../utils/client";

const DailyWrapper = styled.div`
  justify-content: space-between;
  width: 68vw;
  height: 8vh;
  border-radius: 4px;
  border: 1px solid #6f92bf;
  background-color: white;
  margin: 12px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`

const DailyContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const ProfileWrapper = styled.div`
  display: column;
  margin: 8px;
`;

const ProfileImg = styled.div`
  padding: 8px;
  border-radius: 24px;
  width: 24px;
  height: 24px;
  background-color: #6f92bf;
`;

// 수정, 삭제, 댓글달기 감싸는 div
const DailyEditWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

// 글 수정 삭제 버튼
const DailyBoardEditButton = styled.button`
  padding: 4px 8px;
  background-color: transparent;
  color: black;
  font-size: 8px;
  margin: 4px;
  border: 1px white;
  text-align: flex;
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

const DailyListItem = (
  {
  // userImg,
  createrId,
  boardId,
  boardContent,
  }) => {
  const [state, setState] = useState({
    boardArticle: "",
    showEditArticle: false,
    userId: "",
  })
  const [comment, setComment] = useState({
    isComment: false,
    showComment: false,
    boardComment: "",
  })

  // 접속한 유저 정보 가져오기
  const fetchUser = async () => {
    client
      .get("users")
      .then(function(response) {
        const data = response.data;
        setState({...state,
          userId: data.userId})
    })
  };

  useEffect(() => {
    fetchUser();
  }, []);
   
  // 수정 글 입력
  const onEditArticleInput = (e) => {
    setState({...state, [e.target.name]: e.target.value });
  };

  // 전체 글 fetch
  const fetchArticle = async () => {
    const response = await getDailyArticle();
    setState({...response.data});
    console.log(response.data.content)
  };

  // 글 수정
  const onArticleEdit = (boardId) => {
    client
      .put(`/daily/${boardId}`, {
        boardContent: state.boardArticle
      })
      .then((response) => response)
    fetchArticle();
  };

  // 글 수정 창 여닫기
  const onHandleArticleEdit = (e) => {
    if(!state.showEditArticle){
      setState({...state, showEditArticle: !state.showEditArticle, boardArticle:""})
    }else{
      setState({...state, showEditArticle: !state.showEditArticle, boardArticle:""})
    }
  }
  
  // 글 삭제
  const onArticleDelete = async (boardId) => {
    deleteDailyArticle(boardId)
  };
  // 댓글 입력
  const onHandleInput = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  // 댓글 작성
  const onCommentPost = (parent_id) => {
    client
      .post(`/daily/comment/${parent_id}`, {
        boardContent: comment.boardComment
      })
      .then((response) => response)
  };



  // 댓글 목록 여닫기
  const onHandleCommentList = (e) => {
    if(!comment.showComment){
      setComment({...comment, showComment: !comment.showComment})
    }else{
      setComment({...comment, showComment: !comment.showComment})
    }
  };

  // 댓글 창 여닫기
  const onHandleComment = (e) => {
    if(!comment.isComment){
      setComment({...comment, isComment: !comment.isComment, boardComment:""})
    }else{
      setComment({...comment, isComment: !comment.isComment, boardComment:""})
    }
  }



  return (
    <div>
      <DailyContent>
        <div style={{ width: "20%" }}>{createrId}: 작성자 id<ProfileImg></ProfileImg></div>
        <div style={{ width: "60%" }}>{boardContent}</div>
        <div style={{ width: "10%" }}>
          <div style = {{ display: state.userId === createrId ? "block" : "none"}}>
            <DailyBoardEditButton onClick={onHandleArticleEdit}>
              수정
            </DailyBoardEditButton>
          </div>
        </div>
        <div style={{ width: "10%", display: state.userId === createrId ? "block" : "none" }}>
          <DailyBoardEditButton onClick={() => onArticleDelete(boardId)}>
            삭제
          </DailyBoardEditButton>
        </div>
        <div style={{ width: "10%" }}>
          <DailyBoardEditButton onClick={onHandleCommentList}>
            {comment.showComment === true? "댓글닫기": "댓글보기"}
          </DailyBoardEditButton>
        </div>
        <div style={{ width: "10%" }}>
          <DailyBoardEditButton onClick={onHandleComment}>
            {comment.isComment === true? "댓글취소": "댓글달기"}
          </DailyBoardEditButton>
        </div>
      </DailyContent>
      <div>
        <div style = {{display: state.showEditArticle === false ? "none" : "block"}}>
        <DailyCommentInput
            placeholder="글 수정 인풋"
            type="string"
            value={state.boardArticle}
            name="boardArticle"
            onChange={onEditArticleInput}
          />
          <DailyCommentPostButton onClick={()=> onArticleEdit(boardId)}>글 수정하기</DailyCommentPostButton>
        </div>
      </div>
      <div>
        <div style = {{display: comment.isComment === false ? "none" : "block"}}>
          <DailyCommentInput
            placeholder="댓글칸"
            type="string"
            value={comment.boardComment}
            name="boardComment"
            onChange={onHandleInput}
          />
          <DailyCommentPostButton onClick={()=> onCommentPost(boardId)}>댓글달기</DailyCommentPostButton>
        </div>
      </div>
      <div style = {{display: comment.showComment === false ? "none" : "block"}}>
        <CommentList parentId={boardId}/>
      </div>
    </div>
  );
};

export default DailyListItem;