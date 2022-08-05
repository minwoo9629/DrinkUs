import React from "react";
import ScheduleListItem from "./ScheduleListItem";

const ScheduleList = React.memo(({ scheduleList }) => {
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
      {scheduleList.length !== 0 ? (
        <>
          {scheduleList.map((content) => (
            <ScheduleListItem {...content} key={content.calendarId} />
          ))}
        </>
      ) : (
        <>
          <p>현재 작성된 글이 없습니다.</p>
        </>
      )}
    </div>
  );
});

export default ScheduleList;
