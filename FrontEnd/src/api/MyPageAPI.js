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
