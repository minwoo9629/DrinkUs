import { useState } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import {
  Wrapper,
  BaseFlexColWrapper,
} from "../../../components/styled/Wrapper";
import { BackButton } from "../../../components/common/buttons/BackButton";
import { AuthButton } from "../../../components/common/buttons/AuthButton";

const neon_text_color = "#5904de";
const neon_border_color = "#08f";
const disagreeColor = "white";
const agreeColor = "#6F92BF";

// 개인정보 수집 이용 안내, 이용 약관 안내 문구
let personalInformationGuide = "노팅엄은 이번 시즌 폭풍 영입을 하고 있다. 23년 만에 프리미어리그 무대로 승격한 노팅엄은 구단주의 전폭적인 지원 아래 제시 린가드, 니코 윌리엄스 등 굵직한 영입을 이뤘다. 그 중 맨체스터 유나이티드 출신인 딘 헨더슨도 영입되며 주전 골키퍼 자리를 꿰찼다. 이날 경기에도 헨더슨은 노팅엄의 골문을 지켰다. 초반부터 노팅엄은 웨스트햄을 강하게 밀어붙였다. 결국 전반 46분 린가드의 슈팅에 이어 웨스트햄 골문 앞으로 흐른 공을 아워니이가 밀어 넣으며 선제골을 만들었다. 노팅엄이 리드를 지킬 수 있던 건 헨더슨의 역할이 컸다. 후반이 시작되자마자 포르날스가 오른발 중거리 슈팅을 날렸지만 골대를 맞고 나왔다. 이어 헨더슨의 선방이 빛났다. 토마스 소우체크가 뒤이어 골문 앞에서 헤더 슈팅을 날렸지만 헨더슨이 날아오르며 손으로 쳐냈다. 페널티킥을 막아내기도 했다. 후반 18분 웨스트햄에 페널티킥이 선언됐고 웨스트햄의 에이스 데클란 라이스가 키커로 나섰다. 하지만 헨더슨이 정확히 왼쪽으로 가는 슈팅을 읽어내며 막아냈다. 결국 노팅엄은 23년 만에 프리미어리그 승격 후 첫 승리를 따냈다. 노팅엄의 승리의 주역은 결승골을 터뜨린 아워니이였지만, 헨더슨이 없었다면 승리를 장담할 수 없었다. 헨더슨은 훌륭한 반사신경과 수비 리딩 능력 그리고 무엇보다 페널티킥 선방으로 팀의 승리를 견인했다.";
let termsGuide = "이용 약관 안내 문구";

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

const NeonSignTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  font-style: italic;
  color: #fff;
  padding: 2rem 2rem;
  //border: 0.2rem solid #fff;
  //border-radius: 1rem;
  text-transform: uppercase;
  animation: ${NeonSignAnimationTitle} 1.5s infinite alternate;

  @media screen and (max-width: 500px) {
    font-size: 4vw;
  }
`;

const NeonWrapper = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 13px;
  padding: 10px;
  height: 680px;
  background: linear-gradient(
    146deg,
    rgba(56, 56, 56, 0.9248074229691877) 0%,
    rgba(20, 20, 20, 1) 61%
  );
  width: 450px;
`;

const AgreeForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 30px;
`;

const AgreeWrapper = styled.div`
  align-items: center;
  justify-content: space-between;
  align-items: center;
  width: 400px;
  height: 64px;
  //background-color: #131317;
  margin: 4px;
  position: relative;
  color: white;
  display: flex;
  font-size: 20px;

  @media screen and (max-width: 500px) {
    font-size: 16px;
    width: 90%;
  }
`;

const AgreeText = styled.div`
  padding-left: 20%;
  color: ${({ color }) => color};

  @media screen and (max-width: 500px) {
    padding-left: 0%;
  }
`;

const FaBook = styled.i`
  display: inline;
  font-size: 24px;
  margin-top: 8px;
  margin-right: 36px;
  color: #bdcff2;

  @media screen and (max-width: 500px) {
    display: none;
  }
