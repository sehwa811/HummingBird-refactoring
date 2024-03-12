import axios from "axios";

const instance = axios.create({
  baseURL: "http://api.hummingbird.kr:8080/",
  withCredentials: true,
});

export function apiWithAuth() {
  const axiosInstance = axios.create({
    baseURL: "http://api.hummingbird.kr:8080/",
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  axiosInstance.interceptors.response.use(
    response => response, // 정상 응답에 대한 처리
    async error => {
      const originalRequest = error.config;

      // 토큰 만료 에러 확인
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const response = await instance.post("/refresh", {}, { withCredentials: true });

          if (response.status === 200) {
            const newAccessToken = response.data.accessToken;
            localStorage.setItem("accessToken", newAccessToken);

            axios.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
            return axios(originalRequest);
          }
        } catch (refreshError : any) {
          // 리프레시 토큰도 만료된 경우
          if (refreshError.response && refreshError.response.status === 401) {
            // 여기서 로그아웃 처리
            localStorage.removeItem("accessToken");
            // 로그인 페이지나 홈으로 리다이렉트
            // 예: window.location.href = '/login';
          }
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    },
  );

  return axiosInstance;
}

export default instance;
