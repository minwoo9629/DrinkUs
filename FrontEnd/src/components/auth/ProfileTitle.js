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
const OpenProfileImageModalButton = styled.button`
  border: none;
  cursor: pointer;
  background: transparent;
  color: cornflowerblue;
`;
const ProfileTitle = ({ isEdit, imageId, userName, openModal, marginLeft }) => {
  return (
    <div
      style={{ display: "flex", alignItems: "center", marginLeft: marginLeft }}
    >
      <ProfileImageWrapper>
        <ProfileImageThumbnail
          src={`/assets/profileImage/profile${imageId}.png`}
        />
      </ProfileImageWrapper>
      <div>
        <p>{userName}</p>
        {isEdit ? (
          <>
            <OpenProfileImageModalButton onClick={openModal}>
              프로필 사진 바꾸기
            </OpenProfileImageModalButton>
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
  marginLeft: "0px",
};
