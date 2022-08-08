import { useState } from "react";
import styled from "styled-components";
import { client } from "../../utils/client"
import testimagesrc from './v.jpeg';


const ProfileBlock = styled.div`
  line-height: 1;
  display: block;
  align-items: center;
  margin-bottom: 10px;
`;

const ProfileImageWrapper = styled.div`
  float: left;
  width: 60px;
  height: 60px;
  margin: 0px 20px 0px 20px;
`;

const ProfileImageThumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 100%;
  border: 3px solid white;
`;

const Nickname = styled.div`
  display: inline-block;
  display: block;
  margin-bottom: 4px;
  height: 30px;
  line-height: 30px;
  font-size: 20px;
  font-weight: bold;
  color: #FFFFFF;
`;

const Popularity = styled.div`
  display: inline-block;
  display: block;
  height: 30px;
  line-height: 30px;
  font-weight: bold;
  color: #D9D9D9;
`;


const FetchProfile = () => {

  const [userProfile, setUserProfile] = useState({
    userNickname: '',
    userPopularity: 0
  });

  const [profileImage, setProfileImage] = useState('');

  client
    .get("users")
    .then(function(response){
      const data = response.data;
      setUserProfile({...userProfile, 
        ["userNickname"]: data.userNickname,
        ["userPopularity"]: data.userPopularity
      });
    })
    .catch(function(error){
      console.log(error);
    });

  return (
    /* 프로필 이미지, 주류 아이콘 이미지는 임시로 설정해놨으니 수정 부탁해요 */
    <ProfileBlock>
      <ProfileImageWrapper>
        <ProfileImageThumbnail src={testimagesrc}></ProfileImageThumbnail>
      </ProfileImageWrapper>
      
      <Nickname>{userProfile.userNickname}</Nickname>
      <Popularity>인기도 {userProfile.userPopularity}° <img height="20px" src="/assets/beer.png"/></Popularity>
    </ProfileBlock>
  );
};

export default FetchProfile;