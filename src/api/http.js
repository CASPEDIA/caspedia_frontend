import axios from "axios";
import { useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { UNLOGINED_USER, userState } from "recoil/userstate/atom";

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
export const useRequestInterceptor = () => {
  const user = useRecoilValue(userState);
  
  useEffect(() => {
    const interceptor = http.interceptors.request.use(
      (config) => {
        const token = user.jwtToken; 
        if( token && !config.url.includes('/login')) {
          config.headers.Authorization=`Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    return () => http.interceptors.request.eject(interceptor); // 정리(cleanup)
  }, [user])
}

// 응답 인터셉터
export const useResponseInterceptor = () => {
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    const interceptor = http.interceptors.response.use(
      (response)=> {
        return response;
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          handleUnauthorized(user, setUser);
        }
        return Promise.reject(error);
      }
    );
    return () => http.interceptors.response.eject(interceptor); // 정리(cleanup)
  }, [user, setUser]);
  

}

function handleUnauthorized(user, setUser) {
  setUser(UNLOGINED_USER);
  window.location.href = '/signin'; // 로그인 페이지로 이동
}

export default http;