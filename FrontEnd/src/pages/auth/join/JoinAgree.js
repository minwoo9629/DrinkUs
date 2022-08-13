import { useState } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import {
  Wrapper,
  RoundedWrapper,
  BaseFlexColWrapper,
} from "../../../components/styled/Wrapper";
import { BackButton } from "../../../components/common/buttons/BackButton";

const neon_text_color = "#5904de";
const neon_border_color = "#08f";
const NeonSignAnimationTitle = keyframes`
0%,
  19%,
  21%,
  23%,
  25%,
  54%,
  56%,
  100% {
    text-shadow: -0.2rem -0.2rem 1rem #fff, 0.2rem 0.2rem 1rem #fff,
      0 0 2rem ${neon_text_color}, 0 0 4rem ${neon_text_color},
      0 0 6rem ${neon_text_color}, 0 0 8rem ${neon_text_color},
      0 0 10rem ${neon_text_color};

    box-shadow: 0 0 0.5rem #fff, inset 0 0 0.5rem #fff,
      0 0 1rem ${neon_border_color}, inset 0 0 1rem ${neon_border_color},
      0 0 1rem ${neon_border_color}, inset 0 0 1rem ${neon_border_color};
  }

  20%,
  24%,
`;

const NeonSignAnimation = keyframes`
0%,
  19%,
  21%,
  23%,
  25%,
  54%,
  56%,
  100% {
    text-shadow: -0.2rem -0.2rem 1rem #fff, 0.2rem 0.2rem 1rem #fff,
      0 0 2rem ${neon_text_color}, 0 0 4rem ${neon_text_color},
      0 0 6rem ${neon_text_color}, 0 0 8rem ${neon_text_color},
      0 0 10rem ${neon_text_color};
  },

  20%,
  24%,
`;

// 체크박스 포커스 주기

const NeonSignTitle = styled.h1`
  font-size: 1rem;
  font-weight: 700;
  font-style: italic;
  color: #fff;
  padding: 2rem 2rem;
  border: 0.2rem solid #fff;
  border-radius: 1rem;
  text-transform: uppercase;
  animation: ${NeonSignAnimationTitle} 1.5s infinite alternate;
`;

const AgreeForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 30px;
`;
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
  align-items: center;
  justify-content: space-between;
  align-items: center;
  width: 380px;
  height: 64px;
  background-color: #131317;
  margin: 14px;
  position: relative;
  color: white;
  display: flex;
  font-size: 20px;
`;

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
  font-size: 23px;
  margin: 40px;
  font-style: italic;
  text-transform: uppercase;
  animation: ${NeonSignAnimation} 1.5s infinite alternate;
  box-shadow: none;
`;

const input = styled.input`
  width: 30px;
  height: 30px;
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
      <BackButton />
      {/* <AgreeTitle>동의 페이지</AgreeTitle> */}
      <Wrapper>
        
        <RoundedWrapper
          width={"450"}
          height={"700"}
          mWidth={"300"}
          mHeight={"460"}
        >
          <BaseFlexColWrapper>
          <NeonSignTitle>OPEN DRINKUS</NeonSignTitle>
            <AgreeForm>
              <AgreeWrapper>
                <u onClick={() => window.open("../assets/개인정보수집.txt")}>
                  개인정보수집
                </u>
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
                <u onClick={() => window.open("../assets/이용약관동의.txt")}>
                  이용약관동의
                </u>
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
              <Link to="/" style={{textDecoration:"none"}}>
                <LinkWrapper>MAIN</LinkWrapper>
              </Link>
              <Link to="/join/type" style={{textDecoration:"none"}}>
                <LinkWrapper
                  disabled={disabled}
                  onClick={() => history.push("/join/type")}
                  style={
                    disabled
                      ? { color: "#545454",animation:"none" }
                      : { color: "#fff" }
                  }
                >
                  NEXT
                </LinkWrapper>
              </Link>
            </ButtonWrapper>
          </BaseFlexColWrapper>
        </RoundedWrapper>
      </Wrapper>
    </>
  );
};

export default JoinAgree;
