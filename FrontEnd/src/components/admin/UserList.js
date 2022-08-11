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