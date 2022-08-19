import { useState } from "react";
import styled from "styled-components";
import { client } from "../../utils/client";
import { FailAlert, SuccessAlert } from "../../utils/sweetAlert";
import { reportsSubmit } from "../../api/ProfileAPI";

// 배경
const Wrapper = styled.div`
  background-color: #eaf2ff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0px;
`;

// 화면 가운데 창
const ReportsWrapper = styled.div`
  background-color: transparent;
  display: flex;
  flex-direction: column;
`;

// 셀렉트 박스
const ReportsSelect = styled.select`
  width: 450px;
  height: 40px;
  border-radius: 8px;
  border: 4px white;
  background-color: white;
  margin: 14px;
  font-size: 20px;
  color: #676775;
`;

// 신고 사유 입력 칸
const ReportsInput = styled.textarea`
  position: relative;
  height: 330px;
  width: 410px;
  top: 7px;
  font-size: 18px;
  background-color: white;
  border: 12px;
  margin: 14px;
  color: black;
  padding: 20px;
  resize: none;
`;

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
`;

const Reports = ({ modalClose }) => {
  const [state, setState] = useState({
    toUserId: "",
    reportType: "",
    reportReason: "",
    reportReasonCheck: false,
  });

  // 유저 정보 요청

  // 신고 대분류
  const onReportTypeSelect = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  // 신고 입력
  const onReportReasonInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  // 신고 제출
  const onReportsSubmit = async (e) => {
    e.preventDefault();
    const data = {
      toUserId: state.toUserId,
      reportType: state.reportType,
      reportReason: state.reportReason,
    };
    const response = await reportsSubmit(data);
    if (response.status === 200) {
      SuccessAlert("신고가 접수됐습니다");
      modalClose();
    }
    if (state.reportReason.length === 0) {
      FailAlert("신고 사유를 기입해 주세요");
      modalClose();
    } else {
      FailAlert("아직 처리되지 않은 동일한 유저를 재신고 할 수 없습니다.");
      modalClose();
    }
  };

  return (
    <>
      <Wrapper>
        <ReportsWrapper>
          {state.toUserId}유저를 신고합니다.
          <ReportsSelect
            value={state.reportType}
            name="reportType"
            onChange={onReportTypeSelect}
            defaultValue={"폭언 및 욕설"}
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
            onChange={onReportReasonInput}
          />
          <ReportsButton onClick={onReportsSubmit}>유저신고</ReportsButton>
        </ReportsWrapper>
      </Wrapper>
    </>
  );
};

export default Reports;
