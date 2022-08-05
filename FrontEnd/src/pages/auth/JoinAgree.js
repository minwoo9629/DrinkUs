import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Wrapper, RoundedWrapper, BaseFlexColWrapper } from "../../components/styled/Wrapper";
import { BackButton } from "../../components/common/buttons/BackButton";

// 체크박스 포커스 주기

const AgreeForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
// const AgreeTitle = styled.div`
//   justify-content: space-between;
//   align-items: center;
//   margin-left: auto;
//   margin-right: auto;
//   text-align: center;
//   width: 380px;
//   height: 64px;
//   background-color: #131317;
//   margin: 14px;
//   color: white;
//   display: flex;
//   font-size: 32px;
// `

const AgreeWrapper = styled.div`
  justify-content: space-between;
  width: 380px;
  height: 64px;
  background-color: #131317;
  margin: 14px;
  position: relative;
  color: white;
  display: flex;
  font-size: 20px;
`

const ButtonWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  width: 380px;
  align-items: center;
`;

const Button = styled.button`
  display: flex;
  color: #fff;
  background-color: #131317;
  width: 13px;
  height: 13px;
`;

const LinkWrapper = styled.div`
  display: flex;
  color: #fff;
  background-color: #131317;
  font-size: 20px;
  margin: 40px;
`

const JoinAgree = ({ history }) => {
  const [checkedButtons, setCheckedButtons] = useState([]);
  // 상수 변수로 빼기 (??)
  // 체크박스 개수 변수 설정하기
  const isAllChecked = checkedButtons.length === 3;
  const disabled = !isAllChecked;

  const changeHandler = (checked, id) => {
    if (checked) {
      setCheckedButtons([...checkedButtons, id]);
    } else {
      setCheckedButtons(checkedButtons.filter((button) => button !== id));
    }
  };

  return (
    <>
      <BackButton/>
      {/* <AgreeTitle>동의 페이지</AgreeTitle> */}
      <Wrapper>
        <RoundedWrapper
          width={"450"}
          height={"700"}
          mWidth={"300"}
          mHeight={"460"}
        >
          <BaseFlexColWrapper>
            <AgreeForm>
              <AgreeWrapper>
                <u onClick={() => window.open("../assets/개인정보수집.txt")}>개인정보수집</u>
                  <Button>
                    <input
                      type="checkbox"
                      id="check"
                      onChange={(e) => {
                        changeHandler(e.currentTarget.checked, "check");
                      }}
                      checked={checkedButtons.includes("check") ? true : false}
                    ></input>
                  </Button>
              </AgreeWrapper>
              <AgreeWrapper>
                <u onClick={() => window.open("../assets/이용약관동의.txt")}>이용약관동의</u>
                <Button>
                  <input
                    type="checkbox"
                    id="check2"
                    onChange={(e) => {
                      changeHandler(e.currentTarget.checked, "check2");
                    }}
                    checked={checkedButtons.includes("check2") ? true : false}
                  ></input>
              </Button>
              </AgreeWrapper>
              <AgreeWrapper>
                20세 이상입니다.
                <Button>
                <input
                    type="checkbox"
                    id="check3"
                    onChange={(e) => {
                      changeHandler(e.currentTarget.checked, "check3");
                    }}
                    checked={checkedButtons.includes("check3") ? true : false}
                  ></input>
                </Button>
              </AgreeWrapper>
            </AgreeForm>
            <ButtonWrapper>
              <Link to="/">
                <LinkWrapper>MAIN</LinkWrapper>
              </Link>
              <Link to="/join/type">
                <LinkWrapper
                  disabled={disabled}
                  onClick={() => history.push("/join/type")}
                  style={
                    disabled
                      ? { backgroundColor: "#131317" }
                      : { backgroundColor: "#605D9F" }
                  }
                >NEXT</LinkWrapper>
              </Link>
            </ButtonWrapper>
          </BaseFlexColWrapper>
        </RoundedWrapper>
      </Wrapper>
    </>
  );
};

export default JoinAgree;