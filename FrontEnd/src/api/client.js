import axios from "axios";
const BASE_URL = "http://localhost:8080/";
axios.defaults.baseURL = BASE_URL;

export const client = axios.create({
  timeout: 180000,
  withCredentials: false,

  responseType: "json",

  headers: {
    "Content-Type": "application/json",
  },
});
export default client;
