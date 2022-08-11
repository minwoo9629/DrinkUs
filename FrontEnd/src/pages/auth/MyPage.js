import Header from "../../components/layout/Header";
import { Wrapper } from "../../components/styled/Wrapper";
import styled from "styled-components";
import { useState } from "react";
import TabItem from "../../components/auth/TabItem";
import { Outlet } from "react-router-dom";

const EditWrapper = styled.div`
  width: 100%;
  max-width: 860px;
  min-height: 860px;
  margin: 100px 80px;
  background-color: white;
  border: 1px solid #6f92bf;
  border-radius: 3px;
  display: flex;
  height: 70%;
`;

const TabWrapper = styled.div`
  width: 20%;
`;

const EditorWrapper = styled.div`
  width: 80%;
  max-height: 860px;
  border-left: 1px solid #6f92bf;
  /* background-color: green; */
`;
const nestedLink = [
  {
    tabId: 1,
    title: "프로필 편집",
    link: "edit/profile",
  },
  {
    tabId: 2,
    title: "비밀번호 변경",
    link: "edit/password",
  },
  {
    tabId: 3,
    title: "내가 쓴 글",
    link: "article",
  },
  {
    tabId: 4,
    title: "나의 일정",
    link: "schedule",
  },
  {
    tabId: 5,
    title: "관심사 수정",
    link: "edit/interest",
  },
];
const MyPage = () => {
  return (
    <>
      <Header position="static" location={'lightzone'} />
      <Wrapper color={"#eaf2ff"} alignItems="none">
        <EditWrapper>
          <TabWrapper>
            {nestedLink.map((item) => (
              <TabItem {...item} key={item.tabId} />
            ))}
          </TabWrapper>
          <EditorWrapper>
            <Outlet />
          </EditorWrapper>
        </EditWrapper>
      </Wrapper>
    </>
  );
};

export default MyPage;
