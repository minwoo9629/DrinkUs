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
  line-height: 30px;
  border: 1px solid #BDCFF2;
  border-radius: 10px;
`

const ReportListItem = ({
  reportId,
  fromUserId,
  toUserId,
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
      <div style={{ width: "5%" }}>{reportId}</div>
      <div style={{ width: "5%" }}>{fromUserId}</div>
      <div style={{ width: "5%" }}>{toUserId}</div>
      <div style={{ width: "20%" }}>{reportType}</div>
      <div style={{ width: "25%" }}>{reportReason}</div>
      <div style={{ width: "10%" }}>{reportCompleted}</div>
      {
        reportResult === null ? (
          <InputForm
            width="20%"
            type="number"
            value={state.stopPeriod}
            name="stopPeriod"
            placeholder="정지일"
            onChange={onHandleInput}
            required
          />
        ) : (
          <div style={{ width: "20%" }}>{reportResult}</div>
        )
      }
      {
        reportResult === null ? (
          <CustomButton
            bg="red"
            width="5%" 
            onClick={() => onHandleProcessReport(state)}
          >
            처리
          </CustomButton>
        ) : (
          <CustomButton
            bg="darkgrey"
            width="5%" >
            -
          </CustomButton>
        )
      }
    </div>
  );
};

export default ReportListItem;
