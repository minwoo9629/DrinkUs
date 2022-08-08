import { useState } from "react";
import styled from "styled-components";
import ProfileTitle from "../../../components/auth/ProfileTitle";
import { client } from "../../../utils/client";

const CheckBoxStyled = styled.input`
  display: none;
  cursor: pointer;
`;

const CategoryWrapper = styled.div`
  display: flex;
  margin-bottom: 30px;
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
    cursor: pointer;
    display: block;
    padding: 2px 16px;
  }
`;
const EditInterest = () => {
  const [categoryState, setCategoryState] = useState({});

  const onHandleCategoryCheck = (e) => {
    console.log(e);
  };

  return (
    <div style={{ padding: "30px" }}>
      <ProfileTitle isEdit={false} />
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
            <div>
              <MainCategoryWrapper>스포츠</MainCategoryWrapper>
            </div>
            <CategoryWrapper>
              <SubCategoryWrapper>
                <label>
                  <CheckBoxStyled
                    type="checkbox"
                    value="1"
                    onChange={onHandleCategoryCheck}
                  />
                  <span>축구</span>
                </label>
              </SubCategoryWrapper>
              <SubCategoryWrapper>
                <label>
                  <CheckBoxStyled
                    type="checkbox"
                    value="1"
                    onChange={() => {
                      console.log("체크");
                    }}
                  />
                  <span>배드민턴</span>
                </label>
              </SubCategoryWrapper>
            </CategoryWrapper>
          </div>
          <div>
            <div>
              <MainCategoryWrapper>음악</MainCategoryWrapper>
            </div>
            <CategoryWrapper>
              <SubCategoryWrapper>
                <label>
                  <CheckBoxStyled
                    type="checkbox"
                    value="1"
                    onChange={() => {
                      console.log("체크");
                    }}
                  />
                  <span>아이유</span>
                </label>
              </SubCategoryWrapper>
              <SubCategoryWrapper>
                <label>
                  <CheckBoxStyled
                    type="checkbox"
                    value="1"
                    onChange={() => {
                      console.log("체크");
                    }}
                  />
                  <span>숨참고 deep div</span>
                </label>
              </SubCategoryWrapper>
            </CategoryWrapper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditInterest;
