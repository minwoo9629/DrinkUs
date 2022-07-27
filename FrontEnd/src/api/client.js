import axios from "axios";
const BASE_URL = "http://localhost:8080/";
axios.defaults.baseURL = BASE_URL;

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

export default client;
