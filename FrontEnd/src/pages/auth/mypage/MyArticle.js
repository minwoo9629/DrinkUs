import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getMyArticle, removeMyArticle } from "../../../api/MyPageAPI";
import ArticleList from "../../../components/articles/ArticleList";
import ProfileTitle from "../../../components/auth/ProfileTitle";
import PageNation from "../../../components/common/buttons/PageNation";

const ArticleTap = styled.div`
  display: flex;
  padding: 8px 20px;
  margin: 0px 80px;
  border-bottom: 1px solid #6f92bf;
`;

const MyArticle = () => {
  const [articleState, setArticleState] = useState({
    content: [],
    number: 0,
    numberOfElements: 0,
    size: 0,
    totalPages: 0,
  });
  const [profileImageState, setProfileImageState] = useState("1");
  const [userNameState, setUserNameState] = useState("");
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    setProfileImageState(!user.data.userImg ? "1" : user.data.userImg);
    setUserNameState(user.data.userName);
  }, []);

  const fetchData = async (pageNum) => {
    const response = await getMyArticle(pageNum);
    setArticleState({ ...response.data });
  };

  const onHandlePageButton = (pageNum) => {
    fetchData(pageNum);
  };
  const onHandleRemoveArticle = (articleId) => {
    removeMyArticle(articleId);
    setArticleState({
      ...articleState,
      numberOfElements: articleState.numberOfElements - 1,
    });
    navigate("/user/article");
  };

  useEffect(() => {
    fetchData(articleState.number);
  }, [articleState.numberOfElements]);
  return (
    <div style={{ padding: "30px 0px 30px 20px" }}>
      <ProfileTitle
        isEdit={false}
        imageId={profileImageState}
        userName={userNameState}
        marginLeft={"40px"}
      />
      <div style={{ marginTop: "30px" }}>
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
            <PageNation
              onClick={onHandlePageButton}
              number={articleState.number + 1}
              size={articleState.size}
              totalPages={articleState.totalPages}
            />
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default MyArticle;
