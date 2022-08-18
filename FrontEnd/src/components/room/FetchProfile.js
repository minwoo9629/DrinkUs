import styled from "styled-components";
import { useSelector } from "react-redux";
import { GetPopularlityPercent } from "../../utils/GetPopularlityPercent";


const ProfileBlock = styled.div`
  line-height: 1;
  display: flex;
  justify-content: left;
  align-items: center;
  margin-bottom: 10px;
`;

const ProfileImageWrapper = styled.div`
  float: left;
  width: 60px;
  height: 60px;
  margin: 0px 20px 0px 20px;
`;

const ProfileInfo = styled.div`
  align-items: center;
`

const ProfileImageThumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 100%;
  border: 3px solid white;
`;

const Nickname = styled.div`
  height: 30px;
  line-height: 30px;
  font-size: 15px;
  font-weight: bold;
  color: #000000;
`;

const Popularity = styled.div`
  text-align: center;
  align-items: center;
  height: 30px;
  font-size: 15px;
  line-height: 30px;
  font-weight: bold;
  color: #484D59;
`;



const FetchProfile = () => {

  const user = useSelector((state) => state.user);

  const popularlityPercent = GetPopularlityPercent(user.data.userPopularity);

  return (
    <ProfileBlock>
      <ProfileImageWrapper>
        <ProfileImageThumbnail src={`/assets/profileImage/profile${user.data.userImg}.png`}></ProfileImageThumbnail>
      </ProfileImageWrapper>
      <ProfileInfo>
      <Nickname>{user.data.userNickname}</Nickname>
      <Popularity>
        인기도 {user.data.userPopularity}° 
        <img
          style={{ width: "30px", height: "30px", marginLeft: "10px" }}
          src={
            process.env.PUBLIC_URL +
            `/assets/alcoholImage/${popularlityPercent}.png`
          }
        />
      </Popularity>
      </ProfileInfo>
    </ProfileBlock>
  );
};

export default FetchProfile;