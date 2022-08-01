import axios from "axios";
const BASE_URL = "http://localhost:8080/";
axios.defaults.baseURL = BASE_URL;

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

// const client = axios.create({
//   // 요청을 보내는 baseURL을 http://localhost:8080/ 으로 설정
//   baseURL: BASE_URL,
// });

// client.interceptors.request.use(function (config) {
//   // reqeust를 보낼때 localStorage에 token 정보가 있다면 헤더에 토큰 정보를 저장하고 없다면 null로 처리
//   const user = localStorage.getItem("user");
//   if (!user) {
//     config.headers["accessToken"] = null;
//     config.headers["refreshToken"] = null;
//     return config;
//   }
//   const { accessToken, refreshToken } = JSON.parse(user);
//   config.headers["accessToken"] = accessToken;
//   config.headers["refreshToken"] = refreshToken;
//   return config;
// });

// client.interceptors.response.use(
//   function (response) {
//     return response;
//   },
//   async function (error) {
//     if (error.response && error.response.status === 403) {
//       try {
//         const originalRequest = error.config;
//         const data = await client.get("auth/refreshtoken");
//         if (data) {
//           const { accessToken, refreshToken } = data.data;
//           localStorage.removeItem("user");
//           localStorage.setItem(
//             "user",
//             JSON.stringify(data.data, ["accessToken", "refreshToken"])
//           );
//           originalRequest.headers["accessToken"] = accessToken;
//           originalRequest.headers["refreshToken"] = refreshToken;
//           return await client.request(originalRequest);
//         }
//       } catch (error) {
//         localStorage.removeItem("user");
//         console.log(error);
//       }
//       return Promise.reject(error);
//     }
//     return Promise.reject(error);
//   }
// );
// axios.interceptors.response.use(
//   function (response) {
//     console.log("인터셉터");
//     localStorage.setItem("jwtToken", response.headers.AUTHORIZATION);
//     return response;
//   },
//   function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     return Promise.reject(error);
//   }
// );

export const client = axios.create({
  withCredentials: false,
  responseType: "json",

  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use(function (config) {
  const accessToken = sessionStorage.getItem("ACCESS_TOKEN");
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});
