import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { changePassword } from "../../../api/AuthAPI";
import ProfileTitle from "../../../components/auth/ProfileTitle";
import { BaseFlexColWrapper } from "../../../components/styled/Wrapper";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../../store/actions/user";
import { FailAlert, SuccessAlert } from "../../../utils/sweetAlert";

const EditPasswordWrapper = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  margin-top: 25px;
`;
const EditPasswordInputWrapper = styled.div`
  padding: 30px 0px;
  display: flex;
  flex-direction: row;
  align-items: ${({ alginItem }) => alginItem};
`;
EditPasswordInputWrapper.defaultProps = {
  alginItem: "center",
};
const EditPasswordInput = styled.input`
  border: 0.5px solid #bab8b8;
  border-radius: 8px;
  height: 36px;
  padding: 0px 20px;
  width: 240px;
  margin: 0;
`;

const EditPasswordButton = styled.button`
  background-color: #6f92bf;
  padding: 8px 12px;
  margin: 24px 0px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
`;
const EditPassword = () => {
  const [state, setState] = useState({
    previousPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [profileImageState, setProfileImageState] = useState("1");
  const [userNameState, setUserNameState] = useState("");
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const previousPasswordInput = useRef();
  const newPasswordInput = useRef();
  const confirmNewPasswordInput = useRef();

  useEffect(() => {
    setProfileImageState(!user.data.userImg ? "1" : user.data.userImg);
    setUserNameState(user.data.userName);
  }, []);
  const onHandleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onHandleSubmit = async () => {
    if (state.newPassword !== state.confirmNewPassword) {
      FailAlert("새로운 비밀번호가 일치하지 않습니다.");
      return;
    }
    if (state.previousPassword.length === 0) {
      previousPasswordInput.current.focus();
      return;
    }
    if (state.newPassword.length === 0) {
      newPasswordInput.current.focus();
      return;
    }
    if (state.confirmNewPassword.length === 0) {
      confirmNewPasswordInput.current.focus();
      return;
    }

    const data = {
      userBeforePw: state.previousPassword,
      userPw: state.newPassword,
      userCheckPw: state.confirmNewPassword,
    };
    const result = await changePassword(data);
    if (result.status === 200) {
      SuccessAlert("변경된 비밀번호로 재로그인해주세요.");
      dispatch(logOut());
      sessionStorage.removeItem("ACCESS_TOKEN");
      navigate("/", { replace: true });
    }
  };
  return (
    <div style={{ padding: "30px 0px 30px 60px" }}>
      <ProfileTitle
        isEdit={false}
        imageId={profileImageState}
        userName={userNameState}
      />
      <EditPasswordWrapper>
        {user.data.userRole !== "ROLE_SOCIAL" ? (
          <>
            <EditPasswordInputWrapper>
              <div
                style={{
                  width: "25%",
                  textAlign: "right",
                  alignItems: "center",
                }}
              >
                이전 비밀번호
              </div>
              <div style={{ marginLeft: "24px" }}>
                <EditPasswordInput
                  onChange={onHandleInput}
                  type="password"
                  name="previousPassword"
                  value={state.previousPassword}
                  ref={previousPasswordInput}
                />
              </div>
            </EditPasswordInputWrapper>
            <EditPasswordInputWrapper alginItem={"flex-start"}>
              <div
                style={{
                  width: "25%",
                  textAlign: "right",
                  alignItems: "center",
                }}
              >
                새 비밀번호
              </div>
              <div style={{ marginLeft: "24px" }}>
                <EditPasswordInput
                  onChange={onHandleInput}
                  type="password"
                  name="newPassword"
                  value={state.newPassword}
                  ref={newPasswordInput}
                />
              </div>
            </EditPasswordInputWrapper>
            <EditPasswordInputWrapper alginItem={"baseline"}>
              <div style={{ width: "25%", textAlign: "right" }}>
                새 비밀번호 확인
              </div>
              <div
                style={{
                  marginLeft: "24px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <EditPasswordInput
                  onChange={onHandleInput}
                  type="password"
                  name="confirmNewPassword"
                  value={state.confirmNewPassword}
                  ref={confirmNewPasswordInput}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    marginTop: "25px",
                  }}
                >
                  <EditPasswordButton onClick={onHandleSubmit}>
                    비밀번호 변경
                  </EditPasswordButton>
                  <Link
                    style={{ textDecoration: "none", color: "#6f92bf" }}
                    to="/findPassword"
                  >
                    비밀번호를 잊으셨나요?
                  </Link>
                </div>
              </div>
            </EditPasswordInputWrapper>
          </>
        ) : (
          <>
            <div style={{ color: "#6F92BF" }}>
              소셜 로그인은 비밀번호를 변경할 수 없습니다.
            </div>
          </>
        )}
      </EditPasswordWrapper>
    </div>
  );
};

export default EditPassword;
