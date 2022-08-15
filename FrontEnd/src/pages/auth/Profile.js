import { useState, useEffect } from "react";
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
  display: flex;
  margin-bottom: 30px;
`;

const SubCategoryWrapper = styled.div`
  margin: 4px 12px 4px 4px;
  background-color: #ffffff;
  border-radius: 4px;
  border: 3px solid #eaf1ff;
  text-align: center;
  overflow: hidden;

  & input:checked + span {
    background-color: #eaf1ff;
  }
  & span {
    cursor: pointer;
    display: block;
    padding: 2px 16px;
  }
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
  justify-content: center;
  align-items: center;
`;

const ProfileImgWrapper = styled.div`
  border-radius: 40px;
  width: 40px;
  height: 40px;
  background-color: white;
`;

const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const EditButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 16px;
  border: 1px solid black;
  background-color: #bdcff2;
  margin: 14px;
  font-size: 20px;
  color: black;
  cursor: pointer;
`;

const IntroduceWrapper = styled.div`
  background-color: white;
  width: 40vw;
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InterestWrapper = styled.div`
  background-color: transparent;
  width: 40vw;
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ReportsButton = styled.button`
  width: 100px;
  height: 40px;
  border-radius: 8px;
  border: 4px white;
  background-color: #bdcff2;
  margin: 14px;
  font-size: 20px;
  color: #676775;
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
    <div>
      <Wrapper>
        닉네임: {state.userNickname}
        <ProfileWrapper>
          <ProfileImgWrapper>
            <ProfileImg
              src={`/assets/profileImage/profile${state.userImg}.png`}
            />
          </ProfileImgWrapper>
          인기도: {state.userPopularity}°
          <EditButton
            onClick={() => onPopularityPlus(userId)}
            name="plus"
            disabled={popular.popularityNumber === 5}
          >
            {" "}
            +{" "}
          </EditButton>
          <EditButton
            onClick={() => onPopularityMinus(userId)}
            name="minus"
            disabled={popular.popularityNumber === 5}
          >
            {" "}
            -{" "}
          </EditButton>
        </ProfileWrapper>
        <ProfileWrapper>관심사</ProfileWrapper>
        <InterestWrapper>
          {category.map((item) => (
            <CategoryWrapper key={item.subCategoryId}>
              <SubCategoryWrapper>
                <label>{item.subCategoryName}</label>
              </SubCategoryWrapper>
            </CategoryWrapper>
          ))}
        </InterestWrapper>
        <ProfileWrapper>자기 소개</ProfileWrapper>
        <IntroduceWrapper>{state.userIntroduce}</IntroduceWrapper>
        <ProfileWrapper>주량</ProfileWrapper>
        소주: {state.userSoju} 잔<hr />
        맥주: {state.userBeer} 잔
        <ProfileWrapper>
          <ReportsButton onClick={() => changeTypeState("report")}>
            유저 신고
          </ReportsButton>
        </ProfileWrapper>
      </Wrapper>
    </div>
  );
};

export default Profile;
