import styled from "styled-components";
import { useSelector } from "react-redux";
import { GetPopularlityPercent } from "../../utils/GetPopularlityPercent";

const ProfileBlock = styled.div`
  width: "550px";
  text-align: left;
`;

const ProfileImageWrapper = styled.div`
  display: inline-block;
  margin-right: 22px;
  width: 50px;
`;

const ProfileInfo = styled.div`
  display: inline-block;
`;

const ProfileImageThumbnail = styled.img`
  width: 100%;
  border-radius: 100%;
  border: 4px solid #6e9dcc;
`;

const Nickname = styled.span`
  font-size: 21px;
  font-weight: bold;
  color: #000000;
`;

const Popularity = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #484d59;
`;

const UserProfile = () => {
  const user = useSelector((state) => state.user);

  const popularlityPercent = GetPopularlityPercent(user.data.userPopularity);

  return (
    <ProfileBlock>
      <ProfileImageWrapper>
        <ProfileImageThumbnail
          src={`/assets/profileImage/profile${user.data.userImg}.png`}
        />
      </ProfileImageWrapper>
      <ProfileInfo>
        <Nickname>{user.data.userNickname}</Nickname>
        <Popularity>
          인기도 {user.data.userPopularity}°
          <img
            style={{ width: "23px", marginLeft: "3px", marginBottom: "-3px" }}
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

export default UserProfile;
