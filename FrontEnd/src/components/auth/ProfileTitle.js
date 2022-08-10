import styled from "styled-components";

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
const ProfileTitle = ({ isEdit, imageId, userName }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <ProfileImageWrapper>
        <ProfileImageThumbnail
          src={`/assets/profileImage/profile${imageId}.png`}
        />
      </ProfileImageWrapper>
      <div>
        <p>{userName}</p>
        {isEdit ? (
          <>
            <input type="file" id="profileImage" />
            <label htmlFor="profileImage" id="profileImageLabel">
              프로필 사진 바꾸기
            </label>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ProfileTitle;

ProfileTitle.defaultProps = {
  isEdit: false,
};
