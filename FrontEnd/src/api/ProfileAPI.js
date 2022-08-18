import { param } from "jquery";
import { client } from "../utils/client";

// 유저 정보 fetch
export const getUserProfile = async (userNo) => {
  const result = await client
    .get(`/users/profile/${userNo}`)
    .then((response) => response);
  return result;
};

// 닉네임을 이용한 유저 프로필 정보 얻기
export const getTargetUserId = async (data) => {
  const result = await client
    .get("/users/id", { params: data })
    .then((response) => response);
  return result;
};

// 인기도 수정
export const plusPopularity = async (userNo) => {
  const data = {
    popularNum: +1,
  };
  const result = await client
    .patch(`/users/popularity/${userNo}`, { data })
    .then((response) => response)
    .catch((error) => error.response);
  return result;
};

export const minusPopularity = async (userNo) => {
  const data = {
    popularNum: -1,
  };
  const result = await client
    .patch(`/users/popularity/${userNo}`, data)
    .then((response) => response)
    .catch((error) => error.response);
  return result;
};

// 관심사 조회
export const getUserCategory = async (userNo) => {
  const result = await client
    .get(`/categories/subcategory/${userNo}`)
    .then((response) => response);
  return result;
};

// 유저 신고
export const reportsSubmit = async (data) => {
  const result = await client
    .post(`/report`, data)
    .then((response) => response)
    .catch((error) => error.response);
  return result;
};
