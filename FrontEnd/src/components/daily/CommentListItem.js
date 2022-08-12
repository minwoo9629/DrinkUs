import { useState, useEffect } from "react";
import styled from "styled-components";
import {
  deleteDailyComment,
} from "../../api/DailyAPI";
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

// 수정, 삭제 감싸는 div
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

const ProfileWrapper = styled.div`
  display: column;
  margin: 8px;
`;

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

const CommentListItem = ({
  boardId,
  boardContent,
  parentId,
  createrId
  }) => {
  const [state, setState] = useState({
    boardComment: "",
    showCommentEdit: false,
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

  // 댓글 삭제
  const onCommentDelete = async (boardId) => {
    deleteDailyComment(boardId)
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // 댓글 수정
  const onCommentEdit = (boardId) => {
    client
      .put(`/daily/${boardId}`, {
        boardContent: state.boardComment
      })
      .then((response) => response)
  }

  // 댓글 수정하기 버튼
  const DailyCommentEditButton = styled.button`
    padding: 12px 24px;
    border-radius: 3px;
    background-color: #bdcff2;
    color: white;
    font-size: 16px;
    margin: 4px;
    border: 1px #eaf1ff;
  `

  // 댓글 수정 창 여닫기
  const onHandleCommentEdit = (e) => {
    if(!state.showCommentEdit){
      setState({...state, showCommentEdit: !state.showCommentEdit, boardComment: ""})
    }else{
      setState({...state, showCommentEdit: !state.showCommentEdit, boardComment: ""})
    }
  };

  // 댓글 수정 입력
  const onHandleInput = (e) => {
    setState({...state, [e.target.name]: e.target.value});
  };

  return (
    <div>
      <DailyWrapper>
        <ProfileWrapper style={{ width: "20%" }}>{createrId}: 작성자 id</ProfileWrapper>
          <div style={{ width: "60%" }}>{boardContent}</div>
          <div style = {{ display: state.userId === createrId ? "block" : "none"}}>

            <DailyBoardEditButton
            onClick={() => onHandleCommentEdit()}
            >
                수정
            </DailyBoardEditButton>
            <DailyBoardEditButton onClick={() => onCommentDelete(boardId)}>
                삭제
            </DailyBoardEditButton>
          </div>
      </DailyWrapper>
          <div>
            <div style = {{ display: state.showCommentEdit === false ? "none" : "block"}}>
              <DailyCommentInput
                placeholder="댓글 수정 인풋"
                type="string"
                value={state.boardComment}
                name="boardComment"
                onChange={onHandleInput}
                />
                <DailyCommentEditButton onClick={()=> onCommentEdit(boardId)}>댓글 수정하기</DailyCommentEditButton>
            </div>
          </div>
    </div>
  )
};

export default CommentListItem;