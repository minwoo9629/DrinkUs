import React from "react";
import ReportListItem from "./ReportListItem";

const ReportList = React.memo(({ reportList, onHandleProcessReport }) => {
  
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "20px 20px",
        minHeight: "560px",
        margin: "0px 80px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginBottom: "32px",
          alignItems: "center",
          height: "20px",
        }}
      >
        <div style={{ width: "5%" }}>번호</div>
        <div style={{ width: "5%" }}>신고자</div>
        <div style={{ width: "5%" }}>대상</div>
        <div style={{ width: "20%" }}>유형</div>
        <div style={{ width: "25%" }}>신고 사유</div>
        <div style={{ width: "10%" }}>처리여부</div>
        <div style={{ width: "20%" }}>처리결과 (정지일)</div>
        <div style={{ width: "5%" }}></div>
      </div>
    {reportList.length !== 0 ? (
      <>
        {reportList.map((content) => (
          <ReportListItem
            {...content}
            key={content.reportId}
            onHandleProcessReport={onHandleProcessReport}
          />
        ))}
      </>
    ) : (
      <>
        <p>신고 내역이 없습니다.</p>
      </>
    )}
  </div>
  );
});

export default ReportList;