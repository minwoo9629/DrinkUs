import styled from "styled-components";

const CustomButton = styled.div`
  height: 20px;
  line-height: 20px;
  background-color: ${({ bg }) => bg};
  border-radius: 5px;
  border: none;
  cursor: pointer;
  padding: 4px 12px;
  color: white;
  text-align: center;
`;

const UserListItem = ({
  userId,
  userName,
  userEmail,
  userFullname,
  userNickname,
  userPopularity,
  userPopularityLimit,
  userBirthday,
  userIntroduce,
  userImg,
  userRole,
  userGrade,
  userPoint,
  userStopDate,
  userSoju,
  userBeer,
  onHandlePermitUser,
  onHandleRemoveUser
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        marginBottom: "32px",
        alignItems: "center",
        height: "20px",
      }}
    >
      <div style={{ width: "5%" }}>{userId}</div>
      <div style={{ width: "15%" }}>{userName}</div>
      <div style={{ width: "10%" }}>{userFullname}</div>
      <div style={{ width: "10%" }}>{userNickname}</div>
      <div style={{ width: "10%" }}>{userPopularity}</div>
      <div style={{ width: "10%" }}>{userBirthday}</div>
      {
        userRole === "ROLE_ADMIN" ? (
            <div style={{ width: "10%" }}>관리자</div>
        ) : (
            <div style={{ width: "10%" }}>사용자</div>
        )
      }
      <div style={{ width: "5%" }}>{userPoint}</div>
      {
        userStopDate ? (
          <div style={{ width: "10%" }}>
            {userStopDate.substr(0,4)}년&nbsp;
            {userStopDate.substr(5,2)}월&nbsp;
            {userStopDate.substr(8,2)}일&nbsp;
            {userStopDate.substr(11,2)}시&nbsp;
            {userStopDate.substr(14,2)}분&nbsp;
          </div>
        ) : (
          <div style={{ width: "10%" }}>-</div>
        )
      }
      <div style={{ width: "8%" }}>
      {
        userRole === "ROLE_ADMIN" ? (
          <CustomButton bg="darkgrey">
            -
          </CustomButton>
        ) : (
          <CustomButton bg="blue" onClick={() => onHandlePermitUser(userId)}>
            권한부여
          </CustomButton>
        )
      }
      </div>
      <div style={{ width: "2%" }}></div>
      <div style={{ width: "5%" }}>
        <CustomButton bg="red" onClick={() => onHandleRemoveUser(userId)}>
          삭제
        </CustomButton>
      </div>
    </div>
  );
};

export default UserListItem;
