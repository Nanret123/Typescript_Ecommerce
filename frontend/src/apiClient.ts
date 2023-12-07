import axios from "axios";

//https://typescript-ecommerce-server-zeta.vercel.app
const apiClient = axios.create({
  baseURL:"https://typescript-ecommerce-server-zeta.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    if (localStorage.getItem("userInfo"))
      config.headers.authorization = `Bearer ${
        JSON.parse(localStorage.getItem("userInfo")!).token
      }`;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default apiClient;
