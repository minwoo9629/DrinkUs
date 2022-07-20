import axios from "axios";

const BASE_URL = "http://localhost:8080/";

// export const client = axios.create({
//   BASE_URL,
//   timeout: 180000,
//   withCredentials: false,

//   responseType: "json",
//   httpsAgent: new https.Agent({ rejectUnauthorized: false }),

//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export const accessClient = axios.create({
//   baseURL: BASE_URL,
//   timeout: 180000,
//   withCredentials: false,
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
//   },
// });

const client = axios.create({
  // 요청을 보내는 baseURL을 http://localhost:8080/ 으로 설정
  baseURL: "http://localhost:8080/",
});

client.interceptors.request.use(function (config) {
  // reqeust를 보낼때 localStorage에 token 정보가 있다면 헤더에 토큰 정보를 저장하고 없다면 null로 처리
  const user = localStorage.getItem("user");
  if (!user) {
    config.headers["accessToken"] = null;
    config.headers["refreshToken"] = null;
    return config;
  }
  const { accessToken, refreshToken } = JSON.parse(user);
  config.headers["accessToken"] = accessToken;
  config.headers["refreshToken"] = refreshToken;
  return config;
});

client.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (error.response && error.response.status === 403) {
      try {
        const originalRequest = error.config;
        const data = await client.get("auth/refreshtoken");
        if (data) {
          const { accessToken, refreshToken } = data.data;
          localStorage.removeItem("user");
          localStorage.setItem(
            "user",
            JSON.stringify(data.data, ["accessToken", "refreshToken"])
          );
          originalRequest.headers["accessToken"] = accessToken;
          originalRequest.headers["refreshToken"] = refreshToken;
          return await client.request(originalRequest);
        }
      } catch (error) {
        localStorage.removeItem("user");
        console.log(error);
      }
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default client;
