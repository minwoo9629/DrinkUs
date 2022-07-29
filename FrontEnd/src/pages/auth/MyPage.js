import Header from "../../components/layout/Header";
import { Wrapper } from "../../components/styled/Wrapper";
import styled from "styled-components";
import { useState } from "react";
import TabItem from "../../components/auth/TabItem";
import EditProfile from "./mypage/EditProfile";
import EditPassword from "./mypage/EditPassword";
import EditInterest from "./mypage/EditInterest";
import MyArticle from "./mypage/MyArticle";
import MySchedule from "./mypage/MySchedule";

const EditWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 100px 80px;
  background-color: white;
  border: 1px solid #6f92bf;
  border-radius: 3px;
  display: flex;
  height: 70%;
`;

const TabWrapper = styled.ul`
  width: 20%;
`;

const EditorWrapper = styled.div`
  width: 80%;
  border-left: 1px solid #6f92bf;
  /* background-color: green; */
`;
const MyPage = () => {
  const [tabState, setTabState] = useState([
    {
      tabId: 1,
      title: "프로필 편집",
      isActive: true,
      status: "editProfile",
    },
    {
      tabId: 2,
      title: "비밀번호 변경",
      isActive: false,
      status: "editPassword",
    },
    {
      tabId: 3,
      title: "내가 쓴 글",
      isActive: false,
      status: "myArticle",
    },
    {
      tabId: 4,
      title: "나의 일정",
      isActive: false,
      status: "mySchedule",
    },
    {
      tabId: 5,
      title: "관심사 수정",
      isActive: false,
      status: "editInterest",
    },
  ]);
  const getStatus = (id) => ({
    editProfile: <EditProfile key={id} />,
    editPassword: <EditPassword key={id} />,
    myArticle: <MyArticle key={id} />,
    mySchedule: <MySchedule key={id} />,
    editInterest: <EditInterest key={id} />,
  });
  const onActiveChange = (tabId) => {
    setTabState((prevState) =>
      prevState.map((item) =>
        item.tabId === tabId
          ? { ...item, isActive: true }
          : { ...item, isActive: false }
      )
    );
  };

  return (
    <>
      <Header />
      <Wrapper color={"#eaf2ff"} alignItems="none">
        <EditWrapper>
          <TabWrapper>
            {tabState &&
              tabState.map((item) => (
                <TabItem {...item} key={item.tabId} onClick={onActiveChange} />
              ))}
          </TabWrapper>
          <EditorWrapper>
            {tabState &&
              tabState.map((item) =>
                item.isActive ? <>{getStatus(item.id)[item.status]}</> : <></>
              )}
          </EditorWrapper>
        </EditWrapper>
      </Wrapper>
    </>
  );
};

export default MyPage;
