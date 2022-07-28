import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Wrapper, RoundedWrapper,BaseFlexColWrapper, InputWrapper} from "../../../components/styled/Wrapper";
import { BackButton } from "../../../components/common/buttons/BackButton";
import { EmptyAlert, FailAlert } from "../../../utils/sweetAlert";
import { AuthInput } from "../../../components/common/inputs/AuthInput";
import { AuthButton } from "../../../components/common/buttons/AuthButton";
import { GoToButton } from "../../../components/common/buttons/GoToButton";
import { BaseForm } from "../../../components/common/Forms/Form";
import { findPassword } from "../../../api/AuthAPI";



const FindPassword = () => {
  const [state, setState] = useState({
    userId: "",
    type: "find",
  });
  const userIdInput = useRef();
  const navigate = useNavigate();

  const onHandleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onHandleSubmit = async (event) => {
    event.preventDefault();
    if (state.length === 0) {
      EmptyAlert("아이디를 입력해주세요");
      return;
    }

    // 비밀번호 찾기 Axios 요청 로직
    const data = {
      userName: state.userId,
    };

    const response = findPassword(data) 
    if (response.status === 200) {
      setState({ ...state, type: "result" });
    } else {
      FailAlert(response.data.message);
    }
  };

  return (
    <Wrapper>
      {state.type === "find" ? (
        <>
          <BackButton />
          <RoundedWrapper
            width={"450"}
            height={"700"}
            mWidth={"300"}
            mHeight={"460"}
          >
            <BaseFlexColWrapper>
              <BaseForm onSubmit={onHandleSubmit}>
                <InputWrapper>
                  <i className="fas fa-envelope"></i>
                  <AuthInput
                    value={state.userId}
                    ref={userIdInput}
                    name="userId"
                    onChange={onHandleInput}
                    placeholder="Email ID"
                  />
                </InputWrapper>
                <AuthButton type="submit">비밀번호 찾기</AuthButton>
              </BaseForm>
            </BaseFlexColWrapper>
          </RoundedWrapper>
        </>
      ) : (
        <>
          <RoundedWrapper
            width={"840"}
            height={"400"}
            mWidth={"300"}
            mHeight={"200"}
            flexDirection={"column"}
          >
            <h2 style={{ color: "white", marginTop: "20px" }}>
              {state.userId}로 임시비밀번호가 전송되었습니다.
            </h2>
            <GoToButton onClick={() => navigate("/login")}>로그인</GoToButton>
          </RoundedWrapper>
        </>
      )}
    </Wrapper>
  );
};

export default FindPassword;
