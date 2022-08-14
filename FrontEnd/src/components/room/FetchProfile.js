import styled from "styled-components";
import { useSelector } from "react-redux";
import { GetPopularlityPercent } from "../../utils/GetPopularlityPercent";


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

  const user = useSelector((state) => state.user);

  const popularlityPercent = GetPopularlityPercent(user.data.userPopularity);

  return (
    <ProfileBlock>
      <ProfileImageWrapper>
        <ProfileImageThumbnail src={`/assets/profileImage/profile${user.data.userImg}.png`}></ProfileImageThumbnail>
      </ProfileImageWrapper>
      
      <Nickname>{user.data.userNickname}</Nickname>
      <Popularity>
        인기도 {user.data.userPopularity}° 
        <img
          style={{ width: "40px", height: "40px", marginLeft: "20px" }}
          src={
            process.env.PUBLIC_URL +
            `/assets/alcoholImage/${popularlityPercent}.png`
          }
        />
      </Popularity>
    </ProfileBlock>
  );
};

export default FetchProfile;