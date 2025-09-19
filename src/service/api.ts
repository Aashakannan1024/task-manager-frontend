import axios from "axios";
import type { AxiosResponse } from "axios";

 
const api = axios.create({
  baseURL: "http://localhost:5000/api/",
});
 
api.interceptors.request.use(
  (config) => {

    config.headers["Content-Type"] = "application/json";

    return config;
  },
  (error: unknown) => {
    return Promise.reject(error);
  }
);
 
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
 
export default api;

//intersector - it is used to modify request or response before they are handled by then or catch
//axios - it is a promise based HTTP client for the browser and node.js