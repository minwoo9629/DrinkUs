import { useState, useEffect } from "react";
import styled from "styled-components";
import { deleteDailyComment } from "../../api/DailyAPI";
import { client } from "../../utils/client";

const CommentWrapper = styled.div`
  justify-content: space-between;
  width: 100%;
  height: 11vh;
  margin: 12px 0;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CommentContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
  border-radius: 1px;
  border: 1px solid #bdcff2;
  background-color: white;
`;

// 글 수정 삭제 버튼
const DailyBoardEditButton = styled.button`
  padding: 4px 8px;
  background-color: transparent;
  color: black;
  font-size: 8px;
  margin: 4px;
  border: 1px white;
  text-align: flex;
`;

const ProfileWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// 댓글 수정 인풋
const DailyModifyInput = styled.input`
  width: 100%;
  height: 100%;
  border-radius: 1px;
  border: solid #6f92bf 0.1em;
  background-color: white;
  position: relative;
  padding-left: 20px;
`;

// 댓글 수정 버튼
const DailyModifyButton = styled.button`
  float: right;
  padding: 6px 24px;
  border-radius: 1px;
  height: 102%;
  background-color: #bdcff2;
  border: solid #bdcff2 0.1em;
  color: white;
  font-size: 16px;
  margin: 16px;
`;

const ProfileImg = styled.img`
  padding: 8px;
  border-radius: 24px;
  width: 24px;
  height: 24px;
  margin: auto 10px;
  background-color: #6f92bf;
`;

const ContentWrapper = styled.div`
  margin-left: 5px;
  display: flex;
  flex-direction: column;
  align-items: baseline;
`;

const Nickname = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: #6f92bf;
`;

const BoardContent = styled.div`
  font-size: 15px;
  font-weight: 500;
  padding: 5px 0;
`;

const CommentListItem = ({
  boardId,
  boardContent,
  userNickname,
  createrId,
  userImg,
}) => {
  const [state, setState] = useState({
    boardComment: boardContent,
    showCommentEdit: false,
    userImg: "",
  });

  // 접속한 유저 정보 가져오기
  const fetchUser = async () => {
    client.get("users").then(function (response) {
      const data = response.data;
      setState({
        ...state,
        userId: data.userId,
      });
    });
  };

  // 댓글 삭제
  const onCommentDelete = async (boardId) => {
    deleteDailyComment(boardId);
    window.location.replace("/daily");
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // 댓글 수정
  const onCommentEdit = (boardId) => {
    client
      .put(`/daily/${boardId}`, {
        boardContent: state.boardComment,
      })
      .then((response) => response);
  };

  // 댓글 수정 창 여닫기
  const onHandleCommentEdit = (e) => {
    if (!state.showCommentEdit) {
      setState({
        ...state,
        showCommentEdit: !state.showCommentEdit,
        boardComment: boardContent,
      });
    } else {
      setState({
        ...state,
        showCommentEdit: !state.showCommentEdit,
        boardComment: boardContent,
      });
    }
  };

  // 댓글 수정 입력
  const onHandleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  // 댓글 화살표
  const CommentArrow = styled.img`
    width: 4vw;
    padding: 11px 12px;
    background-color: white;
    position: relative;
    font-size: 24px;
    color: #6f92bf;
  `;

  // 엔터 키 눌렀을 때 입력
  const onEnterPress = (e) => {
    if (e.key === "Enter") {
      onCommentEdit(boardId);
    }
  };

  return (
    <div>
      <CommentWrapper>
        <CommentArrow src="assets/commentarrow.png"></CommentArrow>
        <CommentContentWrapper>
          <ProfileWrapper>
            <div>
              <ProfileImg
                onClick={() => navigate(`/users/profile/${createrId}`)}
                src={`assets/profileImage/profile${userImg}.png`}
              ></ProfileImg>
            </div>
            <ContentWrapper>
              <Nickname>{userNickname}</Nickname>
              <div
                style={{
                  display: state.showCommentEdit === true ? "none" : "block",
                }}
              >
                <BoardContent>{boardContent}</BoardContent>
              </div>
              <div
                style={{
                  display: state.showCommentEdit === false ? "none" : "block",
                }}
              >
                <DailyModifyInput
                  placeholder=""
                  type="string"
                  value={state.boardComment}
                  name="boardComment"
                  onChange={onHandleInput}
                  onKeyPress={onEnterPress}
                />
              </div>
            </ContentWrapper>
          </ProfileWrapper>
          <div
            style={{
              display:
                state.userId === createrId && state.showCommentEdit === false
                  ? "block"
                  : "none",
            }}
          >
            <DailyBoardEditButton onClick={() => onHandleCommentEdit()}>
              수정
            </DailyBoardEditButton>
            <DailyBoardEditButton onClick={() => onCommentDelete(boardId)}>
              삭제
            </DailyBoardEditButton>
          </div>
          <div
            style={{
              display: state.showCommentEdit === false ? "none" : "block",
            }}
          >
            <DailyModifyButton onClick={onHandleCommentEdit}>
              수정 취소
            </DailyModifyButton>
            <DailyModifyButton onClick={() => onCommentEdit(boardId)}>
              수정하기
            </DailyModifyButton>
          </div>
        </CommentContentWrapper>
      </CommentWrapper>
    </div>
  );
};

export default CommentListItem;
