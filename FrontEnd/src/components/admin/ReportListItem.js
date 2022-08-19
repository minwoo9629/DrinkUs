import { useState } from "react";
import styled from "styled-components";

const CustomButton = styled.div`
  width: ${({ width }) => width};
  height: 20px;
  line-height: 20px;
  background-color: ${({ bg }) => bg};
  border-radius: 5px;
  border: none;
  cursor: pointer;
  padding: 4px 12px;
  color: white;
  text-align: center;
`;

const InputForm = styled.input`
  background-color: white;
  width: ${({ width }) => width};
  height: 100%;
  line-height: 100%;
  border: 1px solid #BDCFF2;
  border-radius: 10px;
`

const ReportElement = styled.div`
  width: ${({ width }) => width};
  word-wrap: break-word;
`;

const ReportListItem = ({
  reportId,
  fromUserId,
  fromUserName,
  toUserId,
  toUserName,
  reportType,
  reportReason,
  reportCompleted,
  reportResult,
  onHandleProcessReport,
}) => {

  const [state, setState] = useState({
    reportId: reportId,
    reportResult: reportType + "로 인한 이용정지 처분",
    stopPeriod: 0,
  });

  const onHandleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        marginBottom: "32px",
        alignItems: "center",
        height: "20px",
      }}
    >
      <ReportElement width="3%">{reportId}</ReportElement>
      <ReportElement width="20%">{fromUserName}</ReportElement>
      <ReportElement width="20%">{toUserName}</ReportElement>
      <ReportElement width="12%">{reportType}</ReportElement>
      <ReportElement width="22%">{reportReason}</ReportElement>
      {
        reportCompleted === 'Y' ? (
          <ReportElement style={{ width: "8%", color: "blue"}}>O</ReportElement>
        ) : (
          <ReportElement style={{ width: "8%", color: "red"}}>X</ReportElement>
        )
      }
      
      {
        reportCompleted === 'N' ? (
          <InputForm
            width="10%"
            type="number"
            min="0"
            value={state.stopPeriod}
            name="stopPeriod"
            placeholder="정지일"
            onChange={onHandleInput}
            required
          />
        ) : (
          <ReportElement width="10%">{reportResult}</ReportElement>
        )
      }
      <ReportElement width="2%"></ReportElement>
      {
        reportCompleted === 'N' ? (
          <CustomButton
            bg="red"
            width="3%" 
            onClick={() => onHandleProcessReport(state)}
          >
            처리
          </CustomButton>
        ) : (
          <CustomButton
            bg="darkgrey"
            width="3%" >
              -
          </CustomButton>
        )
      }
    </div>
  );
};

export default ReportListItem;
