import styled from "styled-components";
import {
  getDailyArticle,
  postDailyArticle,
  editDailyArticle,
  deleteDailyArticle,
} from "../../api/DailyAPI";
import CommentList from "./CommentList";

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
  background-color: red;
  color: black;
  font-size: 8px;
  margin: 4px;
  border: 1px white;
  text-align: flex;
`


const DailyListItem = ({
  // userImg,
  createrId,
  boardId,
  boardContent,
  onArticleEdit,
  onArticleDelete,
  onHandleComment,
  }) => {
  return (
    <DailyWrapper>
      <DailyContent>
        <ProfileWrapper style={{ width: "20%" }}>{createrId}<ProfileImg>ㅁ</ProfileImg></ProfileWrapper>
        <div style={{ width: "60%" }}>{boardContent}</div>
        <DailyEditWrapper style={{ width: "10%" }}>
          <DailyBoardEditButton onClick={() => onArticleEdit(boardId)}>
            수정
          </DailyBoardEditButton>
          <DailyBoardEditButton onClick={() => onArticleDelete(boardId)}>
            삭제
          </DailyBoardEditButton>
          <DailyBoardEditButton onClick={() => onHandleComment(boardId)}>
            답글
          </DailyBoardEditButton>
        </DailyEditWrapper>
        <CommentList parentId={boardId}/>

      </DailyContent>
    </DailyWrapper>
  );
};

export default DailyListItem;