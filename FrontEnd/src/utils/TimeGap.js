import moment from "moment";

export const TimeGap = (createdDate) => {
  const now = moment(new Date());
  const then = moment(createdDate);

  const handleTimeGap = moment.duration(now.diff(then)).asHours()
  if (handleTimeGap < 1) {
    const timeGap = 1
    return timeGap
  } else if ( handleTimeGap < 2) {
    const timeGap = 2
    return timeGap
  } else if ( handleTimeGap < 3) {
    const timeGap = 3
    return timeGap
  } else if ( handleTimeGap < 4) {
    const timeGap = 4
    return timeGap
  } else if ( handleTimeGap < 5) {
    const timeGap = 5
    return timeGap
  } else if ( handleTimeGap < 6) {
    const timeGap = 6
    return timeGap
  } else if ( handleTimeGap >= 6) {
    const timeGap = 12
    return timeGap
  }
}