import { useEffect, useState } from "react";
import styled from "styled-components";
import Profile from "../../../pages/auth/Profile";
import Reports from "../../../pages/auth/Reports";
import ModalCloseButton from "../../common/buttons/ModalCloseButton";

const CategoryWrapper = styled.div`
  display: flex;
  margin-bottom: 30px;
`;

const SubCategoryWrapper = styled.div`
  margin: 4px 12px 4px 4px;
  background-color: #ffffff;
  border-radius: 4px;
  border: 3px solid #eaf1ff;
  text-align: center;
  overflow: hidden;

  & input:checked + span {
    background-color: #eaf1ff;
  }
  & span {
    cursor: pointer;
    display: block;
    padding: 2px 16px;
  }
`;

const Wrapper = styled.div`
  background-color: #eaf2ff;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ProfileWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileImg = styled.div`
  padding: 8px;
  border-radius: 40px;
  width: 30px;
  height: 30px;
  background-color: white;
`;

const EditButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 16px;
  border: 1px solid black;
  background-color: #bdcff2;
  margin: 14px;
  font-size: 20px;
  color: black;
  cursor: pointer;
`;

const IntroduceWrapper = styled.div`
  background-color: white;
  width: 40vw;
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InterestWrapper = styled.div`
  background-color: transparent;
  width: 40vw;
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ReportsButton = styled.button`
  width: 100px;
  height: 40px;
  border-radius: 8px;
  border: 4px white;
  background-color: #bdcff2;
  margin: 14px;
  font-size: 20px;
  color: #676775;
`;
const UserProfileContent = ({ userId, close, userNickname }) => {
  const [typeState, setTypeState] = useState("read");

  const changeTypeState = (type) => {
    setTypeState(type);
  };

  return (
    <>
      <ModalCloseButton close={close} />
      {typeState === "read" ? (
        <>
          <Profile
            changeTypeState={changeTypeState}
            userId={userId}
            userNickname={userNickname}
          />
        </>
      ) : (
        <>
          <Reports
            changeTypeState={changeTypeState}
            userId={userId}
            userNickname={userNickname}
            modalClose={close}
          />
        </>
      )}
    </>
  );
};

export default UserProfileContent;
