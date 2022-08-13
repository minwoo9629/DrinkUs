import moment from "moment";
export const CalcUserCreated = (userCreated) => {
  const [userCreatedYear, userCreatedMonth, userCreatedDay] = moment(
    userCreated
  )
    .format("YYYY-MM-DD")
    .split("-");
  return [userCreatedYear, userCreatedMonth, userCreatedDay];
};
