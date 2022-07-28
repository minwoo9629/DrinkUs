import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Wrapper, RoundedWrapper, BaseFlexColWrapper, InputWrapper } from "../../../components/styled/Wrapper";
import { BaseForm } from "../../../components/common/Forms/Form";
import { BackButton } from "../../../components/common/buttons/BackButton";
import { EmptyAlert, FailAlert } from "../../../utils/sweetAlert";
import { AuthInput } from "../../../components/common/inputs/AuthInput";
import { AuthButton } from "../../../components/common/buttons/AuthButton";
import { GoToButton } from "../../../components/common/buttons/GoToButton";
import { findId } from "../../../api/AuthAPI";


const FindId = () => {
  const [state, setState] = useState({
    userName: "",
    dateOfBirth: "",
    type: "find",
    idList: [],
  });
  const navigate = useNavigate();

  const onHandleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onHandleSubmit = async (event) => {
    event.preventDefault();
    if (state.userName.length === 0 || state.dateOfBirth.length === 0) {
      EmptyAlert("이름 또는 생년월일을 입력해주세요");
      return;
    }
    if (state.dateOfBirth.length < 8) {
      FailAlert("생년월일 양식에 맞게 입력해주세요");
      return;
    }
    const data = {
      userFullname: state.userName,
      userBirthday: state.dateOfBirth,
    }
    const response = findId(data)
    if (response.status !== 200) {
      FailAlert(`${response.data.message}`);
      return;
    }

    setState({ ...state, type: "result", idList: [...response.data] });
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
                  <i className="fas fa-user"></i>
                  <AuthInput
                    value={state.userName}
                    name="userName"
                    onChange={onHandleInput}
                    placeholder="이름"
                  />
                </InputWrapper>
                <InputWrapper>
                  <i className="fas fa-calendar-alt"></i>
                  <AuthInput
                    value={state.dateOfBirth}
                    name="dateOfBirth"
                    onChange={onHandleInput}
                    placeholder="생년월일 (ex:20000101)"
                  />
                </InputWrapper>
                <AuthButton type="submit">아이디 찾기</AuthButton>
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
            {state.idList.length !== 0 ? (
              <>
                <h2 style={{ color: "white", marginTop: "20px" }}>
                  {state.userName} | {state.dateOfBirth}로 검색된 아이디입니다.
                </h2>
                <div>
                  {state.idList.map((item) => (
                    <div>{item}</div>
                  ))}
                </div>
              </>
            ) : (
              <h2 style={{ color: "white", marginTop: "20px" }}>
                등록된 아이디가 존재하지 않습니다.
              </h2>
            )}

            <GoToButton onClick={() => navigate("/")}>홈으로</GoToButton>
          </RoundedWrapper>
        </>
      )}
    </Wrapper>
  );
};

export default FindId;
