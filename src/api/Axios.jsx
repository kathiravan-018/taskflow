import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

API.interceptors.response.use(

  (response) => response,

  async (error) => {

    const originalRequest = error.config;

    if (error.response?.status === 401) {

      const refresh = localStorage.getItem("refresh");

      if (!refresh) {
        return Promise.reject(error);
      }

      try {

        const response = await axios.post(
          "http://127.0.0.1:8000/api/token/refresh/",
          {
            refresh,
          }
        );

        const newAccess = response.data.access;

        localStorage.setItem("access", newAccess);

        originalRequest.headers.Authorization =
          `Bearer ${newAccess}`;

        return API(originalRequest);

      } catch (err) {

        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        window.location.href = "/login";

        return Promise.reject(err);

      }

    }

    return Promise.reject(error);

  }

);
export default API;