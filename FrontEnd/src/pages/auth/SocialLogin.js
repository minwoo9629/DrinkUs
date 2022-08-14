import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SuccessAlert } from "../../utils/sweetAlert";
import { getUserProfile } from "../../store/actions/user";

const SocialLogin = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const accessToken = searchParams.get("accesstoken");
  const refreshToken = searchParams.get("refreshtoken");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  sessionStorage.setItem("ACCESS_TOKEN", accessToken);
  sessionStorage.setItem("REFRESH_TOKEN", refreshToken);
  dispatch(getUserProfile());
  SuccessAlert("로그인되었습니다", navigate);
  return <></>;
};

export default SocialLogin;
