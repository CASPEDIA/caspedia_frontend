// InterceptorInitializer.js

import { useRequestInterceptor, useResponseInterceptor } from "api/http";

const InterceptorInitializer = () => {
  useRequestInterceptor(); // 요청 인터셉터 설정
  useResponseInterceptor(); // 응답 인터셉터 설정

  return null; // UI를 렌더링하지 않음
};

export default InterceptorInitializer;
