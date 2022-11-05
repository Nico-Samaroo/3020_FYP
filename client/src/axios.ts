import axios, { Axios } from "axios";

axios.defaults.baseURL = "http://localhost:3000/api";

export const auth = (token: string) => {
  return new Axios({
    headers: { authorization: `Bearer ${token}` },
    baseURL: "http://localhost:3000/api",
  });
};

export default axios;
