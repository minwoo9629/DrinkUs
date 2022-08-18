import { client } from "../utils/client";

// 이메일 인증번호 전송
export const sendConfirmEmail = async (data) => {
  const result = await client
    .post(`/users/sendConfirmEmail`, data)
    .then((response) => response)
    .catch((error) => error.response);
  return result;
}

// 인증번호 확인
export const confirmEmail = async (data) => {
  const result = await client
    .patch(`/users/confirmToken`, data)
    .then((response) => response)
    .catch((error) => error.response);
  return result;
}

// 이메일 중복확인
export const doubleCheckEmail = async (data) => {
  const result = await client
    .post("/users/join/id", data)
    .then((response) => response)
    .catch((error) => error.response);
  return result;
}