`;

const DocumentWrapper = styled.div`
  display: ${({ display }) => display};
  width: 80%;
  height: 100px;
  background-color: #bdcff2;
  color: #535353;
  border-radius: 10px;
  padding: 10px;
  word-wrap: break-word;
  overflow: auto;
`;

const JoinAgree = () => {

  const [documentDisplay, setDocumentDisplay] = useState([false, false]);
  const [checkNum, setCheckNum] = useState(0);
  const [textColor, setTextColor] = useState([false, false, false]);
  
  const changeHandler = (id) => {
    // 동의한 총 갯수 설정
    if(!textColor[id]) setCheckNum(checkNum + 1);
    else setCheckNum(checkNum - 1);

    // 문자 색 설정 (배열 setState 설정)
    const newTextColor = [...textColor];
    newTextColor[id] = !newTextColor[id];
    setTextColor(newTextColor);
  };

  const openDoc = (id) => {
    if(id === 0){
      setDocumentDisplay([!documentDisplay[0], documentDisplay[1]]);
    } else {
      setDocumentDisplay([documentDisplay[0], !documentDisplay[1]]);
    }
  }

  const nextButtonHandler = (e) => {
    if(checkNum < 3) e.preventDefault();
  }

  return (
    <>
      <BackButton />
      <Wrapper>
        <NeonWrapper
          width={"450"}
          height={"700"}
          mWidth={"300"}
          mHeight={"460"}
        >
          <BaseFlexColWrapper>
          <NeonSignTitle>DRINKUS</NeonSignTitle>
            <AgreeForm>
              <AgreeWrapper>
                <AgreeText
                  id="check0"
                  color= {
                    textColor[0] ? agreeColor : disagreeColor
                  }
                  onClick={() => changeHandler(0)}
                >
                  <i className="fas fa-check"/>
                  &nbsp;개인정보 수집 동의 (필수)
                </AgreeText>
                <FaBook 
                  id="0"
                  className="fas fa-book"
                  onClick={() => openDoc(0)}  
                />
              </AgreeWrapper>
              <DocumentWrapper
                display={
                  documentDisplay[0] ? "block" : "none"
                }
              >
                {personalInformationGuide}
              </DocumentWrapper>
              <AgreeWrapper>
                <AgreeText
                  id="check1"
                  color= {
                    textColor[1] ? agreeColor : disagreeColor
                  }
                  onClick={() => changeHandler(1)}
                >
                  <i className="fas fa-check"/>
                  &nbsp;이용약관 동의 (필수)
                </AgreeText>
                <FaBook 
                  id="1"
                  className="fas fa-book"
                  onClick={() => openDoc(1)}  
                />
              </AgreeWrapper>
              <DocumentWrapper
                display={
                  documentDisplay[1] ? "block" : "none"
                }
              >
                {termsGuide}
              </DocumentWrapper>
              <AgreeWrapper>
                <AgreeText
                  id="check2"
                  color= {
                    textColor[2] ? agreeColor : disagreeColor
                  }
                  onClick={() => changeHandler(2)}
                >
                  <i className="fas fa-check"/>
                  &nbsp;만 18세 이상입니다. (필수)
                </AgreeText>
              </AgreeWrapper>
            </AgreeForm>
            <Link
              to="/join/type"
              onClick={nextButtonHandler}
              style={{ textDecoration: "none" }}
            >
              <AuthButton
                style={
                  checkNum < 3 ? 
                    ({ backgroundColor: "#545454", animation:"none", color: "black"}) :  
                    ({ backgroundColor: "#bdcff2", animation:"none", color: "black"})
                }
              >
                다음
              </AuthButton>
            </Link>
          </BaseFlexColWrapper>
        </NeonWrapper>
      </Wrapper>
    </>
  );
};

export default JoinAgree;
