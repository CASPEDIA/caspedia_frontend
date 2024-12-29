import { useEffect } from "react";

const { useNavigate, useLocation } = require("react-router-dom");
const { useRecoilValue } = require("recoil")
const { userState } = require("recoil/userstate/atom")

const RequireAdmin = ({ children }) => {
  const user = useRecoilValue(userState);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user.authority !== "ROLE_ADMIN"){
      navigate("/");
    }
  }, [location.pathname, navigate, user.authority]);
  return children;
}

export default RequireAdmin;