import { useEffect, useState } from "react";
import styled from "styled-components";
import { getMyArticle, removeMyArticle } from "../../../api/MyPageAPI";
import ArticleList from "../../../components/articles/ArticleList";
import ProfileTitle from "../../../components/auth/ProfileTitle";
import PageNationButton from "../../../components/common/buttons/PageNationButton";

const ArticleTap = styled.div`
  display: flex;
  padding: 8px 20px;
  margin: 0px 80px;
  border-bottom: 1px solid #6f92bf;
`;

const MyArticle = () => {
  const [articleState, setArticleState] = useState({
    content: [],
    number: 1,
    numberOfElements: 0,
    size: 0,
    totalPages: 0,
  });
  const fetchData = async (pageNum) => {
    const response = await getMyArticle(pageNum);
    setArticleState({ ...response.data });
  };

  const onHandlePageButton = (pageNum) => {
    fetchData(pageNum);
  };
  const onHandlePrevious = () => {
    fetchData(articleState.number);
  };

  const onHandleNext = () => {
    fetchData(articleState.number + 2);
  };

  const onHandleRemoveArticle = (articleId) => {
    removeMyArticle(articleId);
  };

  useEffect(() => {
    fetchData(articleState.number);
  }, []);
  console.log(articleState.number);

  return (
    <div style={{ padding: "30px" }}>
      <ProfileTitle isEdit={false} />
      <ArticleTap>
        <div style={{ width: "20%" }}>종류</div>
        <div style={{ width: "70%" }}>내용</div>
      </ArticleTap>
      <ArticleList
        articleList={articleState.content}
        onHandleRemoveArticle={onHandleRemoveArticle}
      />
      {articleState.content.length !== 0 ? (
        <>
          <PageNationButton
            onHandleNext={onHandleNext}
            onHandlePrevious={onHandlePrevious}
            onHandlePageButton={onHandlePageButton}
            number={articleState.number + 1}
            size={articleState.size}
            totalPages={articleState.totalPages}
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MyArticle;
