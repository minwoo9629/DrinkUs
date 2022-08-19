import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { loginAlert } from "../utils/sweetAlert";

function PrivateRoute({ component: Component }) {
  const authenticated = useSelector((props) => props.user.isLogin);
  return authenticated ? (
    Component
  ) : (
    <Navigate to="/login" {...loginAlert("접근할 수 없는 페이지입니다.")} />
  );
}

export default PrivateRoute;
