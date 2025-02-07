import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL!,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = Cookies.get("access_token") || null;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const originalConfig = error.config;
    // Nếu phản hồi trả về mã lỗi 401, có thể tức là token hết hạn hoặc không hợp lệ
    if (
      error.response &&
      error.response.status === 401 &&
      !originalConfig._retry
    ) {
      // Lấy token mới từ server
      originalConfig._retry = true;
      const refreshToken = Cookies.get("refresh_token") || null;
      if (!refreshToken) return null;
      const newToken = await getNewAccessToken(refreshToken);
      // Nếu lấy được token mới, thay thế token cũ và thực hiện lại yêu cầu ban đầu
      if (newToken) {
        const originalRequest = error.config;
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);
const getNewAccessToken = async (refreshToken: string) => {
  try {
    const response = await axiosInstance.post("/auth/refresh", {
      refreshToken,
    });
    const newToken = response.data.data;
    Cookies.set("access_token", newToken.access_token);
    Cookies.set("refresh_token", newToken.refresh_token);
    return newToken.access_token;
  } catch (error) {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
  }
};

export default axiosInstance;
