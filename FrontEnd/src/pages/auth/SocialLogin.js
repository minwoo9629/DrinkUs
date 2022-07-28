import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SuccessAlert } from "../../utils/sweetAlert";
import { getUserProfile } from "../../store/actions/user";

const SocialLogin = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const jwtToken = searchParams.get("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  sessionStorage.setItem("ACCESS_TOKEN", jwtToken);
  dispatch(getUserProfile());
  SuccessAlert("로그인되었습니다", navigate);
  return <></>;
};

export default SocialLogin;
