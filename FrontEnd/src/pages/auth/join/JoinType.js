import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { BackButton } from "../../../components/common/buttons/BackButton";
import { SocialJoinButton } from "../../../components/common/buttons/SocialJoinButton";

const neon_text_color = "#5904de";
const neon_border_color = "#08f";
const NeonSignAnimation = keyframes`
0%,
  19%,
  21%,
  23%,
  25%,
  54%,
  56%,
  100% {
    text-shadow: -0.1rem -0.1rem 1rem #fff, 0.1rem 0.1rem 1rem #fff,
      0 0 2rem ${neon_text_color}, 0 0 4rem ${neon_text_color},
      0 0 6rem ${neon_text_color}, 0 0 8rem ${neon_text_color},
      0 0 10rem ${neon_text_color};

    box-shadow: 0 0 0.5rem #fff, inset 0 0 0.5rem #fff,
      0 0 1rem ${neon_border_color}, inset 0 0 1rem ${neon_border_color},
      0 0 1rem ${neon_border_color}, inset 0 0 1rem ${neon_border_color};
  },
  20%,
  24%,
`;

// 소셜 로그인 종류 보고 api 문서 페이지에서 url 걸어주기
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

const JoinForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const JoinWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 60px;
  background-color: #131317;
  width: 400px;
  margin-top: 35px;
`;

const LocalButton = styled.button`
  width: 300px;
  height: 50px;
  margin-top: 35px;
  font-size: 1rem;
  font-weight: 500;
  font-family: "맑은고딕";
  color: #fff;
  background-color: black;
  border: 0.2rem solid #fff;
  border-radius: 1rem;
  text-transform: uppercase;
  animation: ${NeonSignAnimation} 1.5s infinite alternate;
`;

// const socialLogin = (e) =>{
//   window.location.replace(`http://localhost:8080/oauth2/authorization/${e.target.name}?redirect_uri=http://localhost:3000/`)
// }

const JoinType = () => {
  const moveSocialJoin = (provider) => {
    window.location.replace(
      `https://i7b306.p.ssafy.io/oauth2/authorization/${provider}`,
    );
  };

  return (
    <div>
      <BackButton />
      <Wrapper>
        <NeonLoginWrapper>
          <JoinForm>
            <div>
              <Link to="/join">
                <LocalButton>로컬 회원가입</LocalButton>
              </Link>
            </div>
            <JoinWrapper>
              <SocialJoinButton
                src="../assets/kakao_login.png"
                color="#fee500"
                onClick={() => moveSocialJoin("kakao")}
              />
            </JoinWrapper>
            <JoinWrapper color="#000000">
              <SocialJoinButton
                src="../assets/google_login.png"
                color="white"
                onClick={() => moveSocialJoin("google")}
              />
            </JoinWrapper>
            <JoinWrapper>
              <SocialJoinButton
                src="../assets/facebook_login.png"
                color="#2374F2"
                onClick={() => moveSocialJoin("facebook")}
              />
            </JoinWrapper>
          </JoinForm>
        </NeonLoginWrapper>
      </Wrapper>
    </div>
  );
};

export default JoinType;
