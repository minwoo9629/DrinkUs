import { client } from "../utils/client";

const login = async (data) => {
  const result = await client
    .post(`/users/login`, data)
    .then((response) => response)
    .catch((error) => error.response);
  return result;
};

const findId = async (data) => {
  const result = await client
    .post(`/users/id`, data)
    .then((response) => response)
    .catch((error) => error.response);
  return result;
};

const findPassword = async (data) => {
  const result = await client
    .post(`/users/pw`, data)
    .then((response) => response)
    .catch((error) => error.response);
  return result;
};

const getProfile = async () => {
  const result = await client.get("/users").then((response) => response);
  return result;
};

const changePassword = async (data) =>{
    const result = await client.patch("/users/pw", data).then((response)=> response);
    return result
}

export { login, findId, findPassword, getProfile, changePassword };
