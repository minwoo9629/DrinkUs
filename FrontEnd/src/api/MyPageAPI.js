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

export const getUserInterest = async (userId) => {
  const result = await client.get("/interests/{user_no}");
  return result;
};

export const getMainCategory = async () => {
  const result = await client.get("/interests/category");
  return result;
};

export const getSubCategory = async () => {
  const result = await client.get("/interests/");
  return result;
};

export const getMySchedule = async (pageNum) => {
  const result = await client
    .get(`/calendar/my?page=${pageNum}`)
    .then((response) => response);
  return result;
};
