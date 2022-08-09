import { client } from "../utils/client";

// 유저 정보 fetch
export const getUserProfile = async (userId) => {
  const result = await client
    .get(`/users/profile/${userId}`)
    .then((response) => response);
  return result;
};