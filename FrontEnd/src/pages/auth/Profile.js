import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/layout/Header";
import styled from "styled-components";
import axios from "axios";

const Wrapper = styled.div`
  background-color: #eaf2ff;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
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
    userPopularity: 0,
  })

  // 인기도 수정
  const onPopularityEdit = (e) => {
    const name = e.target.name;
    if (name === "plus") {
      setState({...state, userPopularity: state.userPopularity + 1});
    } else if (name === "minus") {
      setState({...state, userPopularity:state.userPopularity - 1});
    }
  }

  // axios 요청
  axios
    .get("http://localhost:8080/users/profile/{user_no}", {
      // userId: 1,
    })
    .then(function (response) {
        console.log(response)
    })
    .catch(function(error) {
      console.log(error);
    });

  return(
  <div>
    <Header/>
      <Wrapper>
        <ProfileWrapper>
          <ProfileImg></ProfileImg>
            인기도: {state.userPopularity}°
            <EditButton
              onClick={onPopularityEdit}
              name="plus"
            > +
            </EditButton>
            <EditButton
              onClick={onPopularityEdit}
              name="minus"
            > - </EditButton>
              관심사
              <Link to="/reports">
                <ReportsButton>유저 신고</ReportsButton>
              </Link>
        </ProfileWrapper>
      </Wrapper>
  </div>
  )
}

export default Profile;