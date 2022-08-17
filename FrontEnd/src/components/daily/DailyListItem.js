import styled from "styled-components";
import {
  getDailyArticle,
  editDailyArticle,
  deleteDailyComment,
} from "../../api/DailyAPI";
import CommentListItem from "./CommentListItem";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "../../utils/client";
import { getDailyComment } from "../../api/DailyAPI";
import React from "react";
import Modal from "../modals/Modal";
import UserProfileContent from "../modals/contents/UserProfileContent";

const DailyContent = styled.div`
  width: 100%;
  height: 11vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px auto;
  border-radius: 1px;
  border: 1px solid #bdcff2;
`;

const ProfileImg = styled.img`
  padding: 8px;
  border-radius: 24px;
  width: 28px;
  height: 28px;
  margin: auto 10px;
  background-color: #6f92bf;
`;

const DailyContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  /* margin-left: 40px; */
`;

// 수정, 삭제, 댓글달기 감싸는 div
const DailyEditWrapper = styled.div`
  justify-content: center;
  align-items: center;
`;

// 수정, 삭제, 댓글달기 감싸는 div
const DailyEdit = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
`;

// 글 수정 삭제 버튼
const DailyBoardEditButton = styled.button`
  background-color: transparent;
  color: black;
  font-size: 8px;
  color: #6f92bf;
  margin: 10px;
  border: 1px white;
  text-align: flex;
`;

// 글 답글관련 버튼
const DailyBoardCommentButton = styled.button`
  background-color: transparent;
  color: black;
  font-size: 8px;
  margin: 10px;
  border: 1px white;
  text-align: flex;
`;

// 글 수정 인풋
const DailyModifyInput = styled.input`
  width: 100%;
  height: 100%;
  border-radius: 1px;
  border: solid #6f92bf 0.1em;
  background-color: #eaf1ff;
  position: relative;
  padding-left: 20px;
`;

// 글 수정 버튼
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

const CommentWrapper = styled.div`
  width: 100%;
  height: 11vh;
  margin: 12px auto;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 댓글 화살표
const CommentArrow = styled.img`
  width: 4vw;
  /* border: 1px solid #bdcff2; */
  padding: 11px 12px;
  background-color: white;
  position: relative;
  font-size: 24px;
  color: #6f92bf;
`;

const CommentInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`;

// 댓글 인풋
const DailyCommentInput = styled.input`
  justify-content: space-between;
  width: 85%;
  height: 100%;
  align-items: center;
  margin: 20px 0;
  border-radius: 1px;
  border: solid #6f92bf 0.1em;
  background-color: #eaf1ff;
  position: relative;
  padding-left: 20px;
`;

// 댓글 달기 버튼
const DailyCommentPostButton = styled.button`
  padding: 12px 24px;
  border-radius: 1px;
  height: 102%;
  width: 10%;
  background-color: #bdcff2;
  border: solid #bdcff2 0.1em;
  color: white;
  font-size: 16px;
  cursor: pointer;
`;

const NoCommentItem = styled.div`
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #6f92bf;
`;

