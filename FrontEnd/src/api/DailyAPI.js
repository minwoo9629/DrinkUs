import { client } from "../utils/client";

// 전체 게시글 조회
export const getDailyArticle = async (page) => {
  const result = await client
    .get(`/daily?page=${page}`)
    .then((response) => response);
  return result;
};

// 게시글 작성
export const postDailyArticle = async (data) => {
  const result = await client
    .post(`/daily`, data)
    .then((response) => response)
    .catch((error) => error.response);
  return result;
};

// 게시글 수정
export const editDailyArticle = async (boardId) => {
  await client.put(`/daily/${boardId}`);
};

// 게시글 삭제
export const deleteDailyArticle = async (boardId) => {
  await client.delete(`/daily/${boardId}`);
} 

// 댓글 조회(부모 글에 해당하는)
export const getDailyComment = async (parentId) => {
  const result = await client
    .get(`/daily/comment/${parentId}`)
    .then((response) => response)
  return result;
};

// 댓글 작성(부모 글에 해당하는)
export const postDailyComment = async (parentId) => {
  const result = await client
    .post(`/daily/comment/${parentId}`)
    .then((response) => response)
    .catch((error) => error.response);
  return result;
}

// 댓글 수정
export const editDailyComment = async (boardId) => {
  const result = await client.put(`/daily/${boardId}`)
  return result;
}

// 댓글 삭제
export const deleteDailyComment = async (boardId) => {
  const result = await client.delete(`/daily/${boardId}`)
  return result;
}