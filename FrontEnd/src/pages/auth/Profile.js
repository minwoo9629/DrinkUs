import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  getUserCategory,
  getUserProfile,
  plusPopularity,
  minusPopularity,
} from "../../api/ProfileAPI";
import { FailAlert } from "../../utils/sweetAlert";

const CategoryWrapper = styled.div`
  padding: 4px 16px;
  display: -ms-flexbox;
  background-color: #ffffff;
  border-radius: 6px;
  margin: 0px 8px 8px 0px;
  box-shadow: 2px 2px 2px grey;
`;

const Wrapper = styled.div`
  background-color: #eaf2ff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ProfileWrapper = styled.div`
  display: flex;
  justify-content: ${(props) => props.justify};
  flex-direction: ${(props) => props.flexDirection};
  align-items: ${(props) => props.alignItems};
  width: 100%;
  margin-bottom: 10px;
`;

ProfileWrapper.defaultProps = {
  justify: "center",
  flexDirection: "row",
  alignItems: "center",
};

const ProfileImgWrapper = styled.div`
  border-radius: 40px;
  width: 45px;
  height: 45px;
  background-color: white;
  margin-right: 10px;
`;

const ProfileImg = styled.img`
  width: 100%;
  height: 100%;

  object-fit: cover;
`;

const EditButton = styled.button`
  width: 25px;
  height: 25px;
  border-radius: 6px;
  border: 2px solid #ffffff;
  background-color: #bdcff2;
  font-size: 18px;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 4px;
  cursor: pointer;
`;

const IntroduceWrapper = styled.div`
  background-color: white;
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InterestWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const ReportsButton = styled.button`
  width: 100px;
  height: 40px;
  border-radius: 8px;
  border: 4px white;
  background-color: #bdcff2;
  font-size: 16px;
  color: #676775;
  border: 2px solid #ffffff;
`;

const Profile = ({ userId, changeTypeState }) => {
  const [state, setState] = useState({
    userNickname: "",
    userPopularity: "", // 인기도
    userImg: "",
    userIntroduce: "",
    userSoju: "",
    userBeer: "",
  });

  const user = useSelector((state) => state.user);

  // App.js의 변수명 지정해주기
  const [popular, setPopular] = useState({
    popularityNumber: 0,
  });

  const [category, setCategory] = useState([]);
  // 인기도 수정 횟수 5회 제한 + 5회 넘을 시 alert 창
  if (popular.popularityNumber >= 5) {
    FailAlert("인기도 수정횟수는 1일 최대 5회입니다");
  }

  // 인기도 더하기
  const onPopularityPlus = async (userNo) => {
    const result = await plusPopularity(userNo);
    if (result.status === 400) {
      FailAlert("오늘의 인기도 수정 횟수를 모두 사용했습니다.");
    } else {
      setState({ ...state, userPopularity: state.userPopularity + 1 });
      setPopular({
        ...popular,
        popularityNumber: popular.popularityNumber + 1,
      });
    }
  };

  // 인기도 내리기
  const onPopularityMinus = async (userNo) => {
    const result = await minusPopularity(userNo);
    if (result.status === 400) {
      FailAlert("오늘의 인기도 수정 횟수를 모두 사용했습니다.");
    } else {
      setState({ ...state, userPopularity: state.userPopularity - 1 });
      setPopular({
        ...popular,
        popularityNumber: popular.popularityNumber + 1,
      });
    }
  };

  // 유저 정보 요청
  const fetchUsers = async () => {
    const result = await getUserProfile(userId);
    setState({ ...result.data });
  };

  // 유저 관심사 요청
  const fetchCategory = async () => {
    const response = await getUserCategory(userId);
    setCategory([...response.data]);
  };

  useEffect(() => {
    fetchUsers();
    fetchCategory();
  }, []);
  return (
    <div style={{ width: "60%" }}>
      <Wrapper>
        <ProfileWrapper justify={"flex-start"}>
          <ProfileImgWrapper>
            <ProfileImg
              src={`/assets/profileImage/profile${state.userImg}.png`}
            />
          </ProfileImgWrapper>
          <div>
            <div>{state.userNickname} 님의 프로필 입니다.</div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div>인기도: {state.userPopularity}°</div>
              {user.data.userNickname !== state.userNickname ? (
                <>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <EditButton
                      onClick={() => onPopularityPlus(userId)}
                      name="plus"
                      disabled={popular.popularityNumber === 5}
                    >
                      <i className="fas fa-caret-up"></i>
                    </EditButton>
                    <EditButton
                      onClick={() => onPopularityMinus(userId)}
                      name="minus"
                      disabled={popular.popularityNumber === 5}
                    >
                      <i className="fas fa-caret-down"></i>
                    </EditButton>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </ProfileWrapper>
        <ProfileWrapper justify={"flex-start"}>관심사</ProfileWrapper>
        <InterestWrapper>
          {category.map((item) => (
            <CategoryWrapper key={item.subCategoryId}>
              {item.subCategoryName}
            </CategoryWrapper>
          ))}
        </InterestWrapper>
        <ProfileWrapper justify={"flex-start"}>자기 소개</ProfileWrapper>
        <IntroduceWrapper>{state.userIntroduce}</IntroduceWrapper>
        <ProfileWrapper flexDirection={"column"} alignItems={"flex-start"}>
          <div>주량</div>
          <div>
            소주: {state.userSoju} 잔 맥주: {state.userBeer} 잔
          </div>
        </ProfileWrapper>
        <ProfileWrapper justify={"flex-end"}>
          <ReportsButton onClick={() => changeTypeState("report")}>
            유저 신고
          </ReportsButton>
        </ProfileWrapper>
      </Wrapper>
    </div>
  );
};

export default Profile;
