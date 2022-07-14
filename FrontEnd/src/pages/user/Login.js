import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const fetchLogin = async () => {
    // const result = await axois.post("asdfads");
    const name = "김싸피";
    const nickName = "싸피";
    dispatch({
      type: "LOG_IN",
      profile: {
        name,
        nickName,
      },
    });
    //   라우터로 마지막에 메인페이지로 이동하는 코드작성
  };
  return (
    <div>
      <h1>Login</h1>
      <button type="button" onClick={fetchLogin}>
        로그인하기
      </button>
    </div>
  );
};
