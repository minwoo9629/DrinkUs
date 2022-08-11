import React from "react";
import ReportListItem from "./ReportListItem";

const ReportList = React.memo(({ onHandleProcessReport }) => {
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