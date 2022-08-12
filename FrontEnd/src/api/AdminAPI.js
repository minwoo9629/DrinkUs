import { client } from "../utils/client";

const getUserInfoList = async () => {
  const result = await client
    .get(`/admin/user/list`)
    .then((response) => response)
    .catch((error) => error.response);
  return result;
}

const getReportList = async () => {
  const result = await client
  .get(`/admin/report`)
  .then((response) => response)
  .catch((error) => error.response);
  return result;
}


export {
  getUserInfoList,
  getReportList
};