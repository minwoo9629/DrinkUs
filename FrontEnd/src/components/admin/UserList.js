import React from "react";
import UserListItem from "./UserListItem";

const UserList = React.memo(({ userList, onHandlePermitUser, onHandleRemoveUser }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "20px 20px",
        minHeight: "560px",
        margin: "0px 80px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginBottom: "32px",
          alignItems: "center",
          height: "20px",
        }}
      >
        <div style={{ width: "5%" }}>번호</div>
        <div style={{ width: "15%" }}>아이디</div>
        <div style={{ width: "10%" }}>이름</div>
        <div style={{ width: "10%" }}>닉네임</div>
        <div style={{ width: "10%" }}>인기도</div>
        <div style={{ width: "10%" }}>생일</div>
        <div style={{ width: "10%" }}>권한</div>
        <div style={{ width: "5%" }}>포인트</div>
        <div style={{ width: "10%" }}>정지기한</div>
        <div style={{ width: "8%" }}>권한부여</div>
        <div style={{ width: "2%" }}></div>
        <div style={{ width: "5%" }}>삭제</div>
      </div>
      {userList.length !== 0 ? (
        <>
          {userList.map((content) => (
            <UserListItem
              {...content}
              key={content.userId}
              onHandlePermitUser={onHandlePermitUser}
              onHandleRemoveUser={onHandleRemoveUser}
            />
          ))}
        </>
      ) : (
        <>
          <p>사용자 내역이 없습니다.</p>
        </>
      )}
    </div>
  );
});

export default UserList;