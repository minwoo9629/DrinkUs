import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { BaseFlexColWrapper } from "../../../components/styled/Wrapper";
import { CalendarButton } from "../../../components/common/buttons/CalendarButton";
import {
  getDailyArticle,
  postDailyArticle,
  deleteDailyArticle,
} from "../../../api/DailyAPI";
import { useInView } from "react-intersection-observer";
import DailyListItem from "../../../components/daily/DailyListItem";
import { client } from "../../../utils/client";

// 전체 배경
const Wrapper = styled.div`
width: 1200px;
margin: auto;
`;

// 글쓰기 인풋 div
const DailyArticleInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100px;
  background-color: white;
`;

// 글쓰기 인풋
const DailyArticleInput = styled.textarea`
  justify-content: space-between;
  width: 90%;
  height: 100%;
  border-radius: 1px;
  border: solid #6f92bf 0.1em;
  background-color: #eaf1ff;
  position: relative;
  padding-left: 20px;
  padding-top: 20px;
  resize: none;
`;

// 글쓰기 버튼
const DailyArticlePostButton = styled.button`
  border-radius: 1px;
  height: 102%;
  width: 10%;
  margin-left: 10px;
  background-color: #bdcff2;
  border: solid #bdcff2 0.1em;
  color: white;
  font-size: 16px;
  cursor: pointer;
`;

const TopMenuWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 40px;
`;

const DailyWrapper = styled.div`
  width: 100%;
`;

const DailyInitMessage = styled.div`
  width: 100%;
  display: flex;
  color: #9797a3;
  margin-bottom: 10px;
  font-size: 14px;
`;

const DailyCommunity = () => {
  const [state, setState] = useState({
    // 보낼 정보
    boardArticle: "",
    boardComment: "",
    // 댓글 창 여닫을 때 필요한 값
    isComment: false,
    isRender: false,
  });
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [ref, inView] = useInView();

  // 전체 글 fetch
  const getItems = useCallback(async () => {
    setLoading(true);
    await client.get(`/daily?page=${page}&size=10`).then((res) => {
      setItems((prevState) => [...prevState, ...res.data.content]);
    });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
  }, [page]);

  // useEffect를 이용하여 전체 게시글 fetch 하기
  useEffect(() => {
    getItems();
  }, [getItems]);

  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (inView && !loading) {
      setPage((prevState) => prevState + 1);
    }
  }, [inView, loading]);

  // 입력
  const onHandleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  // 글 작성
  const onArticlePost = async (e) => {
    const data = {
      boardContent: state.boardArticle,
    };

    // response로 새로운 글 번호 받기
    const response = await postDailyArticle(data);
    if (response.status === 200) {
      setState({ ...state, boardArticle: "" });
    }

    const newDailyArticle = await client.get(`/daily/${response.data}`);
    setItems((prevState) => [newDailyArticle.data, ...prevState]);
  };

  // 엔터 키 눌렀을 때 입력
  const onEnterPress = (e) => {
    if (e.key === "Enter") {
      onArticlePost(e);
    }
    getDailyArticle();
  };

  // 글 수정
  const onArticleEdit = (boardId, boardContent) => {
    client
      .put(`/daily/${boardId}`, {
        boardContent,
      })
      .then((response) => response);

    setItems((prevState) =>
      prevState.map((item) =>
        item.boardId === boardId ? { ...item, boardContent } : item
      )
    );
  };
  // 글 삭제
  const onArticleDelete = async (boardId) => {
    await deleteDailyArticle(boardId);
    setItems((prevState) =>
      prevState.filter((item) => item.boardId !== boardId)
    );
  };
  return (
    <>
    <Wrapper>
      <BaseFlexColWrapper>
        <DailyInitMessage>
          일간 게시판은 매일 오전 6시에 초기화됩니다.
        </DailyInitMessage>
        <DailyArticleInputWrapper>
          <DailyArticleInput
            placeholder="글을 작성하세요"
            value={state.boardArticle}
            name="boardArticle"
            onChange={onHandleInput}
            onKeyPress={onEnterPress}
          />
          <DailyArticlePostButton onClick={onArticlePost}>
            글쓰기
          </DailyArticlePostButton>
        </DailyArticleInputWrapper>
        <DailyWrapper>
          {items.map((item, idx) => (
            <React.Fragment key={idx}>
              {items.length - 1 == idx ? (
                <>
                  <div ref={ref}>
                    <DailyListItem
                      {...item}
                      key={item.boardId}
                      onArticleEdit={onArticleEdit}
                      onArticleDelete={onArticleDelete}
                    >
                      {item.boardContent}
                      {item.boardId}
                      {item.createrId}
                    </DailyListItem>
                  </div>
                </>
              ) : (
                <>
                  <DailyListItem
                    {...item}
                    key={item.boardId}
                    onArticleEdit={onArticleEdit}
                    onArticleDelete={onArticleDelete}
                  >
                    {item.boardContent}
                    {item.boardId}
                    {item.createrId}
                  </DailyListItem>
                </>
              )}
            </React.Fragment>
          ))}
        </DailyWrapper>
      </BaseFlexColWrapper>
      </Wrapper>
    </>
  );
};

export default DailyCommunity;
