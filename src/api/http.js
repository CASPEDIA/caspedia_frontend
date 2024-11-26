import axios from "axios";

axios.defaults.withCredentials = true;
// axios 객체 생성
const http = axios.create({
  baseURL: 'http://localhost:8080/api',
  // baseURL: import.meta.env.APP_API_URL,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

// 요청 인터셉터
http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken');
    if( token && !config.url.includes('/login')) {
      config.headers.Authorization=`Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
http.interceptors.response.use(
  (response)=> {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      handleUnauthorized();
    }
  }
);

function handleUnauthorized() {
  localStorage.removeItem('jwtToken'); // JWT 토큰 삭제
  localStorage.removeItem('nanoid'); // 현재 로그인 유저 nanoid 삭제
  window.location.href = '/signin'; // 로그인 페이지로 이동
}

export default http;