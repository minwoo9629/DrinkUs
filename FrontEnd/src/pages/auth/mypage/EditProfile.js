import { useState } from "react";
import styled from "styled-components";
import ProfileTitle from "../../../components/auth/ProfileTitle";
const profileDataName = [
  "이름",
  "닉네임",
  "소개",
  "인기도",
  "생년월일",
  "가입일",
  "주량",
];

const profileInputWrapper = styled.div`
  padding: 30px;
`;
const EditProfile = () => {
  const [profileState, setProfileState] = useState({
    nickName: "",
    introduce: "",
    popularlity: 0,
    year: 0,
    month: 0,
    day: 0,
    soju: 0,
    beer: 0,
  });
  return (
    <div style={{ padding: "30px" }}>
      <ProfileTitle isEdit={true} />
      <div style={{ padding: "30px", display: "flex" }}>
        <ul>
          {profileDataName.map((item) => (
            <li style={{ padding: "30px", textAlign: "right" }}>{item}</li>
          ))}
        </ul>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <profileInputWrapper>
            <input />
          </profileInputWrapper>
          <profileInputWrapper>
            <input />
          </profileInputWrapper>
          <profileInputWrapper>
            <input />
          </profileInputWrapper>
          <profileInputWrapper>
            <input />
          </profileInputWrapper>
          <profileInputWrapper>
            <input />년 <input />월 <input />일
          </profileInputWrapper>
          <profileInputWrapper>
            <input />년 <input />월 <input />일
          </profileInputWrapper>
          <profileInputWrapper>
            <input />
          </profileInputWrapper>
          <profileInputWrapper>
            <input />
          </profileInputWrapper>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
