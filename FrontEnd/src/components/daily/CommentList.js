import React, { useEffect, useState } from "react";
import CommentListItem from "./CommentListItem";
import styled from "styled-components";
import { getDailyComment } from "../../api/DailyAPI";

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
const CommentList = React.memo(({ parentId }) => {
  const [commentList, setCommentList] = useState([])
  const fetchComment = async (parentId) =>{
    if(!parentId) {
      const response = await getDailyComment(parentId)
      setCommentList([...response.data])
    }
  }
  useEffect(()=>{
      fetchComment(parentId);
  },[])
  return (
    <div>
      {commentList.length !== 0 ? (
        <>
          {commentList.map((content) => (
            <CommentListItem
              {...content}
              key={content.parentId}
            />
          ))}
        </>
      ) : (
        <>
          <p>해당 게시글에 댓글이 없습니다.</p>
        </>
      )}
    </div>
  );
});

export default CommentList;

CommentList.defaultProps= {
  commentList : [],
}