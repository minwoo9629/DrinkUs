import { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { BaseFlexWrapper } from "../../components/styled/Wrapper";
import { getUserInfoList } from "../../api/AdminAPI";
import { getReportList } from "../../api/AdminAPI";
import UserList from "../../components/admin/UserList";

export const AdminWrapper = styled(BaseFlexWrapper)`
  flex-direction: column;
  background-color: ${({ color }) => color};
  width: 100vw;
  min-height: 100vh;
  align-items: ${({ alignItems }) => alignItems};
`;

const ContentWrapper = styled(BaseFlexWrapper)`
  background: ${(props) => props.background};
  height: ${(props) => props.height};
  width: 100vw;
`;

const FunctionBlock = styled.div`
  display: block;
  width: 90%;
  margin-bottom: 20px;
  color: black;
  background-color: #ffffff;
  border-radius: 30px;
  padding: 30px;
  align-items: center;
`

const FunctionTitle = styled.div`
  display: block;
  font-size : 50px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
`

const FunctionContent = styled.div`
  display: block;
  width: 100%;
  height: 500px;
  text-align: center;
  overflow-y: scroll;
`;

const Admin = () => {

  useEffect(() => {
    setData();
  }, []);

  const [userList, setUserList] = useState([]);
  const [reportList, setReportList] = useState([]);

  const setData = async () => {
    const uList = await getUserInfoList();
    const rList = await getReportList();
    setUserList([...uList.data]);
    setReportList([...rList.data]);
  };

  const onHandlePermitUser = async () => {

  }

  const onHandleRemoveUser = async () => {

  }

  const onHandleProcessReport = async () => {

  }

  return(
    <>
      <Header />
      <AdminWrapper color={'white'} width={'1200px'}>
        <FunctionBlock>
          <FunctionTitle>사용자 목록 조회</FunctionTitle>
          <FunctionContent>
            <UserList
              userList={userList}
              onHandlePermitUser={onHandlePermitUser}
              onHandleRemoveUser={onHandleRemoveUser}
            />
          </FunctionContent>
        </FunctionBlock>
        <FunctionBlock>
          <FunctionTitle>신고 내역 조회</FunctionTitle>
          <FunctionContent>
            신고 목록을 띄우는 공간입니다.
            신고 처리도 함께
          </FunctionContent>
        </FunctionBlock>

      </AdminWrapper>

      <Footer />
    </>
  );

}

export default Admin;