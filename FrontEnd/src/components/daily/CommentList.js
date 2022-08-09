import React from "react";
import CommentListItem from "./CommentListItem";
import styled from "styled-components";

const DailyBoard = styled.div`
  justify-content: space-between;
  width: 72vw;
  height: 64vh;
  border-radius: 4px;
  border: solid #eaf1ff;
  background-color: white;
  margin: 4px;
  position: relative;
  display: flex;
  flex-direction: column;
`
React.memo(({ commentList }) => {
  return (
    <DailyBoard>
      {commentList.length !== 0 ? (
        <>
          {commentList.map((content) => (
            <CommentListItem
              {...content}
              key={content.boardId}
            />
          ))}
        </>
      ) : (
        <>
          <p>현재 작성된 글이 없습니다.</p>
        </>
      )}
    </DailyBoard>
  )
});

export default CommentList;

CommentList.defaultProps= {
  commentList : [],
}