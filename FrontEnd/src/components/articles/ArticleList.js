import React from "react";
import ArticleListItem from "./ArticleListItem";

const ArticleList = React.memo(({ articleList, onHandleRemoveArticle }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "20px 20px",
        minHeight: "560px",
        margin: "0px 80px",
      }}
    >
      {articleList.length !== 0 ? (
        <>
          {articleList.map((content) => (
            <ArticleListItem
              {...content}
              key={content.articleId}
              onHandleRemoveArticle={onHandleRemoveArticle}
            />
          ))}
        </>
      ) : (
        <>
          <p>현재 작성된 글이 없습니다.</p>
        </>
      )}
    </div>
  );
});

export default ArticleList;
