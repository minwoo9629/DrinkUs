import styled from "styled-components";

const DeleteButton = styled.div`
  background-color: #bdcff2;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  padding: 4px 12px;
  color: white;
  text-align: center;
`;

const ArticleListItem = ({
  articleId,
  articleContent,
  type,
  onHandleRemoveArticle,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        marginBottom: "32px",
        alignItems: "center",
        height: "20px",
      }}
    >
      <div style={{ width: "20%" }}>{type}</div>
      <div
        style={{
          width: "75%",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
      >
        {articleContent}
      </div>
      <div style={{ width: "15%" }}>
        <DeleteButton onClick={() => onHandleRemoveArticle(articleId)}>
          삭제
        </DeleteButton>
      </div>
    </div>
  );
};

export default ArticleListItem;
//
