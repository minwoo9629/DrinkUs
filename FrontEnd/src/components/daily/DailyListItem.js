import styled from "styled-components";
import {
  getDailyArticle,
  deleteDailyArticle,
} from "../../api/DailyAPI";
import CommentListItem from "./CommentListItem";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "../../utils/client";
import { getDailyComment } from "../../api/DailyAPI";
import React from "react";

const DailyContent = styled.div`
  width: 100%;
  height: 11vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px auto;
  border-radius: 1px;
  border: 1px solid #bdcff2;
`

const ProfileImg = styled.img`
  padding: 8px;
  border-radius: 24px;
  width: 24px;
  height: 24px;
  margin: auto 10px;
  background-color: #6f92bf;
`;

const DailyContentWrapper = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
`

const ContentWrapper = styled.div`
margin-left: 5px;
`


const Nickname = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: #6f92bf;
`

const BoardContent = styled.div`
  font-size: 15px;
  font-weight: 500;
  padding : 10px 0;
`

// 수정, 삭제, 댓글달기 감싸는 div
const DailyEditWrapper = styled.div`
  justify-content: center;
  align-items: center;
`


// 수정, 삭제, 댓글달기 감싸는 div
const DailyEdit = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
`

// 글 수정 삭제 버튼
const DailyBoardEditButton = styled.button`
  background-color: transparent;
  color: black;
  font-size: 8px;
  color: #6f92bf;
  margin: 10px;
  border: 1px white;
  text-align: flex;
`

// 글 답글관련 버튼
const DailyBoardCommentButton = styled.button`
  background-color: transparent;
  color: black;
  font-size: 8px;
  margin: 10px;
  border: 1px white;
  text-align: flex;
`
// 글 수정 쪽
const DailyModifyWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 9vh;
  background-color: white;
`

const ProfileEditRowWapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: ${(props) => props.alignItems};
  padding: ${(props) => props.padding};
  border: ${(props) => props.border};
  border-radius: ${(props) => props.borderRadius};
  margin-left: ${(props) => props.marginLeft};
`;

// 글 수정 인풋
const DailyModifyInput = styled.input`
  width: 87%;
  height: 100%;
  border-radius: 1px;
  border: solid #6F92BF 0.1em;
  background-color: #EAF1FF;
  position: relative;
  padding-left: 20px;
`

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
  border-radius: 3px;
  background-color: #bdcff2;
  color: white;
  font-size: 16px;
  margin: 4px;
  border: 1px #eaf1ff;
`

const NoCommentItem = styled.div`
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #6f92bf;
`

