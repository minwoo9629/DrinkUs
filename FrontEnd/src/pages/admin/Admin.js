import { useState } from "react";
import styled from "styled-components";
import { client } from "../../utils/client";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { BaseFlexWrapper } from "../../components/styled/Wrapper";

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
  width: 80%;
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
  height: 300px;
  background-color: #ff33ff;
  text-align: center;
`;


const Admin = () => {
  return(
    <>
      <Header />
      <AdminWrapper color={'white'} width={'1200px'}>
        <FunctionBlock>
          <FunctionTitle>사용자 목록 조회</FunctionTitle>
          <FunctionContent>
              사용자 목록을 띄우는 공간입니다.
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