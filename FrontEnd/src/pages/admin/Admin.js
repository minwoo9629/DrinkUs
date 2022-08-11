import { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { BaseFlexWrapper } from "../../components/styled/Wrapper";
import { getUserInfoList, processReport } from "../../api/AdminAPI";
import { getReportList } from "../../api/AdminAPI";
import { permitUser } from "../../api/AdminAPI";
import { removeUser } from "../../api/AdminAPI";
import UserList from "../../components/admin/UserList";
import ReportList from "../../components/admin/ReportList";

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

  const onHandlePermitUser = async (userId) => {
    const response = await permitUser(userId);
    if(response.status === 200){
      alert("관리자 권한 부여되었습니다.");
      window.location.replace("/admin");
    } else {
      alert("관리자 권한 부여에 실패했습니다.");
    }
  }

  const onHandleRemoveUser = async (userId) => {
    const response = await removeUser(userId);
    if(response.status === 200){
      alert("삭제에 성공했습니다.");
      window.location.replace("/admin");
    } else {
      alert("삭제에 실패했습니다.");
    }
  }

  const onHandleProcessReport = async (state) => {
    const response = await processReport(state);
    if(response.status === 200){
      alert("성공적으로 처리되었습니다.");
      window.location.replace("/admin");
    } else {
      alert("처리에 실패했습니다.");
    }
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
            <ReportList
              reportList={reportList}
              onHandleProcessReport={onHandleProcessReport}
            />
          </FunctionContent>
        </FunctionBlock>

      </AdminWrapper>

      <Footer />
    </>
  );

}

export default Admin;