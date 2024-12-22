import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "recoil/userstate/atom";

const RequireAuth = ({ children }) => {
  const user = useRecoilValue(userState);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user.hasLogin){
      navigate("/signin");
    }
  }, [location.pathname, navigate, user.hasLogin]);

  // 로그인 상태라면 자식 컴포넌트를 렌더링
  return children;
};

export default RequireAuth;
