import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { client } from "../../utils/client";

const Wrapper = styled.div`
  background-color: #eaf2ff;
  width: 100vw;
  height: 100vh;
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

const ProfileImg = styled.div`
  padding: 8px;
  border-radius: 40px;
  width: 30px;
  height: 30px;
  background-color: white;
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
`

const IntroduceWrapper = styled.div`
  background-color: white;
  width: 40vw;
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ReportsButton = styled.button`
  width: 100px;
  height: 40px;
  border-radius: 8px;
  border: 4px white;
  background-color: #bdcff2;
  margin: 14px;
  font-size: 20px;
  color: #676775;
`

const Profile = () => {
  const [state, setState] = useState({
    userNickname: "",
    userPopularity: "",  // 인기도
    userImg: "",
    userIntroduce: "",
    userSoju: "",
    userBeer: "",
  });

  const [popular, setPopular] = useState({
    popularityNumber: 0,
  })
  // 인기도 수정 횟수 5회 제한 + 5회 넘을 시 alert 창
  const popularityDisabled = state.popularityNumber === 5;


  // 인기도 수정
  const onPopularityEdit = (e) => {
    const name = e.target.name;
    if (name === "plus") {
      setState({...state, userPopularity: state.userPopularity + 1});
      setPopular({...popular, popularityNumber: popular.popularityNumber + 1});
    } else if (name === "minus") {
      setState({...state, userPopularity:state.userPopularity - 1});
      setPopular({...popular, popularityNumber: popular.popularityNumber + 1});
    }
    // 인기도 수정 api 요청
    client
      .patch(`/users/popularity/6`, {
        //  params: {
        //   user_id: "6",
        // }  
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    };


  // 유저 정보 요청
  useEffect(() => {
    const fetchUsers = async() => {
      try{
        const response = await client.get(
          `/users/profile/6`, {
            //  params: {
        //   user_id: "user_id",
        // }  
          }
        );
        setState(response.data);
        console.log(response)
      } catch (e) {
        console.log(e);
      }
    };
    fetchUsers();
  }, []);


  return (
  <div>
      <Wrapper>
          닉네임: {state.userNickname}
        <ProfileWrapper>
          <ProfileImg>{state.userImg}</ProfileImg>
            인기도: {state.userPopularity}°
            <EditButton
              onClick={onPopularityEdit}
              name="plus"
              disabled={popularityDisabled}
            > + </EditButton>
            <EditButton
              onClick={onPopularityEdit}
              name="minus"
              disabled={popularityDisabled}
            > - </EditButton>
        </ProfileWrapper>
        <ProfileWrapper>
              관심사
        </ProfileWrapper>
        <IntroduceWrapper>
          관심사 data값에 없음
        </IntroduceWrapper>
        <ProfileWrapper>
          자기 소개
        </ProfileWrapper>
        <IntroduceWrapper>
          {state.userIntroduce}
        </IntroduceWrapper>
        <ProfileWrapper>
          주량
        </ProfileWrapper>
        소주: {state.userSoju} 잔<hr/>
        맥주: {state.userBeer} 잔
        <ProfileWrapper>
          <Link to="/reports">
            <ReportsButton>유저 신고</ReportsButton>
          </Link>
        </ProfileWrapper>
      </Wrapper>
  </div>
  )
}

export default Profile;
