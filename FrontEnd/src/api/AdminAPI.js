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

const permitUser = async(userId) => {
  const result = await client
    .patch(`/admin/permission/${userId}`)
    .then((response) => response)
    .catch((error) => error.response);
  return result;
}

const removeUser = async(userId) => {
  const result = await client
    .delete(`/admin/${userId}`)
    .then((response) => response)
    .catch((error) => error.response);
  return result;
}

const processReport = async(data) => {
  const result = await client
    .put(`/admin/report`, data)
    .then((response) => response)
    .catch((error) => error);
  return result;
}

export {
  getUserInfoList,
  getReportList,
  permitUser,
  removeUser,
  processReport,
};