import styled from "styled-components";

const SelectBox = styled.select`
 width: 200px;
 background-color: white;
 border: 3px solid #BDCFF2;
 height: 56px;
 border-radius: 20px;
 font-size: 16px;
`

const PeopleTheme = () => {
  return (
    <div>
      장소 선택
      <SelectBox>
        <option>야구장</option>
        <option>펍</option>
        <option>편의점</option>
        <option>한강공원</option>
      </SelectBox>
    </div>
  );
};

export default PeopleTheme;