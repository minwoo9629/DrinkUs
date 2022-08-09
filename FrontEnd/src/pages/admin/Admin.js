import { useState } from "react";
import styled from "styled-components";
import { client } from "../../utils/client";
import { Wrapper } from "../../components/styled/Wrapper";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { BaseFlexWrapper, BaseFlexColWrapper } from "../../components/styled/Wrapper";

const ContentWrapper = styled(BaseFlexWrapper)`
  background: ${(props) => props.background};
  height: ${(props) => props.height};
  width: 100vw;
`;

const FunctionBlock = styled.div`
  width: 80%;
  margin-bottom: 20px;
  color: black;
  background-color: #ffffff;
  border-radius: 30px;
  padding: 30px;
  align-items: center;
`

const FunctionTitle = styled.div`
  font-size : 50px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
`

const FunctionContent = styled.div`
  display: block
  width: 100%;
  height: 300px;
  background-color: #ff33ff;
  text-align: center;
`;


const Admin = () => {
  return(
    <>
      <Header position={'fixed'} />
      <Wrapper color={'white'}>
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

      </Wrapper>

      <Footer />
    </>
  );

}

export default Admin;