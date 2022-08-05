import moment from "moment";
const ScheduleListItme = ({ calendarId, calendarContent, time }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        marginBottom: "32px",
        alignItems: "center",
      }}
    >
      <div style={{ width: "15%" }}>{calendarId}</div>
      <div style={{ width: "55%" }}>{calendarContent}</div>
      <div style={{ width: "30%", fontSize: "14px" }}>
        {moment(time).format("YYYY-MM-DD HH:MM")}
      </div>
    </div>
  );
};

export default ScheduleListItme;
