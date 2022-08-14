import moment from "moment";

export const TimeGap = (createdDate) => {
  const now = moment(new Date());
  const then = moment(createdDate);

  const handleTimeGap = moment.duration(now.diff(then)).asHours()
  console.log(handleTimeGap)
  if (handleTimeGap < 1) {
    const timeGap = '1시간 전'
    return timeGap
  } else if ( handleTimeGap < 2) {
    const timeGap = '2시간 전'
    return timeGap
  } else if ( handleTimeGap < 3) {
    const timeGap = '3시간 전'
    return timeGap
  } else if ( handleTimeGap < 4) {
    const timeGap = '4시간 전'
    return timeGap
  } else if ( handleTimeGap < 5) {
    const timeGap = '5시간 전'
    return timeGap
  } else if ( handleTimeGap < 6) {
    const timeGap = '6시간 전'
    return timeGap
  } else if ( handleTimeGap < 7) {
    const timeGap = '7시간 전'
    return timeGap
  } else if ( handleTimeGap < 8) {
    const timeGap = '8시간 전'
    return timeGap
  } else if ( handleTimeGap < 9) {
    const timeGap = '9시간 전'
    return timeGap
  } else if ( handleTimeGap < 10) {
    const timeGap = '10시간 전'
    return timeGap
  } else if ( handleTimeGap < 11) {
    const timeGap = '11시간 전'
    return timeGap
  } else if ( handleTimeGap < 12) {
    const timeGap = '12시간 전'
    return timeGap
  } else if ( handleTimeGap < 13) {
    const timeGap = '13시간 전'
    return timeGap
  } else if ( handleTimeGap < 14) {
    const timeGap = '14시간 전'
    return timeGap
  } else if ( handleTimeGap < 15) {
    const timeGap = '15시간 전'
    return timeGap
  } else if ( handleTimeGap < 16) {
    const timeGap = '16시간 전'
    return timeGap
  } else if ( handleTimeGap < 17) {
    const timeGap = '17시간 전'
    return timeGap
  } else if ( handleTimeGap < 18) {
    const timeGap = '18시간 전'
    return timeGap
  } else if ( handleTimeGap < 19) {
    const timeGap = '19시간 전'
    return timeGap
  } else if ( handleTimeGap < 20) {
    const timeGap = '20시간 전'
    return timeGap
  } else if ( handleTimeGap < 21) {
    const timeGap = '21시간 전'
    return timeGap
  } else if ( handleTimeGap < 22) {
    const timeGap = '22시간 전'
    return timeGap
  } else if ( handleTimeGap < 23) {
    const timeGap = '23시간 전'
    return timeGap
  } else if ( handleTimeGap < 24) {
    const timeGap = '24시간 전'
    return timeGap
  } else if ( handleTimeGap < 48) {
    const timeGap = '1일 전'
    return timeGap
  } else if ( handleTimeGap < 72) {
    const timeGap = '2일 전'
    return timeGap
  } else if ( handleTimeGap < 96) {
    const timeGap = '3일 전'
    return timeGap
  } else if ( handleTimeGap > 96) {
    const timeGap = '3일 넘게 지났어요'
    return timeGap
  }
}