const DailyListItem = (
  {
    userImg,
    createrId,
    userNickname,
    boardId,
    boardContent
  }) => {
  const [commentList, setCommentList] = useState([])
  const [state, setState] = useState({
    boardArticle: "",
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

  // 접속한 유저 정보 가져오기
  const fetchUser = async () => {
    client
      .get("users")
      .then(function (response) {
        const data = response.data;
        setState({
          ...state,
          userId: data.userId,
          userNickname: data.userNickname
        })
      })
  };

  useEffect(() => {
    fetchUser();
  }, []);


  const navigate = useNavigate();

  // 수정 글 입력
  const onEditArticleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
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
    if (!state.showEditArticle) {
      setState({ ...state, showEditArticle: !state.showEditArticle, boardArticle: "" })
    }
    if (comment.showComment) {
      setComment({...comment, showComment: !comment.showComment})
    }
    if (comment.isComment) {
      setComment({...comment, isComment: !comment.isComment})
    }
    else {
      setState({ ...state, showEditArticle: !state.showEditArticle, boardArticle: "" })
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
    console.log(parent_id)
  };



  // 댓글 목록 여닫기
  const onHandleCommentList = async (parentId) => {
    if (!comment.showComment) {
      setComment({ ...comment, showComment: !comment.showComment })
      const response = await getDailyComment(parentId)
      setCommentList([...response.data])
    }
    if (state.showEditArticle) {
      setState({...state, showEditArticle: !state.showEditArticle})
    } 
    else {
      setComment({ ...comment, showComment: !comment.showComment })
    }
  };

  // 댓글 창 여닫기
  const onHandleComment = (e) => {
    if (!comment.isComment) {
      setComment({ ...comment, isComment: !comment.isComment, boardComment: "" })
    }
    if (state.showEditArticle) {
      setState({...state, showEditArticle: !state.showEditArticle})
    }
    else {
      setComment({ ...comment, isComment: !comment.isComment, boardComment: "" })
    }
  }

  // 엔터 키 눌렀을 때 입력
  const onEnterPress = (e) => {
    if(e.key === 'Enter') {
      onArticleEdit(boardId);
    }
  }
  return (
    <div>
      <DailyContent>
        <DailyContentWrapper>
          <div>
            <ProfileImg onClick={() => navigate(`/users/profile/${createrId}`)} src={`assets/profileImage/profile${userImg}.png`}>
            </ProfileImg>
          </div>
          <ContentWrapper>
            <Nickname style={{ color: "#6f92bf" }}>{userNickname}</Nickname>
            <BoardContent style={{ display: state.showEditArticle === true ? "none" : "block" }}>{boardContent}
            <div style={{ display: state.showEditArticle === false ? "none" : "block" }}>
                  <DailyModifyInput
                    placeholder="수정칸 입력"
                    type="string"
                    value={state.boardArticle}
                    name="boardArticle"
                    onChange={onEditArticleInput}
                    onKeyPress={onEnterPress}
                  />
                  <DailyModifyButton onClick={() => onArticleEdit(boardId)}>글수정</DailyModifyButton>
              </div>
            </BoardContent>
          </ContentWrapper>
        </DailyContentWrapper>
        <DailyEditWrapper>
          <DailyEdit>
            <div style={{ display: state.userId === createrId ? "block" : "none" }}>
              <DailyBoardEditButton onClick={onHandleArticleEdit}>
                수정
              </DailyBoardEditButton>
            </div>
            <div style={{ display: state.userId === createrId ? "block" : "none" }}>
              <DailyBoardEditButton onClick={() => onArticleDelete(boardId)}>
                삭제
              </DailyBoardEditButton>
            </div>
          </DailyEdit>
          <DailyContentWrapper>
            <div>
              <DailyBoardCommentButton onClick={() => onHandleCommentList(boardId)}>
                {comment.showComment === true ? "댓글닫기" : "댓글보기"}
              </DailyBoardCommentButton>
            </div>
            <div>
              <DailyBoardCommentButton onClick={onHandleComment}>
                {comment.isComment === true ? "댓글취소" : "댓글달기"}
              </DailyBoardCommentButton>
            </div>
          </DailyContentWrapper>
        </DailyEditWrapper>
      </DailyContent>
      {/* <DailyModifyWrapper style={{ display: state.showEditArticle === false ? "none" : "block" }}>
          <DailyModifyInput
            placeholder={state.boardContent}
            type="string"
            value={state.boardArticle}
            name="boardArticle"
            onChange={onEditArticleInput}
            onKeyPress={onEnterPress}
          />
          <DailyModifyButton onClick={() => onArticleEdit(boardId)}>글수정</DailyModifyButton>
        </DailyModifyWrapper> */}
      <div>
        <div style={{ display: comment.isComment === false ? "none" : "block" }}>
          <DailyCommentInput
            placeholder="댓글칸"
            type="string"
            value={comment.boardComment}
            name="boardComment"
            onChange={onHandleInput}
            onKeyPress={onEnterPress}
          />
          <DailyCommentPostButton onClick={() => onCommentPost(boardId)}>댓글달기</DailyCommentPostButton>
        </div>
      </div>
      <div style={{ display: comment.showComment === false ? "none" : "block" }}>
        {commentList.length !== 0 ?
          <>
            {commentList.map((item, idx) => (
              <React.Fragment key={idx}>
                <CommentListItem
                  {...item}
                  key={item.parentId}
                />
              </React.Fragment>
            ))}
          </>
          :
          <>
            <NoCommentItem>해당 게시글에 댓글이 없습니다.</NoCommentItem>
          </>
        }
      </div>
    </div>
  );
};

export default DailyListItem;