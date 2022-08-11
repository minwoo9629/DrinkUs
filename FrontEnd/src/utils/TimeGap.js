import moment from "moment";

export const TimeGap = (createdDate) => {
  const now = moment(new Date().toLocaleDateString());
  const then = moment(createdDate)

  const timeGap = moment(moment.duration(now.diff(then))).format('hh')
  return timeGap
}