const DailyListItem = ({
  userImg,
  createrId,
  userNickname,
  boardId,
  boardContent,
  onArticleEdit,
  onArticleDelete,
}) => {
  const [commentList, setCommentList] = useState([]);
  const [state, setState] = useState({
    boardArticle: boardContent,
    showEditArticle: false,
    userId: "",
    userNickname: "",
    userImg: "",
  });
  const [comment, setComment] = useState({
    isComment: false,
    showComment: false,
    boardComment: "",
  });

  const [modalState, setModalState] = useState(false);

  // 접속한 유저 정보 가져오기
  const fetchUser = async () => {
    client.get("users").then(function (response) {
      const data = response.data;
      setState({
        ...state,
        userId: data.userId,
        userNickname: data.userNickname,
      });
    });
  };
  useEffect(() => {
    fetchCommentData();
  }, [commentList.length]);

  useEffect(() => {
    fetchUser();
  }, []);

  const navigate = useNavigate();

  // 수정 글 입력
  const onEditArticleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  // 글 수정 창 여닫기
  const onHandleArticleEdit = (e) => {
    if (!state.showEditArticle) {
      setState({
        ...state,
        showEditArticle: !state.showEditArticle,
        boardArticle: boardContent,
      });
    }
    if (comment.showComment) {
      setComment({ ...comment, showComment: !comment.showComment });
    }
    if (comment.isComment) {
      setComment({ ...comment, isComment: !comment.isComment });
    } else {
      setState({
        ...state,
        showEditArticle: !state.showEditArticle,
        boardArticle: boardContent,
      });
    }
  };

  // 댓글 입력
  const onHandleInput = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  // 댓글 작성
  const onCommentPost = async () => {
    await client
      .post(`/daily/comment/${boardId}`, {
        boardContent: comment.boardComment,
      })
      .then((response) => response);
    setComment((prevState) => {
      return { ...prevState, boardComment: "" };
    });
    fetchCommentData();
  };

  const fetchCommentData = async () => {
    const result = await getDailyComment(boardId);
    setCommentList([...result.data]);
  };

  // 댓글 목록 여닫기
  const onHandleCommentList = async (parentId) => {
    if (!comment.showComment) {
      setComment((prevState) => {
        return {
          ...prevState,
          showComment: !comment.showComment,
          isComment: !comment.isComment,
          boardComment: "",
        };
      });
      const response = await getDailyComment(parentId);
      setCommentList([...response.data]);
    }
    if (state.showEditArticle) {
      setState((prevState) => {
        return { ...prevState, showEditArticle: !state.showEditArticle };
      });
    } else {
      setComment((prevState) => {
        return {
          ...prevState,
          showComment: !comment.showComment,
          isComment: !comment.isComment,
          boardComment: "",
        };
      });
      const response = await getDailyComment(parentId);
      setCommentList([...response.data]);
    }
  };

  // 엔터 키 눌렀을 때 글 수정
  const onEnterPress = (e) => {
    if (e.key === "Enter") {
      onArticleEdit(boardId, state.boardArticle);
      onHandleArticleEdit();
    }
  };

  // 엔터 키 눌렀을 때 댓글 입력
  const onEnterCommentPost = (e) => {
    if (e.key === "Enter") {
      onCommentPost(boardId);
    }
  };
  // 댓글 수정
  const onCommentEdit = (boardId, boardComment) => {
    console.log(boardId, boardComment);
    client
      .put(`/daily/${boardId}`, {
        boardContent: boardComment,
      })
      .then((response) => response);
    setCommentList((prevState) =>
      prevState.map((item) =>
        item.boardId === boardId
          ? { ...item, boardContent: boardComment }
          : item
      )
    );
  };

  // 댓글 삭제
  const onCommentDelete = async (boardId) => {
    deleteDailyComment(boardId);
    setCommentList((prevState) =>
      prevState.filter((item) => item.boardId !== boardId)
    );
  };

  // 모달 열기
  const openModal = () => {
    setModalState(true);
  };

  const closeModal = () => {
    setModalState(false);
  };

  return (
    <div>
      <Modal
        width={"800px"}
        height={"600px"}
        isOpen={modalState}
        closeModal={closeModal}
        modalContent={
          <UserProfileContent userId={createrId} close={closeModal} />
        }
      />
      <DailyContent>
        <DailyContentWrapper>
          <div>
            <ProfileImg
              onClick={openModal}
              src={`assets/profileImage/profile${userImg}.png`}
            ></ProfileImg>
          </div>
          <ContentWrapper>
            <Nickname style={{ color: "#6f92bf" }}>{userNickname}</Nickname>
            <BoardContent
              style={{
                display: state.showEditArticle === true ? "none" : "block",
              }}
            >
              {boardContent}
            </BoardContent>
            <BoardContent
              style={{
                display: state.showEditArticle === false ? "none" : "block",
              }}
            >
              <DailyModifyInput
                type="string"
                value={state.boardArticle}
                name="boardArticle"
                onChange={onEditArticleInput}
                onKeyPress={onEnterPress}
              />
            </BoardContent>
          </ContentWrapper>
        </DailyContentWrapper>
        <DailyEditWrapper>
          <DailyEdit>
            <div
              style={{
                display:
                  state.userId === createrId && state.showEditArticle === false
                    ? "block"
                    : "none",
              }}
            >
              <DailyBoardEditButton onClick={onHandleArticleEdit}>
                수정
              </DailyBoardEditButton>
            </div>
            <div
              style={{
                display:
                  state.userId === createrId && state.showEditArticle === false
                    ? "block"
                    : "none",
              }}
            >
              <DailyBoardEditButton onClick={() => onArticleDelete(boardId)}>
                삭제
              </DailyBoardEditButton>
            </div>
          </DailyEdit>
          <DailyContentWrapper>
            <div
              style={{
                display: state.showEditArticle === false ? "block" : "none",
              }}
            >
              <DailyBoardCommentButton
                onClick={() => onHandleCommentList(boardId)}
              >
                {comment.showComment === true ? "댓글닫기" : "댓글보기"}
              </DailyBoardCommentButton>
            </div>
          </DailyContentWrapper>
          <div
            style={{
              display: state.showEditArticle === false ? "none" : "block",
            }}
          >
            <DailyModifyButton onClick={onHandleArticleEdit}>
              수정 취소
            </DailyModifyButton>
            <DailyModifyButton
              onClick={() => {
                onArticleEdit(boardId, state.boardArticle);
                onHandleArticleEdit();
              }}
            >
              수정하기
            </DailyModifyButton>
          </div>
        </DailyEditWrapper>
      </DailyContent>
      <div>
        <CommentWrapper
          style={{ display: comment.isComment === false ? "none" : "flex" }}
        >
          <CommentArrow src="assets/commentarrow.png"></CommentArrow>
          <CommentInputWrapper>
            <DailyCommentInput
              placeholder="댓글을 입력해주세요"
              type="string"
              value={comment.boardComment}
              name="boardComment"
              onChange={onHandleInput}
              onKeyPress={onEnterCommentPost}
            />
            <DailyCommentPostButton onClick={onCommentPost}>
              완료
            </DailyCommentPostButton>
          </CommentInputWrapper>
        </CommentWrapper>
      </div>
      <div
        style={{ display: comment.showComment === false ? "none" : "block" }}
      >
        {commentList.length !== 0 ? (
          <>
            {commentList.map((item, idx) => (
              <React.Fragment key={idx}>
                <CommentListItem
                  {...item}
                  key={item.parentId}
                  onCommentEdit={onCommentEdit}
                  onCommentDelete={onCommentDelete}
                />
              </React.Fragment>
            ))}
          </>
        ) : (
          <>
            <NoCommentItem>해당 게시글에 댓글이 없습니다.</NoCommentItem>
          </>
        )}
      </div>
    </div>
  );
};

export default React.memo(DailyListItem);
