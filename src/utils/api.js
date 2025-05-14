import axios from "axios";

const baseURL = "https://est.jpstvethiopia.com";
// const baseURL = "http://localhost:4000";
// const baseURL = "https://api.v1.ethioscitecheng.com";
const api = axios.create({
  baseURL: baseURL + "/api/v1",
  withCredentials: true,
});

export default api;
export const apiUrl = baseURL;
