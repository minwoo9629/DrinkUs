import styled from "styled-components";
import {
  getDailyComment,
  postDailyComment,
  editDailyComment,
  deleteDailyComment,
} from "../../api/DailyAPI";

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
  background-color: red;
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

const CommentListItem = ({
  boardId,
  boardContent,
  parentId,
  createrId
}) => {
  return (
    <DailyWrapper>
      <ProfileWrapper style={{ width: "20%" }}>{parentId}</ProfileWrapper>
        <div style={{ width: "60%" }}>{boardContent}</div>
        <DailyEditWrapper style={{ width: "10%" }}/>
    </DailyWrapper>
  )
};

export default CommentListItem;