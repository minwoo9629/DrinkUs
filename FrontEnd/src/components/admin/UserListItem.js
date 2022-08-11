import styled from "styled-components";

const DeleteButton = styled.div`
  background-color: #bdcff2;
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
  onHandleRemoveArticle,
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
        )}
      <div style={{ width: "5%" }}>{userPoint}</div>
      <div style={{ width: "10%" }}>{userStopDate}</div>
      <div style={{ width: "10%" }}>권한부여</div>
      <div style={{ width: "5%" }}>
        <DeleteButton onClick={() => console.log("hello")}>
          삭제
        </DeleteButton>
      </div>
    </div>
  );
};

export default UserListItem;
