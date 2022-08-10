import { useState } from "react";
// import Header from "../../components/layout/Header";
import styled from "styled-components";
import { client } from "../../utils/client";
import { SuccessAlert } from "../../utils/sweetAlert";

// 배경
const Wrapper = styled.div`
  background-color: #eaf2ff;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 화면 가운데 창
const ReportsWrapper = styled.div`
  background-color: transparent;
  display: flex;
  flex-direction: column;
`;

// 셀렉트 박스
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

// 신고 사유 입력 칸
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

// 신고하기 버튼
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

const Reports = () => {
  const [state, setState] = useState({
    reportType: "",
    reportReason: "",
  })
  
  // 신고 입력
  const onHandleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  // 신고 제출
  const onReportsSubmit = (e) => {
    e.preventDefault();
    client
        .post("/reports", {
        })
        .then(function (response) {
          console.log(response);
          if (response.status === 200){
            SuccessAlert(`${"신고가 접수 됐습니다"}`);
            return;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
  };

  return(
    <>
      {/* <Header/> */}
      <Wrapper>
        <ReportsWrapper>
            (프로필 선택한 유저 닉네임)유저를 신고합니다.
            <ReportsSelect
              value={state.reportType}
              name="reportType"
            >
              <option>폭언 및 욕설</option>
              <option>개인정보노출</option>
              <option>음란성</option>
              <option>명예훼손</option>
              <option>기타</option>
            </ReportsSelect>
            <ReportsInput
              placeholder="신고 사유를 입력해 주세요."
              value={state.reportReason}
              name="reportReason"
              onChange={onHandleInput}
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