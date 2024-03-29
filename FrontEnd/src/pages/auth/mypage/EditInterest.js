import { useCallback, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import {
  addUserInterest,
  getUserInterests,
  removeUserInterest,
} from "../../../api/MyPageAPI";
import ProfileTitle from "../../../components/auth/ProfileTitle";

const CheckBoxStyled = styled.input`
  display: none;
  cursor: pointer;
`;

const CategoryWrapper = styled.div`
  display: flex;
  margin-bottom: 30px;
  flex-wrap: wrap;
`;

const MainCategoryWrapper = styled.div`
  margin: 4px;
  display: inline-block;
  background-color: #6f92bf;
  color: white;
  font-size: 20px;
  text-align: center;
  padding: 5px 20px;
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
    height: 100%;
    cursor: pointer;
    display: block;
    padding: 2px 16px;
  }
  &:hover {
    background-color: #eaf1ff;
  }
`;
const EditInterest = () => {
  const [categoryState, setCategoryState] = useState([]);
  const [profileImageState, setProfileImageState] = useState("1");
  const [userNameState, setUserNameState] = useState("");
  const user = useSelector((state) => state.user);
  const fetchInterestsData = useCallback(async () => {
    const result = await getUserInterests();
    setCategoryState((prevState) => [...result.data]);
  }, []);

  useEffect(() => {
    setProfileImageState(!user.data.userImg ? "1" : user.data.userImg);
    setUserNameState(user.data.userName);
  }, []);

  useEffect(() => {
    fetchInterestsData();
  }, [fetchInterestsData]);
  const onHandleCategoryCheck = (checked, subCategoryId, categoryId) => {
    checked
      ? removeUserInterest(subCategoryId)
      : addUserInterest(subCategoryId);

    const prevTargetSubCategory = categoryState.filter(
      (item) => item.categoryResponse.categoryId === categoryId
    )[0].subCategoryResponse;

    const updatedTargetSubCategory = prevTargetSubCategory.map((item) =>
      item.subCategoryId === subCategoryId
        ? { ...item, checked: !checked }
        : item
    );
    const updatedCategoryState = categoryState.map((item) =>
      item.categoryResponse.categoryId === categoryId
        ? { ...item, subCategoryResponse: updatedTargetSubCategory }
        : item
    );
    setCategoryState([...updatedCategoryState]);
  };
  return (
    <div style={{ padding: "30px 0px 30px 20px" }}>
      <ProfileTitle
        isEdit={false}
        imageId={profileImageState}
        userName={userNameState}
        marginLeft={"40px"}
      />
      <div
        style={{
          marginTop: "40px",
          margin: "auto",
          height: "650px",
          minWidth: "430px",
          maxWidth: "580px",
        }}
      >
        <div style={{ padding: "8px 12px", borderBottom: "1px solid #6F92BF" }}>
          <p style={{ fontSize: "28px", color: "#676775" }}>
            관심사를 수정해주세요
          </p>
        </div>
        <div
          style={{
            padding: "8px 12px",
            maxHeight: "580px",
            overflow: "scroll",
          }}
        >
          <div>
            {categoryState.map((item) => (
              <div key={item.categoryResponse.categoryId}>
                <div>
                  <MainCategoryWrapper>
                    {item.categoryResponse.categoryName}
                  </MainCategoryWrapper>
                </div>
                <CategoryWrapper>
                  {item.subCategoryResponse.map((subItem) => (
                    <SubCategoryWrapper key={subItem.subCategoryId}>
                      <label>
                        <CheckBoxStyled
                          checked={subItem.checked}
                          type="checkbox"
                          value={subItem.subCategoryId}
                          onChange={() =>
                            onHandleCategoryCheck(
                              subItem.checked,
                              subItem.subCategoryId,
                              item.categoryResponse.categoryId
                            )
                          }
                        />
                        <span>{subItem.subCategoryName}</span>
                      </label>
                    </SubCategoryWrapper>
                  ))}
                </CategoryWrapper>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditInterest;
