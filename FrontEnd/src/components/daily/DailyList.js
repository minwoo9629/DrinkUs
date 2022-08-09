import React from "react";
import DailyListItem from "./DailyListItem";
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

const DailyList = React.memo(({ dailyList, onArticleEdit, onArticleDelete, onHandleComment}) => {
  return (
    <DailyBoard>
      {dailyList.length !== 0 ? (
        <>
          {dailyList.map((content) => (
            <DailyListItem
              {...content}
              key={content.boardId}
              onArticleEdit={onArticleEdit}
              onArticleDelete={onArticleDelete}
              onHandleComment={onHandleComment}
            />
          ))}
        </>
      ) : (
        <>
          <p>현재 작성된 글이 없습니다.</p>
        </>
      )}
    </DailyBoard>
  );
});

export default DailyList;