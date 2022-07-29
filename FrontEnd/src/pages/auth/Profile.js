import { useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import axios from "axios";

const BackGround = styled.div`
  background-color: white;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ProfileContents = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 40px;
  height: 700px;
  background-color: #BDCFF2;
  width: 450px;
`

const Profile = () => {
  const [state, setState] = useState({
    userName: "",
    userFullname: "",
    userBirthday: "",
  }
  );

  // 프로필 axios 요청
  axios.get("http://localhost:8080/users/profile/{user_no}", {
  }).then(function (response) {
      console.log(response)
  }).catch(function(error) {
    console.log(error);
  });

  return(
    <>
      <Header/>
      <BackGround>
        <ProfileContents>하이</ProfileContents>
      </BackGround>
    </>
  );
};

export default Profile;