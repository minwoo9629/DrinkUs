import React from "react";
import ArticleListItme from "./ArticleListItme";

const ArticleList = React.memo(({ articleList, onHandleRemoveArticle }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "20px 20px",
        minHeight: "640px",
        margin: "0px 80px",
      }}
    >
      {articleList.length !== 0 ? (
        <>
          {articleList.map((content) => (
            <ArticleListItme
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
