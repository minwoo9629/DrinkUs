import { useState } from "react";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import styled from "styled-components";

// 체크박스 포커스 주기
const Wrapper = styled.div`
  background-color: black;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NeonLoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 40px;
  height: 700px;
  background-color: #131317;
  width: 450px;
`;

const AgreeForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const AgreeWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const AgreeContent = styled.div`
  justify-content: space-between;
  width: 320px;
  height: 64px;
  border-radius: 36px;
  background-color: #131317;
  margin: 14px;
  position: relative;
`;

const ButtonWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  width: 120px;
`;

const Button = styled.button`
  display: flex;
  font-size: 20px;
  color: #fff;
  background-color: #131317;
  /* cursor: pointer; */
`;

const OverTwenty = styled.button`
  font-size: 1rem;
  font-weight: 200;
  color: #fff;
  padding: 1rem 1.2rem 1.1rem;
  border: 0.4rem solid #131317;
  border-radius: 2rem;
  text-transform: uppercase;
  background-color: #131317;
`;

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

  // pdf 파일 불러오자
  // const pdfviewer = document.getElementById('container').ej2_instances[0];

  return (
    <div>
      <Header />
      <Wrapper>
        <NeonLoginWrapper>
          <AgreeForm> 이용약관 동의 </AgreeForm>
          <AgreeWrapper>
            <AgreeContent>
              {/* <Button
                onClick={() => pdfviewer.load('test.pdf', null)}
              > */}
              <Button>
                <u>개인정보수집</u>
                <input
                  type="checkbox"
                  id="check"
                  onChange={(e) => {
                    changeHandler(e.currentTarget.checked, "check");
                  }}
                  checked={checkedButtons.includes("check") ? true : false}
                ></input>
                <label id="check" htmlFor="check"></label>
              </Button>
              <Button
              // onClick={() => window.open('https://admitted-evening-312.notion.site/3-Drinkus-97e5baba6ee845ed8ed6a9148c7f6901', '_blank')}
              >
                <u>이용약관</u>
                <input
                  type="checkbox"
                  id="check2"
                  onChange={(e) => {
                    changeHandler(e.currentTarget.checked, "check2");
                  }}
                  checked={checkedButtons.includes("check2") ? true : false}
                ></input>
                <label id="check2" htmlFor="check2"></label>
              </Button>
              <OverTwenty>20세 이상입니다</OverTwenty>
              <input
                type="checkbox"
                id="check3"
                onChange={(e) => {
                  changeHandler(e.currentTarget.checked, "check3");
                }}
                checked={checkedButtons.includes("check3") ? true : false}
              ></input>
              <label id="check3" htmlFor="check3"></label>
            </AgreeContent>
          </AgreeWrapper>
          <ButtonWrapper>
            <Link to="/">
              <Button>MAIN</Button>
            </Link>
            <Link to="/join/type">
              <Button
                disabled={disabled}
                onClick={() => history.push("/join/type")}
                style={
                  disabled
                    ? { backgroundColor: "#131317" }
                    : { backgroundColor: "#605D9F" }
                }
              >
                NEXT
              </Button>
            </Link>
          </ButtonWrapper>
        </NeonLoginWrapper>
      </Wrapper>
    </div>
  );
};

export default JoinAgree;
