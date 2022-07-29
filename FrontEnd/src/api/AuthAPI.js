import { client } from "../utils/client" 

const login = async (data) => {
    client.post(`/users/login`, data).then((response) => response).catch((error) => error.response);
}

const findId = async (data) => {
    client
      .post(`/users/id`, data)
      .then((response) => response)
      .catch((error) => error.response);
}

const findPassword = async (data) => {
    client.post(`/users/pw`, data).then((response) => response).catch((error) => error.response);
}

const getProfile = async () => {
    client.get("/users").then((response) => response);
}


export {login, findId, findPassword, getProfile}