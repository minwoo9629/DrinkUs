import { client } from "../utils/client";

export const getMyArticle = async (pageNum) => {
  const result = await client
    .get(`/daily/my?page=${pageNum}`)
    .then((response) => response);
  return result;
};

export const removeMyArticle = async (articleId) => {
  await client.delete(`/daily/${articleId}`);
};

export const editProfile = async (data) => {
  const result = await client.put("/users", data);
  return result;
};

export const getUserInterests = async () => {
  const result = await client.get("/categories").then((response) => response);
  return result;
};

export const addUserInterest = async (subCategoryId) => {
  const result = await client
    .post(`/categories/${subCategoryId}`)
    .then((response) => response)
    .catch((error) => error.response);
  return result;
};

export const removeUserInterest = async (subCategoryId) => {
  const result = await client
    .delete(`/categories/${subCategoryId}`)
    .then((response) => response);
  return result;
};

export const getMySchedule = async (pageNum) => {
  const result = await client
    .get(`/calendar/my?page=${pageNum}`)
    .then((response) => response);
  return result;
};
