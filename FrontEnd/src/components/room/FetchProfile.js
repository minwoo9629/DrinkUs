import { useState } from "react";
import styled from "styled-components";
import { client } from "../../utils/client"

const ProfileImageWrapper = styled.div`
width: 60px;
height: 60px;
margin: 10px 20px 0px 20px;
`;

const ProfileImageThumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 100%;
`;


const FetchProfile = () => {

  const [userProfile, setUserProfile] = useState({
    userName: '',
    userNickname: ''
  });

  client
    .get("users")
    .then(function(response){
      console.log(response.data);
      //const data = response.data;
      //this.userName = data.userName;
      //this.userNickname = data.userNickname;
    })
    .catch(function(error){
      console.log(error);
    });

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {/* 프로필을 들고오는 컴포넌트입니다.
      store에서 userprofile정보를 들고와야 합니다. */}
      <ProfileImageWrapper>
        <ProfileImageThumbnail src="/assets/muji.jpeg"/>
      </ProfileImageWrapper>
    </div>
  );
};

export default FetchProfile;