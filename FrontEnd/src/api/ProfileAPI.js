import { client } from "../utils/client";

// // 유저 정보 fetch
// export const getUserProfile = async (userId) => {
//   const result = await client
//     .get(`/users/profile/${userId}`)
//     .then((response) => response);
//   return result;
// };

// 유저 정보 fetch
export const getUserProfile = async () => {
  const result = await client
    .get(`/users/profile/4`)
    .then((response) => response);
  return result;
};

// // 인기도 수정
// export const patchUserPopularity = async (data) => {
//   const result = await client
//     .patch(`/users/popularity/6`, data)
//     .then((response) => response);
//   return result;
// };

export const plusPopularity = async (data) => {
  const result = await client
    .patch(`/users/popularity/6`, data)
    .then((response) => response)
    .catch((error) => error.response);
  return result;
}

export const minusPopularity = async (data) => {
  const result = await client
    .patch(`/users/popularity/6`, data)
    .then((response) => response)
    .catch((error) => error.response);
  return result;
}

// 관심사 조회
export const getUserCategory = async () => {
  const result = await client
    .get(`/categories/subcategory/4`)
    .then((response) => response);
  return result;
}

// 유저 신고
export const reportsSubmit = async (data) => {
  const result = await client
    .post(`/report`, data)
    .then((response) => response)
    .catch((error) => error.response);
  return result;
}