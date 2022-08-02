import { useState } from "react";
import Header from "../../components/layout/Header";
import styled from "styled-components";
import axios from "axios";


const Wrapper = styled.div`
  background-color: #eaf2ff;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ReportsWrapper = styled.div`
  background-color: transparent;
  display: flex;
  flex-direction: column;
`;

const ReportsSelect = styled.select`
  width: 400px;
  height: 40px;
  border-radius: 8px;
  border: 4px white;
  background-color: white;
  margin: 14px;
  font-size: 20px;
  color: #676775;
`;

const ReportsInput = styled.input`
  position: relative;
  height: 400px;
  width: 400px;
  top: 7px;
  font-size: 18px;
  background-color: white;
  border: 12px;
  margin: 14px;
  color: black;
`

const ReportsButton = styled.button`
  width: 100px;
  height: 40px;
  border-radius: 8px;
  border: 4px white;
  background-color: #bdcff2;
  margin: 14px;
  font-size: 20px;
  color: #676775;
`

// // 신고 사유 드롭 박스
// const ReportsReason = [
//   { id: null, value: '신고 사유 선택' },
//   { id: '0001', value: '폭언 및 욕설' },
//   { id: '0002', value: '개인정보노출' },
//   { id: '0003', value: '음란성' },
//   { id: '0004', value: '명예훼손' },
//   { id: '0005', value: '기타' },
// ];

const Reports = () => {
  // const [reason, setReason] = useState('신고 사유 선택');
  
  // const onHandleSelect = (e) => {
  //   const { value } = e.target;
  //   setReason(ReportsReason.filter(el => el.value === value)[0].id);
  // };
  
  const onReportsSubmit = (e) => {
    e.preventDefault();
    // 신고 사유 비어 있으면 alert 창 뜨게 할까?
    axios
        .post("http://i7b306.p.ssafy.io/reports", {
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
  };

  return(
    <>
      <Header></Header>
      <Wrapper>
        <ReportsWrapper>
            (프로필 선택한 유저 닉네임)유저를 신고합니다.
            {/* <ReportsSelect onChange={onHandleSelect}>
              {ReportsReason.map(el => {
                return <option key={el.id}>{el.value}</option>;
              })};
            </ReportsSelect> */}
            <ReportsSelect>
              <option>폭언 및 욕설</option>
              <option>개인정보노출</option>
              <option>음란성</option>
              <option>명예훼손</option>
              <option>기타</option>
            </ReportsSelect>
            <ReportsInput
              placeholder="신고 사유를 입력해 주세요."
            />
          <ReportsButton onClick={onReportsSubmit}>
            유저신고
          </ReportsButton>
        </ReportsWrapper>
      </Wrapper>
    </>
    )
};

export default Reports;
