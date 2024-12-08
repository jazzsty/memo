import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "http://58.225.62.172:8000/api" // 실제 API 서버 주소
      : "/api", // 개발 환경용 프록시
});

export default axiosInstance;