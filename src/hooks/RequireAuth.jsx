import React from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const [cookies] = useCookies(["jwtToken"]);

  // 로그인 여부 확인
  const isAuthenticated = cookies.jwtToken;

  // 로그인 상태가 아니면 /signin으로 리다이렉트
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  // 로그인 상태라면 자식 컴포넌트를 렌더링
  return children;
};

export default RequireAuth;
